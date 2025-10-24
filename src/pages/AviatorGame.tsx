// Aviator Crash Game Component
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { Plane, TrendingUp, DollarSign, Users, History, Play, StopCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const GAME_SERVER_URL = 'http://localhost:3001';

interface GameState {
  state: 'WAITING' | 'COUNTDOWN' | 'FLYING' | 'CRASHED';
  roundId: string;
  roundNumber: number;
  multiplier: number;
  bets: any[];
  isDemoMode: boolean;
}

interface Bet {
  betId: string;
  amount: number;
  cashOutAt: number | null;
  profit: number;
  status: 'ACTIVE' | 'CASHED_OUT' | 'LOST';
}

export const AviatorGame: React.FC = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [betAmount, setBetAmount] = useState('10');
  const [demoBalance, setDemoBalance] = useState(100);
  const [gameBalance, setGameBalance] = useState(0);
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [crashPoint, setCrashPoint] = useState<number | null>(null);
  const [liveBets, setLiveBets] = useState<any[]>([]);
  const [betHistory, setBetHistory] = useState<any[]>([]);
  const [crashHistory, setCrashHistory] = useState<number[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user) return;

    const newSocket = io(GAME_SERVER_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to game server');
      toast.success('Connected to game server');
      
      // Initialize user
      newSocket.emit('user:init', {
        userId: user.uid,
        isDemoMode: true
      });
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
      toast.error('Failed to connect to game server');
    });

    // Game state events
    newSocket.on('game:state', (state: GameState) => {
      setGameState(state);
      setCurrentMultiplier(state.multiplier);
    });

    newSocket.on('game:roundCreated', (data) => {
      console.log('🎮 New round:', data);
      setCrashPoint(null);
      setCurrentBet(null);
    });

    newSocket.on('game:countdown', (data) => {
      setCountdown(data.countdown);
    });

    newSocket.on('game:started', (data) => {
      setCountdown(null);
      setCurrentMultiplier(data.multiplier);
      startAnimation();
    });

    newSocket.on('game:multiplier', (data) => {
      setCurrentMultiplier(data.multiplier);
    });

    newSocket.on('game:crashed', (data) => {
      console.log('💥 Game crashed at', data.crashPoint);
      setCrashPoint(data.crashPoint);
      setCrashHistory(prev => [data.crashPoint, ...prev].slice(0, 10));
      stopAnimation();
      
      // Check if current bet lost
      if (currentBet && !currentBet.cashOutAt) {
        toast.error(`Lost $${currentBet.amount.toFixed(2)}`);
        setCurrentBet(prev => prev ? { ...prev, status: 'LOST', profit: -prev.amount } : null);
      }
    });

    newSocket.on('game:waiting', () => {
      setCountdown(null);
    });

    // User events
    newSocket.on('user:initialized', (data) => {
      setDemoBalance(data.demoBalance);
      setGameBalance(data.gameBalance);
    });

    newSocket.on('user:balance', (data) => {
      setDemoBalance(data.demoBalance);
      setGameBalance(data.gameBalance);
    });

    // Bet events
    newSocket.on('bet:placed', (data) => {
      setCurrentBet({
        betId: data.bet.betId,
        amount: data.bet.amount,
        cashOutAt: null,
        profit: 0,
        status: 'ACTIVE'
      });
      setDemoBalance(data.newBalance);
      toast.success(`Bet placed: $${data.bet.amount}`);
    });

    newSocket.on('bet:cashedOut', (data) => {
      setCurrentBet({
        betId: data.bet.betId,
        amount: data.bet.amount,
        cashOutAt: data.bet.cashOutAt,
        profit: data.profit,
        status: 'CASHED_OUT'
      });
      
      if (isDemoMode) {
        setDemoBalance(data.newBalance);
      } else {
        setGameBalance(data.newBalance);
      }
      
      toast.success(`Won $${data.winAmount.toFixed(2)} at ${data.bet.cashOutAt}x!`, {
        icon: '🎉',
        duration: 5000
      });
      
      // Add to history
      setBetHistory(prev => [data.bet, ...prev].slice(0, 20));
    });

    newSocket.on('bet:error', (data) => {
      toast.error(data.message);
    });

    newSocket.on('game:betPlaced', (data) => {
      setLiveBets(prev => [...prev, data]);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      toast.error('Disconnected from server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      stopAnimation();
    };
  }, [user]);

  // Canvas animation
  const startAnimation = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let planeY = canvas.height - 50;
    let planeX = 50;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#1e40af';
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
      
      // Draw plane trail
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(planeX, planeY);
      ctx.stroke();
      
      // Draw plane (simple triangle)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(planeX, planeY - 15);
      ctx.lineTo(planeX - 20, planeY + 15);
      ctx.lineTo(planeX + 20, planeY + 15);
      ctx.closePath();
      ctx.fill();
      
      // Move plane upward
      if (gameState?.state === 'FLYING') {
        planeY -= 1;
        planeX += 1.5;
        
        if (planeY < 0) planeY = 0;
        if (planeX > canvas.width) planeX = canvas.width;
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
    
    // Draw explosion effect
    if (canvasRef.current && crashPoint) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.beginPath();
        ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 3, 100, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw crash text
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`CRASHED at ${crashPoint}x`, canvasRef.current.width / 2, canvasRef.current.height / 2);
      }
    }
  };

  const handlePlaceBet = () => {
    if (!socket || !user) return;
    
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid bet amount');
      return;
    }

    socket.emit('bet:place', {
      userId: user.uid,
      amount: amount,
      isDemoMode: isDemoMode
    });
  };

  const handleCashOut = () => {
    if (!socket || !user || !currentBet) return;

    socket.emit('bet:cashOut', {
      userId: user.uid,
      betId: currentBet.betId
    });
  };

  const canPlaceBet = gameState?.state === 'WAITING' || gameState?.state === 'COUNTDOWN';
  const canCashOut = gameState?.state === 'FLYING' && currentBet && !currentBet.cashOutAt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Plane className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Aviator Crash Game</h1>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isDemoMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              DEMO
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !isDemoMode
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              REAL
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="flex space-x-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg px-6 py-3">
            <div className="text-gray-400 text-sm">
              {isDemoMode ? 'Demo Balance' : 'Game Balance'}
            </div>
            <div className="text-2xl font-bold text-white">
              ${isDemoMode ? demoBalance.toFixed(2) : gameBalance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Game */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            {/* Multiplier Display */}
            <div className="text-center mb-4">
              {countdown !== null && countdown > 0 ? (
                <div className="text-6xl font-bold text-yellow-400 animate-pulse">
                  Starting in {countdown}...
                </div>
              ) : gameState?.state === 'FLYING' ? (
                <div className="text-8xl font-bold text-green-400 animate-pulse">
                  {currentMultiplier.toFixed(2)}x
                </div>
              ) : crashPoint ? (
                <div className="text-6xl font-bold text-red-400">
                  CRASHED at {crashPoint}x
                </div>
              ) : (
                <div className="text-4xl font-bold text-gray-400">
                  Waiting for next round...
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
          </div>

          {/* Betting Interface */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Bet Amount ($)</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg"
                  placeholder="Enter amount"
                  disabled={!canPlaceBet || !!currentBet}
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div className="flex items-end space-x-2">
                {!currentBet ? (
                  <button
                    onClick={handlePlaceBet}
                    disabled={!canPlaceBet}
                    className={`flex-1 py-3 rounded-lg font-bold text-lg transition ${
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
                    className={`flex-1 py-3 rounded-lg font-bold text-lg transition ${
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
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400">Current Bet:</span>
                    <span className="text-white font-bold ml-2">${currentBet.amount.toFixed(2)}</span>
                  </div>
                  {currentBet.cashOutAt && (
                    <div>
                      <span className="text-gray-400">Cashed Out at:</span>
                      <span className="text-green-400 font-bold ml-2">{currentBet.cashOutAt.toFixed(2)}x</span>
                      <span className="text-green-400 ml-2">(+${currentBet.profit.toFixed(2)})</span>
                    </div>
                  )}
                  {currentBet.status === 'LOST' && (
                    <span className="text-red-400 font-bold">Lost</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Crash History */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <History className="w-5 h-5 mr-2" />
              Last 10 Crashes
            </h3>
            <div className="flex flex-wrap gap-2">
              {crashHistory.map((crash, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-lg font-bold ${
                    crash >= 2
                      ? 'bg-green-600 text-white'
                      : crash >= 1.5
                      ? 'bg-blue-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {crash.toFixed(2)}x
                </div>
              ))}
            </div>
          </div>

          {/* Bet History */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Your Bets
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {betHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">No bets yet</p>
              ) : (
                betHistory.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-3 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bet:</span>
                      <span className="text-white">${bet.amount?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cash Out:</span>
                      <span className={bet.cashOutAt ? 'text-green-400' : 'text-red-400'}>
                        {bet.cashOutAt ? `${bet.cashOutAt.toFixed(2)}x` : 'Lost'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit:</span>
                      <span className={bet.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {bet.profit >= 0 ? '+' : ''}${bet.profit?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
