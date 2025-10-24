// Main Server - Socket.IO WebSocket Server
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebase-admin.js';
import { CONFIG } from './utils/constants.js';
import GameManager from './game/gameManager.js';
import * as betHandler from './game/betHandler.js';

dotenv.config();

// Initialize Express
const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://freecloudminer.com', 'https://*.netlify.app'],
  credentials: true
}));

app.use(express.json());

// Initialize Firebase (optional - will warn if not configured)
try {
  initializeFirebase();
} catch (error) {
  console.warn('⚠️  Running without Firebase integration');
}

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://freecloudminer.com', 'https://*.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize Game Manager
const gameManager = new GameManager();

// Game event listeners
gameManager.on('roundCreated', (round) => {
  io.emit('game:roundCreated', {
    roundId: round.roundId,
    roundNumber: round.roundNumber,
    hash: round.hash // For provably fair verification
  });
});

gameManager.on('countdown', (data) => {
  io.emit('game:countdown', data);
});

gameManager.on('gameStarted', (data) => {
  io.emit('game:started', data);
});

gameManager.on('multiplierUpdate', (data) => {
  io.emit('game:multiplier', data);
});

gameManager.on('gameCrashed', (data) => {
  // Process lost bets
  const lostBets = betHandler.processLostBets(data.roundId);
  
  io.emit('game:crashed', {
    ...data,
    lostBetsCount: lostBets.length
  });
});

gameManager.on('waitingForNextRound', () => {
  io.emit('game:waiting');
});

gameManager.on('betPlaced', (bet) => {
  io.emit('game:betPlaced', {
    betId: bet.betId,
    userId: bet.userId,
    amount: bet.amount,
    timestamp: bet.timestamp
  });
});

gameManager.on('betCashedOut', (bet) => {
  io.emit('game:betCashedOut', {
    betId: bet.betId,
    userId: bet.userId,
    cashOutAt: bet.cashOutAt,
    profit: bet.profit
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Send current game state to new client
  const gameState = gameManager.getGameState();
  socket.emit('game:state', gameState);

  // Initialize user (for demo)
  socket.on('user:init', (data) => {
    const { userId, isDemoMode } = data;
    const user = betHandler.initializeUser(userId, isDemoMode);
    socket.emit('user:initialized', {
      userId,
      demoBalance: user.demoBalance,
      gameBalance: user.gameBalance
    });
  });

  // Get user balance
  socket.on('user:getBalance', (data) => {
    const { userId } = data;
    const user = betHandler.getUserBalance(userId);
    socket.emit('user:balance', {
      demoBalance: user.demoBalance,
      gameBalance: user.gameBalance,
      siteBalance: user.siteBalance
    });
  });

  // Place bet
  socket.on('bet:place', (data) => {
    const { userId, amount, isDemoMode } = data;
    const currentState = gameManager.getGameState();

    // Can only bet during WAITING or COUNTDOWN
    if (currentState.state === 'FLYING' || currentState.state === 'CRASHED') {
      socket.emit('bet:error', { message: 'Cannot place bet during active round' });
      return;
    }

    const result = betHandler.placeBet(userId, amount, currentState.roundId, isDemoMode);
    
    if (result.success) {
      gameManager.addBet(result.bet);
      socket.emit('bet:placed', {
        bet: result.bet,
        newBalance: result.newBalance
      });
    } else {
      socket.emit('bet:error', { message: result.message });
    }
  });

  // Cash out
  socket.on('bet:cashOut', (data) => {
    const { userId, betId } = data;
    const currentState = gameManager.getGameState();

    if (currentState.state !== 'FLYING') {
      socket.emit('bet:error', { message: 'Game is not active' });
      return;
    }

    const result = betHandler.cashOutBet(userId, betId, currentState.multiplier);
    
    if (result.success) {
      gameManager.cashOut(userId, betId);
      socket.emit('bet:cashedOut', {
        bet: result.bet,
        winAmount: result.winAmount,
        profit: result.profit,
        newBalance: result.newBalance
      });
    } else {
      socket.emit('bet:error', { message: result.message });
    }
  });

  // Get active bets for current round
  socket.on('game:getActiveBets', () => {
    const currentState = gameManager.getGameState();
    const bets = betHandler.getActiveBets(currentState.roundId);
    socket.emit('game:activeBets', { bets });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// REST API endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'Aviator Crash Game',
    version: '1.0.0',
    uptime: process.uptime(),
    gameState: gameManager.getGameState()
  });
});

app.get('/config', (req, res) => {
  res.json({
    demo: {
      startBalance: CONFIG.DEMO.START_BALANCE,
      minBet: CONFIG.DEMO.MIN_BET,
      maxBet: CONFIG.DEMO.MAX_BET
    },
    real: {
      minBet: CONFIG.REAL.MIN_BET,
      maxBet: CONFIG.REAL.MAX_BET,
      minWithdrawal: CONFIG.REAL.MIN_WITHDRAWAL,
      withdrawalFee: CONFIG.REAL.WITHDRAWAL_FEE
    },
    usdt: {
      address: CONFIG.USDT_ADDRESS
    }
  });
});

app.get('/game/state', (req, res) => {
  res.json(gameManager.getGameState());
});

// Start server
const PORT = CONFIG.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Aviator Crash Game Server started on port ${PORT}`);
  console.log(`🎮 Game Mode: ${CONFIG.NODE_ENV}`);
  console.log(`💰 USDT Address: ${CONFIG.USDT_ADDRESS}`);
  console.log('');
  console.log('🛡️  Server ready for connections!');
  console.log('');

  // Start first game round (demo mode)
  setTimeout(() => {
    gameManager.startNewRound(true);
  }, 2000);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  gameManager.stop();
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
