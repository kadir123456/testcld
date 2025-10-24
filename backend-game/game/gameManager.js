// Game Manager - Handles game rounds and state
import { EventEmitter } from 'events';
import { CONFIG, GAME_STATES } from '../utils/constants.js';
import { generateCrashPoint, generateDemoCrashPoint, generateServerSeed } from './crashAlgorithm.js';

class GameManager extends EventEmitter {
  constructor() {
    super();
    this.currentRound = null;
    this.gameState = GAME_STATES.WAITING;
    this.roundNumber = 0;
    this.currentMultiplier = 1.00;
    this.intervalId = null;
    this.countdownId = null;
  }

  /**
   * Start a new game round
   * @param {boolean} isDemoMode
   */
  startNewRound(isDemoMode = false) {
    this.roundNumber++;
    
    // Generate crash point
    let crashPoint, hash, serverSeed;
    
    if (isDemoMode) {
      crashPoint = generateDemoCrashPoint();
      hash = null;
      serverSeed = null;
    } else {
      serverSeed = generateServerSeed();
      const clientSeed = 'public-seed'; // In production, this comes from client
      const result = generateCrashPoint(serverSeed, clientSeed, this.roundNumber);
      crashPoint = result.crashPoint;
      hash = result.hash;
    }

    this.currentRound = {
      roundId: `round-${Date.now()}-${this.roundNumber}`,
      roundNumber: this.roundNumber,
      crashPoint: crashPoint,
      hash: hash,
      serverSeed: serverSeed, // Will be revealed after crash
      isDemoMode: isDemoMode,
      startTime: Date.now(),
      bets: [],
      status: 'active'
    };

    console.log(`🎮 New round started: #${this.roundNumber} | Crash: ${crashPoint}x | Demo: ${isDemoMode}`);
    
    this.emit('roundCreated', this.currentRound);
    this.startCountdown();
  }

  /**
   * Countdown before game starts
   */
  startCountdown() {
    this.gameState = GAME_STATES.COUNTDOWN;
    let countdown = CONFIG.GAME.COUNTDOWN_DURATION / 1000; // 5 seconds

    this.emit('countdown', { countdown });

    this.countdownId = setInterval(() => {
      countdown--;
      this.emit('countdown', { countdown });

      if (countdown <= 0) {
        clearInterval(this.countdownId);
        this.startFlying();
      }
    }, 1000);
  }

  /**
   * Start the flying phase (multiplier increases)
   */
  startFlying() {
    this.gameState = GAME_STATES.FLYING;
    this.currentMultiplier = CONFIG.GAME.MULTIPLIER_START;

    this.emit('gameStarted', { 
      roundId: this.currentRound.roundId,
      multiplier: this.currentMultiplier 
    });

    // Update multiplier every 100ms
    this.intervalId = setInterval(() => {
      this.currentMultiplier += CONFIG.GAME.MULTIPLIER_INCREMENT;
      this.currentMultiplier = Math.round(this.currentMultiplier * 100) / 100;

      // Emit multiplier update
      this.emit('multiplierUpdate', { 
        multiplier: this.currentMultiplier,
        roundId: this.currentRound.roundId
      });

      // Check if crash point reached
      if (this.currentMultiplier >= this.currentRound.crashPoint) {
        this.crash();
      }
    }, CONFIG.GAME.UPDATE_INTERVAL);
  }

  /**
   * Crash the game
   */
  crash() {
    clearInterval(this.intervalId);
    this.gameState = GAME_STATES.CRASHED;

    const crashData = {
      roundId: this.currentRound.roundId,
      crashPoint: this.currentRound.crashPoint,
      serverSeed: this.currentRound.serverSeed, // Reveal for transparency
      endTime: Date.now()
    };

    console.log(`💥 Game crashed at ${this.currentRound.crashPoint}x`);

    this.emit('gameCrashed', crashData);

    // Wait 3 seconds before starting new round
    setTimeout(() => {
      this.gameState = GAME_STATES.WAITING;
      this.emit('waitingForNextRound');
      
      // Auto-start next round after 2 seconds
      setTimeout(() => {
        this.startNewRound(this.currentRound.isDemoMode);
      }, 2000);
    }, 3000);
  }

  /**
   * Add bet to current round
   */
  addBet(bet) {
    if (this.gameState === GAME_STATES.COUNTDOWN || this.gameState === GAME_STATES.WAITING) {
      this.currentRound.bets.push(bet);
      this.emit('betPlaced', bet);
      return true;
    }
    return false;
  }

  /**
   * Cash out a bet
   */
  cashOut(userId, betId) {
    if (this.gameState === GAME_STATES.FLYING) {
      const bet = this.currentRound.bets.find(b => b.betId === betId && b.userId === userId);
      if (bet && !bet.cashedOut) {
        bet.cashedOut = true;
        bet.cashOutAt = this.currentMultiplier;
        bet.profit = bet.amount * this.currentMultiplier - bet.amount;

        this.emit('betCashedOut', bet);
        return bet;
      }
    }
    return null;
  }

  /**
   * Get current game state
   */
  getGameState() {
    return {
      state: this.gameState,
      roundId: this.currentRound?.roundId,
      roundNumber: this.roundNumber,
      multiplier: this.currentMultiplier,
      bets: this.currentRound?.bets || [],
      isDemoMode: this.currentRound?.isDemoMode
    };
  }

  /**
   * Stop the game (for server shutdown)
   */
  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.countdownId) clearInterval(this.countdownId);
    this.gameState = GAME_STATES.WAITING;
  }
}

export default GameManager;
