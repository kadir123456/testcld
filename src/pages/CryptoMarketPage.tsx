// src/pages/CryptoMarketPage.tsx - COIN LIST & HEATMAP
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Activity, BarChart3, RefreshCw } from 'lucide-react';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export const CryptoMarketPage: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'heatmap'>('list');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchCoins = async () => {
    setLoading(true);
    try {
      // CoinGecko API - Ücretsiz (50 calls/minute)
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'
      );
      const data = await response.json();
      setCoins(data);
      setLastUpdate(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coins:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const getHeatmapColor = (change: number) => {
    if (change > 10) return 'bg-green-600';
    if (change > 5) return 'bg-green-500';
    if (change > 0) return 'bg-green-400';
    if (change > -5) return 'bg-red-400';
    if (change > -10) return 'bg-red-500';
    return 'bg-red-600';
  };

  const getHeatmapSize = (marketCap: number) => {
    const maxCap = Math.max(...coins.map(c => c.market_cap));
    const ratio = marketCap / maxCap;
    if (ratio > 0.5) return 'col-span-2 row-span-2';
    if (ratio > 0.2) return 'col-span-2';
    return 'col-span-1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">Crypto Market</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('heatmap')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  viewMode === 'heatmap'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Heatmap
              </button>
              <a
                href="/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Live Cryptocurrency Prices
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Real-time cryptocurrency data powered by CoinGecko API. Track top 100 coins by market cap.
            </p>
          </div>

          {/* Search & Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                Last updated: {lastUpdate || 'Loading...'}
              </span>
              <button
                onClick={fetchCoins}
                disabled={loading}
                className="flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Total Coins</p>
              <p className="text-2xl font-bold text-white">{coins.length}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Total Market Cap</p>
              <p className="text-2xl font-bold text-white">
                {formatMarketCap(coins.reduce((sum, coin) => sum + coin.market_cap, 0))}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">24h Volume</p>
              <p className="text-2xl font-bold text-white">
                {formatMarketCap(coins.reduce((sum, coin) => sum + coin.total_volume, 0))}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">BTC Dominance</p>
              <p className="text-2xl font-bold text-white">
                {coins.length > 0 ? ((coins[0]?.market_cap / coins.reduce((sum, coin) => sum + coin.market_cap, 0)) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : viewMode === 'list' ? (
            /* List View */
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase">#</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Coin</th>
                      <th className="px-4 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Price</th>
                      <th className="px-4 py-4 text-right text-xs font-semibold text-gray-400 uppercase">24h %</th>
                      <th className="px-4 py-4 text-right text-xs font-semibold text-gray-400 uppercase hidden sm:table-cell">Market Cap</th>
                      <th className="px-4 py-4 text-right text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">Volume(24h)</th>
                      <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400 uppercase hidden lg:table-cell">Last 7 Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoins.map((coin, index) => (
                      <tr key={coin.id} className="border-t border-gray-700/50 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 text-gray-400 text-sm">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-white font-semibold text-sm">{coin.name}</p>
                              <p className="text-gray-400 text-xs uppercase">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-white font-semibold text-sm">
                          {formatPrice(coin.current_price)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className={`flex items-center justify-end space-x-1 font-semibold text-sm ${
                            coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {coin.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-gray-300 text-sm hidden sm:table-cell">
                          {formatMarketCap(coin.market_cap)}
                        </td>
                        <td className="px-4 py-4 text-right text-gray-300 text-sm hidden md:table-cell">
                          {formatMarketCap(coin.total_volume)}
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex justify-center">
                            <svg width="100" height="30" className="overflow-visible">
                              <polyline
                                points={coin.sparkline_in_7d.price.map((price, i) => 
                                  `${i * (100 / coin.sparkline_in_7d.price.length)},${30 - (price - Math.min(...coin.sparkline_in_7d.price)) / (Math.max(...coin.sparkline_in_7d.price) - Math.min(...coin.sparkline_in_7d.price)) * 25}`
                                ).join(' ')}
                                fill="none"
                                stroke={coin.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171'}
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Heatmap View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 auto-rows-fr">
              {filteredCoins.slice(0, 50).map((coin) => (
                <div
                  key={coin.id}
                  className={`${getHeatmapColor(coin.price_change_percentage_24h)} ${getHeatmapSize(coin.market_cap)} rounded-lg p-3 flex flex-col justify-between min-h-[100px] hover:opacity-80 transition-opacity cursor-pointer`}
                  title={`${coin.name} (${coin.symbol.toUpperCase()})`}
                >
                  <div>
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full mb-1" />
                    <p className="text-white font-bold text-xs truncate">{coin.symbol.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    <p className="text-white/80 text-xs">{formatMarketCap(coin.market_cap)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-blue-500/30 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Mining Top Cryptocurrencies
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Mine Bitcoin, Ethereum, and other top cryptocurrencies with our cloud mining platform.
            </p>
            <a
              href="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Start Mining Now</span>
              <BarChart3 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            Live cryptocurrency prices and market data powered by CoinGecko API
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024 FreeCloudMiner. Real-time crypto market data
          </p>
        </div>
      </footer>
    </div>
  );
};
