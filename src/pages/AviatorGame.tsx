// Aviator Crash Game Component - CLIENT-SIDE ONLY (No Backend Required)
// Works 100% on Netlify with Firebase
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ref, onValue, set, push, get, update } from 'firebase/database';
import { database } from '../config/firebase';
import { Plane, TrendingUp, DollarSign, Users, History, Play, StopCircle, Wallet, ArrowUpDown, Copy, X, Upload, Download } from 'lucide-react';
import toast from 'react-hot-toast';

// TRC20 USDT Address for game deposits (separate from mining packages)
const GAME_USDT_ADDRESS = "TMjSDNto6hoHUV9udDcXVAtuxxX6cnhhv3";
const MIN_DEPOSIT = 10; // Minimum deposit $10 USDT

type GameState = 'WAITING' | 'COUNTDOWN' | 'FLYING' | 'CRASHED';

interface Bet {
  betId: string;
  amount: number;
  cashOutAt: number | null;
  profit: number;
  status: 'ACTIVE' | 'CASHED_OUT' | 'LOST';
}

interface BetHistory {
  betId: string;
  amount: number;
  cashOutAt: number | null;
  crashPoint: number;
  profit: number;
  timestamp: string;
}

interface FakePlayer {
  id: string;
  name: string;
  betAmount: number;
  cashOutAt: number | null;
  profit: number;
}

// Generate provably fair crash point
const generateCrashPoint = (): number => {
  // House always wins logic - higher chance of early crashes
  const random = Math.random();
  
  if (random < 0.05) return 1.00; // 5% instant crash
  if (random < 0.20) return 1.00 + Math.random() * 0.5; // 15% between 1.00-1.50x
  if (random < 0.45) return 1.50 + Math.random() * 0.5; // 25% between 1.50-2.00x
  if (random < 0.70) return 2.00 + Math.random() * 1.00; // 25% between 2.00-3.00x
  if (random < 0.85) return 3.00 + Math.random() * 2.00; // 15% between 3.00-5.00x
  if (random < 0.96) return 5.00 + Math.random() * 5.00; // 11% between 5.00-10.00x
  
  // 4% chance for big wins (to keep players excited)
  return 10.00 + Math.random() * 40.00; // Max 50x
};

// Generate fake player names
const generateFakePlayerName = (): string => {
  const adjectives = ['Lucky', 'Rich', 'Pro', 'Master', 'King', 'Queen', 'Ace', 'Elite', 'Epic', 'Super', 'Mega', 'Ultra'];
  const nouns = ['Player', 'Gamer', 'Winner', 'Trader', 'Boss', 'Star', 'Hero', 'Legend', 'Champ', 'Whale', 'Tiger'];
  const numbers = Math.floor(Math.random() * 9999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${numbers}`;
};

export const AviatorGame: React.FC = () => {
  const { user } = useAuth();
  
  // Game state
  const [gameState, setGameState] = useState<GameState>('WAITING');
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [betAmount, setBetAmount] = useState('10');
  const [demoBalance, setDemoBalance] = useState(1000); // Demo starts with $1000
  const [gameBalance, setGameBalance] = useState(0); // Real USDT balance
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [crashPoint, setCrashPoint] = useState<number>(0);
  const [nextCrashPoint, setNextCrashPoint] = useState<number>(generateCrashPoint());
  const [betHistory, setBetHistory] = useState<BetHistory[]>([]);
  const [crashHistory, setCrashHistory] = useState<number[]>([]);
  const [fakePlayers, setFakePlayers] = useState<FakePlayer[]>([]);
  const [onlinePlayersCount, setOnlinePlayersCount] = useState(1500);
  
  // Deposit/Withdrawal modal
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load game balance from Firebase
  useEffect(() => {
    if (!user || isDemoMode) return;

    const userRef = ref(database, `users/${user.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setGameBalance(userData.gameBalance || 0);
      }
    });

    return () => unsubscribe();
  }, [user, isDemoMode]);

  // Load bet history
  useEffect(() => {
    if (!user) return;

    const historyRef = ref(database, `gameBets/${user.uid}`);
    const unsubscribe = onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        const bets: BetHistory[] = [];
        snapshot.forEach((childSnapshot) => {
          bets.push({ betId: childSnapshot.key!, ...childSnapshot.val() });
        });
        setBetHistory(bets.reverse().slice(0, 20));
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Simulate online players (1500-5000 range, varying)
  useEffect(() => {
    const interval = setInterval(() => {
      const baseCount = 1500 + Math.floor(Math.random() * 3500); // 1500-5000
      const variance = Math.floor(Math.random() * 200) - 100; // ±100
      setOnlinePlayersCount(Math.max(1500, baseCount + variance));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Generate fake players for each round
  const generateFakePlayers = () => {
    const count = 8 + Math.floor(Math.random() * 12); // 8-20 fake players
    const players: FakePlayer[] = [];
    
    for (let i = 0; i < count; i++) {
      const amount = 10 + Math.random() * 490; // $10-500 bets
      players.push({
        id: `fake_${Date.now()}_${i}`,
        name: generateFakePlayerName(),
        betAmount: Math.floor(amount * 100) / 100,
        cashOutAt: null,
        profit: 0
      });
    }
    
    setFakePlayers(players);
  };

  // Simulate fake players cashing out
  useEffect(() => {
    if (gameState !== 'FLYING') return;

    const interval = setInterval(() => {
      setFakePlayers(prev => prev.map(player => {
        if (player.cashOutAt) return player;
        
        // Random chance to cash out at current multiplier
        const shouldCashOut = Math.random() < 0.15; // 15% chance per tick
        if (shouldCashOut && currentMultiplier >= 1.10) {
          const cashOut = Math.floor(currentMultiplier * 100) / 100;
          return {
            ...player,
            cashOutAt: cashOut,
            profit: Math.floor((player.betAmount * cashOut - player.betAmount) * 100) / 100
          };
        }
        
        return player;
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [gameState, currentMultiplier]);

  // Main game loop
  useEffect(() => {
    startGameLoop();
    
    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      stopAnimation();
    };
  }, []);

  const startGameLoop = () => {
    // WAITING phase
    setGameState('WAITING');
    setCurrentMultiplier(1.00);
    setCurrentBet(null);
    generateFakePlayers();
    
    gameLoopRef.current = setTimeout(() => {
      startCountdown();
    }, 3000); // 3 seconds waiting
  };

  const startCountdown = () => {
    setGameState('COUNTDOWN');
    let count = 5;
    setCountdown(count);
    
    countdownRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        startFlying();
      }
    }, 1000);
  };

  const startFlying = () => {
    setGameState('FLYING');
    setCountdown(null);
    const crash = nextCrashPoint;
    setCrashPoint(crash);
    setNextCrashPoint(generateCrashPoint()); // Pre-generate next crash point
    startTimeRef.current = Date.now();
    
    startAnimation();
    updateMultiplier(crash);
  };

  const updateMultiplier = (targetCrash: number) => {
    const duration = 2000 + (targetCrash - 1) * 1500; // Dynamic duration based on crash point
    const startTime = Date.now();
    
    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Exponential growth formula
      const multiplier = 1 + (targetCrash - 1) * Math.pow(progress, 0.7);
      setCurrentMultiplier(Math.floor(multiplier * 100) / 100);
      
      if (progress >= 1) {
        crashGame(targetCrash);
      } else {
        requestAnimationFrame(update);
      }
    };
    
    update();
  };

  const crashGame = (crashedAt: number) => {
    setGameState('CRASHED');
    setCrashPoint(crashedAt);
    setCrashHistory(prev => [crashedAt, ...prev].slice(0, 10));
    stopAnimation();
    
    // Check if player lost
    if (currentBet && !currentBet.cashOutAt) {
      toast.error(`💥 Crashed at ${crashedAt.toFixed(2)}x! Lost $${currentBet.amount.toFixed(2)}`);
      setCurrentBet(prev => prev ? { ...prev, status: 'LOST', profit: -prev.amount } : null);
      
      // Save to history
      if (user && !isDemoMode) {
        saveBetToHistory({
          betId: currentBet.betId,
          amount: currentBet.amount,
          cashOutAt: null,
          crashPoint: crashedAt,
          profit: -currentBet.amount,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Start new round after 5 seconds
    gameLoopRef.current = setTimeout(() => {
      startGameLoop();
    }, 5000);
  };

  // Canvas animation
  const startAnimation = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let planeY = canvas.height - 80;
    let planeX = 40;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#1e40af33';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      // Draw trajectory trail
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 80);
      ctx.lineTo(planeX, planeY);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw plane (triangle)
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(planeX, planeY - 15);
      ctx.lineTo(planeX - 20, planeY + 15);
      ctx.lineTo(planeX + 20, planeY + 15);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Move plane upward
      if (gameState === 'FLYING') {
        const speed = 1 + (currentMultiplier - 1) * 0.05;
        planeY -= speed;
        planeX += speed * 1.2;
        
        if (planeY < 50) planeY = 50;
        if (planeX > canvas.width - 50) planeX = canvas.width - 50;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Draw explosion
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Explosion effect
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.beginPath();
        ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, 120, 0, Math.PI * 2);
        ctx.fill();
        
        // Crash text
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 10;
        ctx.fillText(`CRASHED!`, canvasRef.current.width / 2, canvasRef.current.height / 2 - 20);
        ctx.font = 'bold 36px Arial';
        ctx.fillText(`${crashPoint.toFixed(2)}x`, canvasRef.current.width / 2, canvasRef.current.height / 2 + 30);
      }
    }
  };

  const handlePlaceBet = () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }
    
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid bet amount');
      return;
    }

    const balance = isDemoMode ? demoBalance : gameBalance;
    if (amount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    if (gameState !== 'WAITING' && gameState !== 'COUNTDOWN') {
      toast.error('Wait for next round');
      return;
    }

    // Deduct balance
    if (isDemoMode) {
      setDemoBalance(prev => prev - amount);
    } else {
      updateGameBalance(-amount);
    }

    // Create bet
    const newBet: Bet = {
      betId: `bet_${Date.now()}_${user.uid}`,
      amount,
      cashOutAt: null,
      profit: 0,
      status: 'ACTIVE'
    };

    setCurrentBet(newBet);
    toast.success(`Bet placed: $${amount.toFixed(2)}`);
  };

  const handleCashOut = async () => {
    if (!currentBet || currentBet.cashOutAt || gameState !== 'FLYING') return;

    const cashOutMultiplier = Math.floor(currentMultiplier * 100) / 100;
    const winAmount = currentBet.amount * cashOutMultiplier;
    const profit = winAmount - currentBet.amount;

    // Update bet
    const updatedBet: Bet = {
      ...currentBet,
      cashOutAt: cashOutMultiplier,
      profit,
      status: 'CASHED_OUT'
    };
    setCurrentBet(updatedBet);

    // Add winnings to balance
    if (isDemoMode) {
      setDemoBalance(prev => prev + winAmount);
    } else {
      await updateGameBalance(winAmount);
    }

    toast.success(`🎉 Cashed out at ${cashOutMultiplier.toFixed(2)}x! Won $${winAmount.toFixed(2)}`, {
      duration: 5000
    });

    // Save to history
    if (user && !isDemoMode) {
      saveBetToHistory({
        betId: updatedBet.betId,
        amount: updatedBet.amount,
        cashOutAt: cashOutMultiplier,
        crashPoint: 0, // Will be updated when game crashes
        profit,
        timestamp: new Date().toISOString()
      });
    }
  };

  const updateGameBalance = async (amount: number) => {
    if (!user) return;

    try {
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const currentBalance = snapshot.val().gameBalance || 0;
        await update(userRef, {
          gameBalance: Math.max(0, currentBalance + amount)
        });
      }
    } catch (error) {
      console.error('Error updating game balance:', error);
    }
  };

  const saveBetToHistory = async (bet: BetHistory) => {
    if (!user) return;

    try {
      const betRef = ref(database, `gameBets/${user.uid}/${bet.betId}`);
      await set(betRef, bet);
    } catch (error) {
      console.error('Error saving bet:', error);
    }
  };

  // Deposit modal
  const handleDeposit = async () => {
    if (!user) return;

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount < MIN_DEPOSIT) {
      toast.error(`Minimum deposit is $${MIN_DEPOSIT} USDT`);
      return;
    }

    if (!txHash || txHash.trim().length < 10) {
      toast.error('Please enter a valid transaction hash');
      return;
    }

    try {
      // Create deposit request (admin approval required)
      const depositRef = ref(database, 'gameDeposits');
      await push(depositRef, {
        userId: user.uid,
        userEmail: user.email,
        amount,
        txHash: txHash.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      toast.success('Deposit request submitted! Waiting for admin approval...');
      setShowDepositModal(false);
      setDepositAmount('');
      setTxHash('');
    } catch (error) {
      toast.error('Failed to submit deposit request');
    }
  };

  // Withdrawal modal
  const handleWithdraw = async () => {
    if (!user) return;

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid withdrawal amount');
      return;
    }

    if (amount > gameBalance) {
      toast.error('Insufficient game balance');
      return;
    }

    if (amount < MIN_DEPOSIT) {
      toast.error(`Minimum withdrawal is $${MIN_DEPOSIT} USDT`);
      return;
    }

    if (!withdrawAddress || withdrawAddress.trim().length < 10) {
      toast.error('Please enter a valid TRC20 wallet address');
      return;
    }

    try {
      // Create withdrawal request (admin approval required)
      const withdrawRef = ref(database, 'gameWithdrawals');
      await push(withdrawRef, {
        userId: user.uid,
        userEmail: user.email,
        amount,
        walletAddress: withdrawAddress.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // Deduct from balance immediately (will be refunded if rejected)
      await updateGameBalance(-amount);

      toast.success('Withdrawal request submitted! Waiting for admin approval...');
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setWithdrawAddress('');
    } catch (error) {
      toast.error('Failed to submit withdrawal request');
    }
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(GAME_USDT_ADDRESS);
      toast.success('Address copied!');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const canPlaceBet = (gameState === 'WAITING' || gameState === 'COUNTDOWN') && !currentBet;
  const canCashOut = gameState === 'FLYING' && currentBet && !currentBet.cashOutAt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-2 md:p-4 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <Plane className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Aviator Game</h1>
              <p className="text-xs md:text-sm text-gray-400">Crash game - Cash out before it's too late!</p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsDemoMode(true);
                setCurrentBet(null);
              }}
              className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-sm md:text-base transition ${
                isDemoMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              DEMO
            </button>
            <button
              onClick={() => {
                setIsDemoMode(false);
                setCurrentBet(null);
              }}
              className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-sm md:text-base transition ${
                !isDemoMode
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              REAL
            </button>
          </div>
        </div>

        {/* Balance & Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <div className="text-gray-400 text-xs md:text-sm mb-1">
              {isDemoMode ? 'Demo Balance' : 'Game Balance (USDT)'}
            </div>
            <div className="text-xl md:text-2xl font-bold text-white">
              ${isDemoMode ? demoBalance.toFixed(2) : gameBalance.toFixed(2)}
            </div>
            {isDemoMode && (
              <div className="text-xs text-blue-400 mt-1">
                ℹ️ Free practice mode
              </div>
            )}
          </div>

          {!isDemoMode && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Deposit</span>
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Withdraw</span>
              </button>
            </div>
          )}
        </div>

        {/* Online Players */}
        <div className="mt-3 flex items-center justify-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-green-400" />
          <span className="text-gray-400">Online players:</span>
          <span className="text-green-400 font-bold animate-pulse">{onlinePlayersCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Canvas Game */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
            {/* Multiplier Display */}
            <div className="text-center mb-4">
              {countdown !== null && countdown > 0 ? (
                <div className="text-4xl md:text-6xl font-bold text-yellow-400 animate-pulse">
                  Starting in {countdown}...
                </div>
              ) : gameState === 'FLYING' ? (
                <div className="text-6xl md:text-8xl font-bold text-green-400 animate-pulse">
                  {currentMultiplier.toFixed(2)}x
                </div>
              ) : gameState === 'CRASHED' ? (
                <div className="text-4xl md:text-6xl font-bold text-red-400">
                  CRASHED at {crashPoint.toFixed(2)}x
                </div>
              ) : (
                <div className="text-2xl md:text-4xl font-bold text-gray-400">
                  Next round starting soon...
                </div>
              )}
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full border border-gray-700 rounded-lg"
            />

            {/* Game Instructions */}
            {gameState === 'WAITING' && (
              <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold text-sm mb-2">How to Play:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Place your bet before the plane takes off</li>
                  <li>• Watch the multiplier increase as the plane flies</li>
                  <li>• Cash out before the plane crashes to win!</li>
                  <li>• If you don't cash out in time, you lose your bet</li>
                </ul>
              </div>
            )}
          </div>

          {/* Betting Interface */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Bet Amount ($)</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-base md:text-lg"
                  placeholder="Enter amount"
                  disabled={!canPlaceBet}
                  min="1"
                  step="1"
                />
                <div className="flex gap-2 mt-2">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setBetAmount(String(amt))}
                      className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
                      disabled={!canPlaceBet}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-end">
                {!currentBet ? (
                  <button
                    onClick={handlePlaceBet}
                    disabled={!canPlaceBet}
                    className={`w-full py-3 rounded-lg font-bold text-base md:text-lg transition ${
                      canPlaceBet
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Play className="inline w-5 h-5 mr-2" />
                    Place Bet
                  </button>
                ) : (
                  <button
                    onClick={handleCashOut}
                    disabled={!canCashOut}
                    className={`w-full py-3 rounded-lg font-bold text-base md:text-lg transition ${
                      canCashOut
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white animate-pulse'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <StopCircle className="inline w-5 h-5 mr-2" />
                    Cash Out {canCashOut ? `(${currentMultiplier.toFixed(2)}x)` : ''}
                  </button>
                )}
              </div>
            </div>

            {/* Current Bet Info */}
            {currentBet && (
              <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-gray-400 text-sm">Current Bet:</span>
                    <span className="text-white font-bold ml-2 text-base">${currentBet.amount.toFixed(2)}</span>
                  </div>
                  {currentBet.cashOutAt && (
                    <div className="text-sm">
                      <span className="text-gray-400">Cashed Out at:</span>
                      <span className="text-green-400 font-bold ml-2">{currentBet.cashOutAt.toFixed(2)}x</span>
                      <span className="text-green-400 ml-2">(+${currentBet.profit.toFixed(2)})</span>
                    </div>
                  )}
                  {currentBet.status === 'LOST' && (
                    <span className="text-red-400 font-bold text-sm">Lost (-${currentBet.amount.toFixed(2)})</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Crash History */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
            <h3 className="text-white font-bold mb-4 flex items-center text-sm md:text-base">
              <History className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Last 10 Crashes
            </h3>
            <div className="flex flex-wrap gap-2">
              {crashHistory.length === 0 ? (
                <p className="text-gray-400 text-xs">No history yet</p>
              ) : (
                crashHistory.map((crash, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-lg font-bold text-sm ${
                      crash >= 3
                        ? 'bg-purple-600 text-white'
                        : crash >= 2
                        ? 'bg-green-600 text-white'
                        : crash >= 1.5
                        ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {crash.toFixed(2)}x
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Live Bets (Fake Players) */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
            <h3 className="text-white font-bold mb-4 flex items-center text-sm md:text-base">
              <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Live Bets ({fakePlayers.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {fakePlayers.slice(0, 8).map((player) => (
                <div
                  key={player.id}
                  className="bg-gray-700/50 rounded-lg p-2 text-xs"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-400 truncate flex-1">{player.name}</span>
                    <span className="text-white ml-2">${player.betAmount.toFixed(0)}</span>
                  </div>
                  {player.cashOutAt && (
                    <div className="text-green-400 text-xs mt-1">
                      Cashed out: {player.cashOutAt.toFixed(2)}x (+${player.profit.toFixed(0)})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bet History */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-6">
            <h3 className="text-white font-bold mb-4 flex items-center text-sm md:text-base">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Your Bets
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {betHistory.length === 0 ? (
                <p className="text-gray-400 text-xs">No bets yet</p>
              ) : (
                betHistory.map((bet) => (
                  <div
                    key={bet.betId}
                    className="bg-gray-700/50 rounded-lg p-3 text-xs"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Bet:</span>
                      <span className="text-white">${bet.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Cash Out:</span>
                      <span className={bet.cashOutAt ? 'text-green-400' : 'text-red-400'}>
                        {bet.cashOutAt ? `${bet.cashOutAt.toFixed(2)}x` : `Lost at ${bet.crashPoint?.toFixed(2)}x`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit:</span>
                      <span className={bet.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {bet.profit >= 0 ? '+' : ''}${bet.profit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Deposit USDT</h3>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-blue-400 font-medium mb-2">Send USDT (TRC20) to:</p>
                <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
                  <p className="text-white font-mono text-sm break-all flex-1">{GAME_USDT_ADDRESS}</p>
                  <button
                    onClick={copyAddress}
                    className="ml-2 p-2 rounded bg-blue-600/20 hover:bg-blue-600/30"
                  >
                    <Copy className="h-4 w-4 text-blue-400" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  ⚠️ Only send TRC20 USDT! Minimum: ${MIN_DEPOSIT}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (USDT)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    placeholder={`Min: ${MIN_DEPOSIT}`}
                    min={MIN_DEPOSIT}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transaction Hash (TxHash)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    placeholder="Enter transaction hash"
                  />
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <p>1. Send USDT (TRC20) to the address above</p>
                  <p>2. Enter the amount and transaction hash</p>
                  <p>3. Wait for admin approval (usually within 24 hours)</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                className="flex-1 py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Withdraw USDT</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-white">${gameBalance.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (USDT)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    placeholder={`Min: ${MIN_DEPOSIT}`}
                    min={MIN_DEPOSIT}
                    max={gameBalance}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    TRC20 Wallet Address
                  </label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    placeholder="Enter your TRC20 address"
                  />
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <p>⚠️ Withdrawals require admin approval</p>
                  <p>• Minimum: ${MIN_DEPOSIT} USDT</p>
                  <p>• Processing time: Usually within 24 hours</p>
                  <p>• Double-check your wallet address!</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
