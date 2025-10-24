// Provably Fair Crash Point Algorithm
import crypto from 'crypto';
import { CONFIG } from '../utils/constants.js';

/**
 * Generate a provably fair crash point
 * Based on SHA-256 hash algorithm
 * 
 * @param {string} serverSeed - Server's secret seed
 * @param {string} clientSeed - Client's public seed
 * @param {number} nonce - Round number
 * @returns {object} { crashPoint, hash }
 */
export const generateCrashPoint = (serverSeed, clientSeed, nonce) => {
  // 1. Create hash
  const hash = crypto
    .createHmac('sha256', serverSeed)
    .update(`${clientSeed}-${nonce}`)
    .digest('hex');

  // 2. Take first 8 characters
  const hex = hash.substring(0, 8);
  const decimal = parseInt(hex, 16);

  // 3. Calculate crash point
  let crashPoint = Math.max(1.00, (Math.pow(2, 32) / (decimal + 1)) * (1 - CONFIG.REAL.HOUSE_EDGE));

  // 4. 3% chance of instant crash (1.00x)
  if (Math.random() < CONFIG.GAME.INSTANT_CRASH_CHANCE) {
    crashPoint = 1.00;
  }

  // 5. Round to 2 decimal places
  crashPoint = Math.round(crashPoint * 100) / 100;

  // 6. Cap at reasonable maximum (100x)
  crashPoint = Math.min(crashPoint, 100.00);

  return {
    crashPoint: parseFloat(crashPoint.toFixed(2)),
    hash: hash
  };
};

/**
 * Generate crash point for DEMO mode
 * Higher win rate (60%) for user encouragement
 * 
 * @returns {number} crashPoint
 */
export const generateDemoCrashPoint = () => {
  const random = Math.random();

  if (random < CONFIG.DEMO.WIN_RATE) {
    // 60% chance: 1.50x - 5.00x
    return parseFloat((1.50 + Math.random() * 3.50).toFixed(2));
  } else {
    // 40% chance: 1.00x - 1.49x
    return parseFloat((1.00 + Math.random() * 0.49).toFixed(2));
  }
};

/**
 * Generate random server seed
 * @returns {string} 64-character hex string
 */
export const generateServerSeed = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Verify a crash point (for transparency)
 * 
 * @param {string} serverSeed
 * @param {string} clientSeed
 * @param {number} nonce
 * @param {number} claimedCrashPoint
 * @returns {boolean} isValid
 */
export const verifyCrashPoint = (serverSeed, clientSeed, nonce, claimedCrashPoint) => {
  const { crashPoint } = generateCrashPoint(serverSeed, clientSeed, nonce);
  return Math.abs(crashPoint - claimedCrashPoint) < 0.01; // Allow 0.01 difference for rounding
};

export default {
  generateCrashPoint,
  generateDemoCrashPoint,
  generateServerSeed,
  verifyCrashPoint
};
