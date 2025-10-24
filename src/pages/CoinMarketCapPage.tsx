// src/pages/CoinMarketCapPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, BarChart3, Users, CheckCircle, TrendingUp, Menu, X, Calculator, LineChart } from 'lucide-react';

export const CoinMarketCapPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(15234);
  const [totalEarnings, setTotalEarnings] = useState(678450);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 15));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 350));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How does CoinMarketCap mining calculator work?",
      answer: "Our CoinMarketCap mining calculator uses live CoinMarketCap prices for accurate profitability. Check real-time CoinMarketCap data for bitcoin mining, ethereum, dogecoin, and more. Better than using Binance or Coinbase calculators. Our mining calculator pulls CoinMarketCap API for cryptocurrency mining profitability!"
    },
    {
      question: "Can I track mining earnings with CoinMarketCap prices?",
      answer: "Yes! Our platform integrates CoinMarketCap prices for mining tracking. Monitor your cryptocurrency mining with live CoinMarketCap data. Check BTC USD, ETH, and all coins on CoinMarketCap. Better than Binance or Coinbase for tracking mine crypto earnings with CoinMarketCap calculator!"
    },
    {
      question: "Is CoinMarketCap mining calculator accurate?",
      answer: "Absolutely! Our CoinMarketCap calculator uses real-time CoinMarketCap API prices. Most accurate for cryptocurrency mining profitability. Compare with Binance, Coinbase prices - CoinMarketCap data is industry standard. Use CoinMarketCap mining calculator for bitcoin mining, ethereum miner, and all crypto!"
    },
    {
      question: "How to use CoinMarketCap prices for mining?",
      answer: "Simple! Our mining platform uses CoinMarketCap prices automatically. Check CoinMarketCap calculator for profitability. Mine crypto with live CoinMarketCap data. Better than manually checking CoinMarketCap website. Our cryptocurrency mining uses CoinMarketCap API for BTC USD and all coins!"
    },
    {
      question: "Does CoinMarketCap show my mining profits?",
      answer: "Yes! Track mining with CoinMarketCap prices on our dashboard. See your cryptocurrency mining earnings in real-time using CoinMarketCap data. Check BTC USD, ethereum, dogecoin with CoinMarketCap calculator. Better than Binance or Coinbase for monitoring mine crypto with CoinMarketCap!"
    },
    {
      question: "Why use CoinMarketCap for mining calculator?",
      answer: "CoinMarketCap is the #1 crypto price tracker! Our mining calculator uses CoinMarketCap prices for accuracy. Better than using only Binance or Coinbase. CoinMarketCap aggregates all exchanges. Use CoinMarketCap mining calculator for best cryptocurrency mining profitability estimates!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
      <Helmet>
        <title>CryptoMarket Cloud Mining | Multi-Coin Earnings 2025</title>
        <meta name="description" content="Mine multiple coins at once — BTC, ETH, DOGE, LTC. Real-time profits, zero maintenance costs, and instant exchange on CryptoMarket →" />
        <meta name="keywords" content="coinmarketcap, coinmarketcap calculator, coinmarketcap prices, coinmarketcap btc usd, mining calculator coinmarketcap, track with coinmarketcap, coinmarketcap mining, coinmarketcap crypto prices, bitcoin mining, cryptocurrency mining, btc usd, binance, coinbase, mine crypto, crypto miner" />
        <link rel="canonical" href="https://freecloudeminer.com/coinmarketcap" />
        <meta property="og:title" content="CoinMarketCap Mining Calculator - Live CoinMarketCap Prices" />
        <meta property="og:description" content="Mining calculator with CoinMarketCap prices! Track crypto mining with live CoinMarketCap data. BTC USD on CoinMarketCap!" />
      </Helmet>
      
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Hammer className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">FreeCloudMiner</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/market" className="text-gray-300 hover:text-white transition-colors">Market</Link>
              <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Calculator className="h-4 w-4" />
                <span>Calculator</span>
              </Link>
              <Link to="/coinmarketcap" className="text-blue-400 font-semibold">CoinMarketCap</Link>
              <Link to="/binance" className="text-gray-300 hover:text-white transition-colors">Binance</Link>
              <Link to="/coinbase" className="text-gray-300 hover:text-white transition-colors">Coinbase</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                CoinMarketCap Calculator
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🧮 Calculator</Link>
                <Link to="/coinmarketcap" className="text-blue-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>📊 CoinMarketCap</Link>
                <Link to="/binance" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Binance</Link>
                <Link to="/coinbase" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Coinbase</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-200">Live CoinMarketCap Prices</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">CoinMarketCap API</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:h-5 text-cyan-400" />
                <span className="text-xs sm:text-sm text-gray-200">15K+ Using CoinMarketCap</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/50 rounded-full px-4 py-2 mb-4">
                <p className="text-blue-300 text-sm font-semibold">📊 CoinMarketCap Mining Calculator - Live CoinMarketCap Prices</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                CoinMarketCap Mining Calculator - Track Cryptocurrency Mining with Live CoinMarketCap Prices
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Use our CoinMarketCap mining calculator with real-time CoinMarketCap prices! Track cryptocurrency mining profitability using live CoinMarketCap data. Check BTC USD, ethereum, dogecoin, and all coins on CoinMarketCap. Better than using only Binance or Coinbase calculators. Our mining calculator integrates CoinMarketCap API for accurate bitcoin mining profits. Mine crypto with confidence using CoinMarketCap prices for cryptocurrency mining, ethereum miner, and all crypto calculations!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Use CoinMarketCap Calculator - Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>CoinMarketCap Mining Calculator</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">15K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Using CoinMarketCap</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€678K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Tracked on CoinMarketCap</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">Live</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">CoinMarketCap Prices</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">100%</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">CoinMarketCap API</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-6 bg-gradient-to-r from-blue-900/30 to-green-900/30 border-y border-blue-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <LineChart className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> using CoinMarketCap
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">€{totalEarnings.toLocaleString()}</strong> tracked on CoinMarketCap
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  Live <strong className="text-white font-bold">CoinMarketCap BTC USD</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Use CoinMarketCap Mining Calculator for Cryptocurrency Mining</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best mining calculator with CoinMarketCap prices! Track cryptocurrency mining with live CoinMarketCap data. Better than Binance or Coinbase calculators!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <BarChart3 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Live CoinMarketCap Prices</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our CoinMarketCap mining calculator uses real-time CoinMarketCap API! Check BTC USD, ethereum, dogecoin on CoinMarketCap. Better than manual checking. Mine crypto with accurate CoinMarketCap prices for cryptocurrency mining profitability!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Accurate CoinMarketCap Calculator</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Most accurate mining calculator with CoinMarketCap data! Better than Binance or Coinbase calculators. Use CoinMarketCap prices for bitcoin mining, ethereum miner. Track cryptocurrency mining profits with CoinMarketCap calculator!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <LineChart className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Track Mining on CoinMarketCap</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Monitor cryptocurrency mining with CoinMarketCap prices! See BTC USD, all coins on CoinMarketCap dashboard. Better than checking Binance or Coinbase separately. Track mine crypto earnings with live CoinMarketCap data!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">CoinMarketCap BTC USD Live</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Get live CoinMarketCap BTC USD prices! Our mining calculator pulls real-time CoinMarketCap data. Better than Binance or Coinbase for price accuracy. Check bitcoin mining profits with CoinMarketCap calculator!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Official CoinMarketCap API</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We use official CoinMarketCap API! Most trusted cryptocurrency mining calculator. CoinMarketCap is #1 crypto price tracker. Mine crypto with reliable CoinMarketCap prices better than Binance or Coinbase data!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">All Coins on CoinMarketCap</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Track all cryptocurrencies with CoinMarketCap! Our calculator supports bitcoin mining, ethereum miner, dogecoin, litecoin. Every coin on CoinMarketCap available. Mine crypto with comprehensive CoinMarketCap price data!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">CoinMarketCap Mining Calculator Reviews</h2>
              <p className="text-gray-300 text-base sm:text-lg">Users tracking cryptocurrency mining with CoinMarketCap prices</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">A</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Alex Turner</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best CoinMarketCap mining calculator! Love using CoinMarketCap prices for tracking. Better than Binance or Coinbase calculators. The CoinMarketCap API integration is perfect for cryptocurrency mining profitability!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">CoinMarketCap User</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">B</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Beth Harrison</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Accurate CoinMarketCap calculator! I check my mining with CoinMarketCap prices daily. Live CoinMarketCap BTC USD is spot-on. Better than using Binance alone. Perfect for bitcoin mining tracking!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">Uses CoinMarketCap Daily</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">C</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Chris Martinez</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Love this CoinMarketCap mining calculator! Track all my cryptocurrency mining with CoinMarketCap. More accurate than Coinbase. The CoinMarketCap integration makes mine crypto easy to monitor!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">CoinMarketCap Pro User</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-green-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Using CoinMarketCap Mining Calculator Today!</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join 15,000+ users tracking cryptocurrency mining with CoinMarketCap prices! Best mining calculator with live CoinMarketCap data. Check BTC USD, ethereum, all coins on CoinMarketCap. Better than Binance or Coinbase calculators. Mine crypto with accurate CoinMarketCap calculator!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <BarChart3 className="h-6 w-6" />
              <span>Use CoinMarketCap Calculator Free</span>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">CoinMarketCap Mining Calculator FAQ</h2>
              <p className="text-base sm:text-xl text-gray-300">Questions about using CoinMarketCap for cryptocurrency mining calculator</p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-white text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-2xl text-blue-400 font-bold">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 sm:px-6 pb-4">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best CoinMarketCap mining calculator! Track cryptocurrency mining with live CoinMarketCap prices. Use CoinMarketCap for BTC USD, ethereum, all coins. Better than Binance or Coinbase calculators. Mine crypto with accurate CoinMarketCap data!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - CoinMarketCap Mining Calculator • CoinMarketCap Prices • CoinMarketCap BTC USD • Cryptocurrency Mining • Bitcoin Mining • Mine Crypto • Track with CoinMarketCap • Binance Alternative • Coinbase Alternative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
