// src/pages/CalculatorPage.tsx - MOBILE RESPONSIVE VERSION
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap, Info, RefreshCw, ArrowRight } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const [hashRate, setHashRate] = useState<number>(100);
  const [hashUnit, setHashUnit] = useState<string>('TH/s');
  const [powerConsumption, setPowerConsumption] = useState<number>(3250);
  const [electricityCost, setElectricityCost] = useState<number>(0.12);
  const [poolFee, setPoolFee] = useState<number>(1);
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [ltcPrice, setLtcPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Gerçek kripto fiyatlarını çek
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd'
        );
        const data = await response.json();
        
        setBtcPrice(data.bitcoin.usd);
        setEthPrice(data.ethereum.usd);
        setLtcPrice(data.litecoin.usd);
        setLastUpdate(new Date().toLocaleTimeString());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // Fallback fiyatlar
        setBtcPrice(43000);
        setEthPrice(2300);
        setLtcPrice(70);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const convertToTHs = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'H/s': value / 1e12,
      'KH/s': value / 1e9,
      'MH/s': value / 1e6,
      'GH/s': value / 1e3,
      'TH/s': value,
      'PH/s': value * 1e3,
    };
    return conversions[unit] || value;
  };

  const calculateMining = () => {
    const thsHashRate = convertToTHs(hashRate, hashUnit);
    
    const difficulties: { [key: string]: number } = {
      'BTC': 67957790298897.88,
      'ETH': 0,
      'LTC': 24818520.44,
    };

    const prices: { [key: string]: number } = {
      'BTC': btcPrice,
      'ETH': ethPrice,
      'LTC': ltcPrice,
    };

    const blockRewards: { [key: string]: number } = {
      'BTC': 6.25,
      'ETH': 0,
      'LTC': 12.5,
    };

    const difficulty = difficulties[selectedCoin];
    const price = prices[selectedCoin];
    const blockReward = blockRewards[selectedCoin];

    let dailyRevenue = 0;
    if (selectedCoin === 'BTC' && difficulty > 0) {
      const hashesPerSecond = thsHashRate * 1e12;
      const networkHashRate = (difficulty * Math.pow(2, 32)) / 600;
      const dailyBlocks = (hashesPerSecond / networkHashRate) * 144;
      dailyRevenue = dailyBlocks * blockReward * price;
    } else if (selectedCoin === 'LTC' && difficulty > 0) {
      const hashesPerSecond = thsHashRate * 1e12;
      const networkHashRate = difficulty * Math.pow(2, 32) / 150;
      const dailyBlocks = (hashesPerSecond / networkHashRate) * 576;
      dailyRevenue = dailyBlocks * blockReward * price;
    }

    const dailyPowerCost = (powerConsumption / 1000) * 24 * electricityCost;
    const poolFeeAmount = dailyRevenue * (poolFee / 100);
    const dailyProfit = dailyRevenue - dailyPowerCost - poolFeeAmount;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;

    return {
      dailyRevenue: Math.max(0, dailyRevenue),
      dailyPowerCost,
      poolFeeAmount,
      dailyProfit: Math.max(0, dailyProfit),
      monthlyProfit: Math.max(0, monthlyProfit),
      yearlyProfit: Math.max(0, yearlyProfit),
    };
  };

  const results = calculateMining();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <a href="/" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 flex-shrink-0" />
              <span className="text-sm sm:text-lg lg:text-xl font-bold text-white truncate">Bitcoin Calculator</span>
            </a>
            <a
              href="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 sm:px-6 sm:py-2.5 rounded-lg font-semibold transition-all text-xs sm:text-base whitespace-nowrap"
            >
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Bitcoin Mining Calculator
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Calculate your bitcoin mining profitability with real-time cryptocurrency prices
            </p>
          </div>

          {/* Price Ticker */}
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm sm:text-base">BTC:</span>
                <span className="text-green-400 font-bold text-sm sm:text-base">${btcPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm sm:text-base">ETH:</span>
                <span className="text-green-400 font-bold text-sm sm:text-base">${ethPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm sm:text-base">LTC:</span>
                <span className="text-green-400 font-bold text-sm sm:text-base">${ltcPrice.toLocaleString()}</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                disabled={loading}
              >
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Updated: {lastUpdate}</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Calculator Input */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400" />
                Mining Parameters
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Cryptocurrency Selection */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Select Cryptocurrency
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="LTC">Litecoin (LTC)</option>
                  </select>
                </div>

                {/* Hash Rate */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Hash Rate
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={hashRate}
                      onChange={(e) => setHashRate(Number(e.target.value))}
                      className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      min="0"
                      step="1"
                    />
                    <select
                      value={hashUnit}
                      onChange={(e) => setHashUnit(e.target.value)}
                      className="bg-gray-800 text-white rounded-lg px-2 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    >
                      <option value="H/s">H/s</option>
                      <option value="KH/s">KH/s</option>
                      <option value="MH/s">MH/s</option>
                      <option value="GH/s">GH/s</option>
                      <option value="TH/s">TH/s</option>
                      <option value="PH/s">PH/s</option>
                    </select>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Bitmain Antminer S19 Pro: 110 TH/s
                  </p>
                </div>

                {/* Power Consumption */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Power Consumption (Watts)
                  </label>
                  <input
                    type="number"
                    value={powerConsumption}
                    onChange={(e) => setPowerConsumption(Number(e.target.value))}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    min="0"
                    step="10"
                  />
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Antminer S19 Pro: 3250W
                  </p>
                </div>

                {/* Electricity Cost */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Electricity Cost ($/kWh)
                  </label>
                  <input
                    type="number"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Average: $0.12/kWh
                  </p>
                </div>

                {/* Pool Fee */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Pool Fee (%)
                  </label>
                  <input
                    type="number"
                    value={poolFee}
                    onChange={(e) => setPoolFee(Number(e.target.value))}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 sm:space-y-6">
              {/* Profit Summary */}
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-500/30">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-400" />
                  Results
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm sm:text-base">Daily Revenue</span>
                      <span className="text-xl sm:text-2xl font-bold text-green-400">
                        ${results.dailyRevenue.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-400">Power Cost</span>
                      <span className="text-red-400">-${results.dailyPowerCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-400">Pool Fee</span>
                      <span className="text-red-400">-${results.poolFeeAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-500/30">
                    <div className="text-center">
                      <p className="text-gray-300 mb-2 text-sm sm:text-base">Daily Profit</p>
                      <p className="text-3xl sm:text-4xl font-bold text-yellow-400">
                        ${results.dailyProfit.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Monthly</p>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        ${results.monthlyProfit.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Yearly</p>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        ${results.yearlyProfit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-blue-600/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">About This Calculator</h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      Real-time cryptocurrency prices and network difficulty for accurate mining profitability calculations.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/30">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Start Mining Without Hardware</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Skip expensive ASIC miners. Start cloud mining with our platform.
                </p>
                <a
                  href="/auth"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base"
                >
                  <span>Start Free Mining</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 sm:mt-12 lg:mt-16 space-y-6 sm:space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">How Does Mining Bitcoin Work?</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                <p>
                  Bitcoin mining validates transactions using proof of work (PoW). Miners use ASIC hardware like Bitmain Antminer to solve cryptographic puzzles.
                </p>
                <p>
                  Traditional mining requires expensive hardware and high electricity costs. Cloud mining eliminates these barriers.
                </p>
                <p>
                  Our platform offers a user-friendly interface for earning passive income without physical equipment.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Key Features</h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                    <span>Real-time cryptocurrency prices</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                    <span>No expensive hardware</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                    <span>Avoid high electricity costs</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                    <span>User-friendly interface</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Why Cloud Mining?</h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>Free trials and bonuses</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>No technical expertise</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>Cutting-edge technology</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>Bitcoin wallet payouts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-blue-500/30">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Start Bitcoin Cloud Mining?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands earning free bitcoin. No expensive hardware, no term contract.
            </p>
            <a
              href="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Get Free $25 Bonus</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-6 sm:py-8 mt-8 sm:mt-12 lg:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Bitcoin Mining Calculator - Calculate crypto mining profitability with real-time data
          </p>
          <p className="text-gray-500 text-xs mt-2 sm:mt-4">
            © 2024 FreeCloudMiner. Bitcoin mining calculator with proof of work PoW data
          </p>
        </div>
      </footer>
    </div>
  );
};
