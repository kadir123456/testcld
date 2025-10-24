// Game Constants and Configuration
import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  // Server
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // USDT
  USDT_ADDRESS: process.env.USDT_TRC20_ADDRESS || 'TMjSDNto6hoHUV9udDcXVAtuxxX6cnhhv3',

  // Game Settings - Demo Mode
  DEMO: {
    START_BALANCE: parseFloat(process.env.DEMO_START_BALANCE) || 100,
    MIN_BET: parseFloat(process.env.MIN_BET_DEMO) || 0.1,
    MAX_BET: parseFloat(process.env.MAX_BET_DEMO) || 100,
    WIN_RATE: 0.60 // 60% win rate for demo
  },

  // Game Settings - Real Mode
  REAL: {
    MIN_BET: parseFloat(process.env.MIN_BET_REAL) || 1,
    MAX_BET: parseFloat(process.env.MAX_BET_REAL) || 500,
    MIN_WITHDRAWAL: parseFloat(process.env.MIN_WITHDRAWAL) || 10,
    WITHDRAWAL_FEE: parseFloat(process.env.WITHDRAWAL_FEE) || 0.02, // 2%
    HOUSE_EDGE: parseFloat(process.env.HOUSE_EDGE) || 0.05 // 5%
  },

  // Game Timing
  GAME: {
    COUNTDOWN_DURATION: 5000, // 5 seconds before game starts
    UPDATE_INTERVAL: 100, // Update multiplier every 100ms
    MULTIPLIER_START: 1.00,
    MULTIPLIER_INCREMENT: 0.01, // Increment per update
    INSTANT_CRASH_CHANCE: 0.03 // 3% chance of instant crash at 1.00x
  },

  // Rate Limiting
  RATE_LIMIT: {
    MAX_BETS_PER_SECOND: 1,
    MAX_BETS_PER_ROUND: 2 // Can place 2 bets per round (e.g., different amounts)
  }
};

export const GAME_STATES = {
  WAITING: 'WAITING',
  COUNTDOWN: 'COUNTDOWN',
  FLYING: 'FLYING',
  CRASHED: 'CRASHED'
};

export const BET_STATUS = {
  ACTIVE: 'ACTIVE',
  CASHED_OUT: 'CASHED_OUT',
  LOST: 'LOST'
};
