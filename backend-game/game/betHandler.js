// Bet Handler - Manages user bets
import { v4 as uuidv4 } from 'uuid';
import { CONFIG, BET_STATUS } from '../utils/constants.js';

// In-memory storage (will be replaced with Firebase)
const activeBets = new Map();
const userBalances = new Map();

/**
 * Initialize user balance (for demo)
 */
export const initializeUser = (userId, isDemoMode = true) => {
  if (!userBalances.has(userId)) {
    userBalances.set(userId, {
      userId,
      demoBalance: CONFIG.DEMO.START_BALANCE,
      gameBalance: 0,
      siteBalance: 0
    });
  }
  return userBalances.get(userId);
};

/**
 * Get user balance
 */
export const getUserBalance = (userId) => {
  return userBalances.get(userId) || initializeUser(userId);
};

/**
 * Validate bet amount
 */
export const validateBet = (userId, amount, isDemoMode) => {
  const user = getUserBalance(userId);
  const balance = isDemoMode ? user.demoBalance : user.gameBalance;
  
  const minBet = isDemoMode ? CONFIG.DEMO.MIN_BET : CONFIG.REAL.MIN_BET;
  const maxBet = isDemoMode ? CONFIG.DEMO.MAX_BET : CONFIG.REAL.MAX_BET;

  // Check minimum
  if (amount < minBet) {
    return { valid: false, message: `Minimum bet is $${minBet}` };
  }

  // Check maximum
  if (amount > maxBet) {
    return { valid: false, message: `Maximum bet is $${maxBet}` };
  }

  // Check balance
  if (amount > balance) {
    return { valid: false, message: 'Insufficient balance' };
  }

  return { valid: true };
};

/**
 * Place a bet
 */
export const placeBet = (userId, amount, roundId, isDemoMode) => {
  const validation = validateBet(userId, amount, isDemoMode);
  
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const user = getUserBalance(userId);
  
  // Deduct balance
  if (isDemoMode) {
    user.demoBalance -= amount;
  } else {
    user.gameBalance -= amount;
  }

  // Create bet
  const bet = {
    betId: uuidv4(),
    userId,
    roundId,
    amount,
    isDemoMode,
    status: BET_STATUS.ACTIVE,
    cashedOut: false,
    cashOutAt: null,
    profit: 0,
    timestamp: Date.now()
  };

  activeBets.set(bet.betId, bet);

  console.log(`🎲 Bet placed: ${userId} - $${amount} (Demo: ${isDemoMode})`);

  return {
    success: true,
    bet,
    newBalance: isDemoMode ? user.demoBalance : user.gameBalance
  };
};

/**
 * Cash out a bet
 */
export const cashOutBet = (userId, betId, multiplier) => {
  const bet = activeBets.get(betId);

  if (!bet) {
    return { success: false, message: 'Bet not found' };
  }

  if (bet.userId !== userId) {
    return { success: false, message: 'Unauthorized' };
  }

  if (bet.cashedOut) {
    return { success: false, message: 'Already cashed out' };
  }

  if (bet.status !== BET_STATUS.ACTIVE) {
    return { success: false, message: 'Bet is not active' };
  }

  // Calculate profit
  const winAmount = bet.amount * multiplier;
  const profit = winAmount - bet.amount;

  // Update bet
  bet.cashedOut = true;
  bet.cashOutAt = multiplier;
  bet.profit = profit;
  bet.status = BET_STATUS.CASHED_OUT;

  // Update user balance
  const user = getUserBalance(userId);
  if (bet.isDemoMode) {
    user.demoBalance += winAmount;
  } else {
    user.gameBalance += winAmount;
  }

  console.log(`💰 Cash out: ${userId} - $${winAmount.toFixed(2)} at ${multiplier}x`);

  return {
    success: true,
    bet,
    winAmount,
    profit,
    newBalance: bet.isDemoMode ? user.demoBalance : user.gameBalance
  };
};

/**
 * Process lost bets after crash
 */
export const processLostBets = (roundId) => {
  const lostBets = [];
  
  for (const [betId, bet] of activeBets.entries()) {
    if (bet.roundId === roundId && bet.status === BET_STATUS.ACTIVE && !bet.cashedOut) {
      bet.status = BET_STATUS.LOST;
      bet.profit = -bet.amount;
      lostBets.push(bet);
    }
  }

  return lostBets;
};

/**
 * Get active bets for a round
 */
export const getActiveBets = (roundId) => {
  const bets = [];
  for (const bet of activeBets.values()) {
    if (bet.roundId === roundId) {
      bets.push(bet);
    }
  }
  return bets;
};

export default {
  initializeUser,
  getUserBalance,
  validateBet,
  placeBet,
  cashOutBet,
  processLostBets,
  getActiveBets
};
