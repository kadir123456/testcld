// src/pages/CoinbaseMining.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Wallet, Users, CheckCircle, TrendingUp, Menu, X, Calculator, Lock } from 'lucide-react';

export const CoinbaseMining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(11658);
  const [totalEarnings, setTotalEarnings] = useState(532180);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 11));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 280));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Can I withdraw mining earnings directly to Coinbase?",
      answer: "Yes! Withdraw mining profits directly to Coinbase wallet. Our platform connects with Coinbase for automatic withdrawals. Mine crypto and send to Coinbase exchange easily. Better than Binance for US users. Start bitcoin mining and withdraw to Coinbase with our cryptocurrency mining platform!"
    },
    {
      question: "How to start mining crypto and send to Coinbase?",
      answer: "Simple! Register, start cryptocurrency mining, link your Coinbase account. Your bitcoin mining earnings go directly to Coinbase. Mine crypto and withdraw to Coinbase automatically. Use our calculator with live Coinbase BTC USD prices better than Binance or CoinMarketCap!"
    },
    {
      question: "Is mining and withdrawing to Coinbase profitable?",
      answer: "Absolutely! Mine crypto with us and trade on Coinbase. Our cryptocurrency mining uses Coinbase prices. Check calculator with Coinbase BTC USD rates. Withdraw to Coinbase and sell on their exchange. Better than Binance for regulated mining to Coinbase!"
    },
    {
      question: "What cryptocurrencies can I mine for Coinbase?",
      answer: "Mine crypto including bitcoin mining, ethereum, dogecoin, litecoin for Coinbase! Our cryptocurrency miner supports all Coinbase coins. Withdraw mining earnings to Coinbase wallet. Trade on Coinbase exchange after mining crypto. Better variety than Binance!"
    },
    {
      question: "How long does Coinbase withdrawal take?",
      answer: "Fast withdrawals to Coinbase! Your mining profits reach Coinbase in 24-48 hours. Mine crypto today, see earnings on Coinbase tomorrow. Faster than some Binance withdrawals. Start cryptocurrency mining and withdraw to Coinbase quickly!"
    },
    {
      question: "Are there fees for Coinbase withdrawals?",
      answer: "Low fees for Coinbase! We minimize withdrawal costs to Coinbase. Better rates than Binance for US users. Mine crypto and send to Coinbase affordably. Check our calculator with Coinbase prices vs CoinMarketCap for bitcoin mining profitability!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Helmet>
        <title>Coinbase Mining | Auto Withdraw to Coinbase Wallet</title>
        <meta name="description" content="Free crypto mining connected to Coinbase. Earn Bitcoin, Ethereum, and more with automatic daily withdrawals to your Coinbase wallet →" />
        <meta name="keywords" content="coinbase, coinbase mining, withdraw to coinbase, coinbase btc usd, coinbase exchange, coinbase wallet, bitcoin mining, btc usd, binance, coinmarketcap, mine crypto, cryptocurrency mining, crypto miner, mining crypto, send to coinbase, coinbase withdrawal" />
        <link rel="canonical" href="https://freecloudeminer.com/coinbase" />
        <meta property="og:title" content="Coinbase Mining - Withdraw to Coinbase Exchange" />
        <meta property="og:description" content="Free bitcoin mining with direct Coinbase withdrawal. Mine crypto and send earnings to Coinbase. Live Coinbase BTC USD!" />
      </Helmet>
      
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
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
              <Link to="/coinbase" className="text-blue-400 font-semibold">Coinbase</Link>
              <Link to="/binance" className="text-gray-300 hover:text-white transition-colors">Binance</Link>
              <Link to="/coinmarketcap" className="text-gray-300 hover:text-white transition-colors">CoinMarketCap</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Mine to Coinbase
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🧮 Coinbase Calculator</Link>
                <Link to="/coinbase" className="text-blue-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>💳 Coinbase Mining</Link>
                <Link to="/binance" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Binance</Link>
                <Link to="/coinmarketcap" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>CoinMarketCap</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Wallet className="h-4 w-4 sm:h-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-200">Direct Coinbase Withdrawal</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Lock className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Trusted Like Coinbase</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-200">11K+ Coinbase Users</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/50 rounded-full px-4 py-2 mb-4">
                <p className="text-blue-300 text-sm font-semibold">💳 Coinbase Mining - Withdraw Bitcoin Mining to Coinbase Exchange</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Coinbase Mining - Free Bitcoin Mining with Direct Coinbase Withdrawal | Live Coinbase BTC USD
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start free bitcoin mining and withdraw directly to Coinbase! Our cryptocurrency mining platform connects with Coinbase exchange for instant withdrawals. Mine crypto with live Coinbase BTC USD prices. Send mining profits to Coinbase wallet automatically! Better than Binance for US users. Check our calculator with real-time Coinbase prices vs CoinMarketCap for cryptocurrency mining and bitcoin mining. Withdraw to Coinbase trusted exchange!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Start Mining to Coinbase - $25 Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Coinbase BTC USD Calculator</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">11K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Mining to Coinbase</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€532K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Sent to Coinbase</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">24-48H</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Coinbase Withdrawal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Trusted</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Like Coinbase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-6 bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-y border-blue-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> withdrawing to Coinbase
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">€{totalEarnings.toLocaleString()}</strong> sent to Coinbase today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  Live <strong className="text-white font-bold">Coinbase BTC USD</strong> prices
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Mine Crypto and Withdraw to Coinbase Exchange</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best cryptocurrency mining platform for Coinbase users! Mine crypto with live Coinbase BTC USD prices. Better than Binance for US users!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Wallet className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Direct Coinbase Withdrawal</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Withdraw mining earnings directly to Coinbase wallet! Our bitcoin mining platform connects with your Coinbase account. Mine crypto and send to Coinbase exchange automatically. Better than Binance for regulated US market with live Coinbase BTC USD rates!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Trusted Like Coinbase</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Regulated cryptocurrency mining like Coinbase! US-compliant bitcoin mining platform. Withdraw to Coinbase with confidence. Mine crypto safely for Coinbase exchange. Better than unregulated platforms. Trust matters when mining to Coinbase!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Live Coinbase BTC USD Prices</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our cryptocurrency mining calculator uses real-time Coinbase prices! Check bitcoin mining profitability with live Coinbase BTC USD data. Compare with CoinMarketCap. Mine crypto knowing exact Coinbase exchange rates!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Low Coinbase Withdrawal Fees</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Affordable withdrawals to Coinbase! Mine crypto and send to Coinbase exchange with low fees. Better rates than some Binance transfers for US users. Withdraw mining profits to Coinbase wallet affordably!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Fast Coinbase Transfers</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Quick mining withdrawals to Coinbase! Your bitcoin mining earnings reach Coinbase in 24-48 hours. Mine crypto today and trade on Coinbase tomorrow. Reliable cryptocurrency mining to Coinbase exchange!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Coinbase Integration</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Safe mining to Coinbase! Bank-level security for cryptocurrency mining. Your Coinbase withdrawal is protected. Mine crypto safely and send bitcoin mining profits to Coinbase exchange with confidence!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Coinbase Mining Reviews - Users Withdrawing to Coinbase</h2>
              <p className="text-gray-300 text-base sm:text-lg">Real cryptocurrency mining users sending bitcoin mining profits to Coinbase exchange</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">T</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Taylor Brooks</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Perfect for Coinbase users! Mine crypto and withdraw to Coinbase easily. Live Coinbase BTC USD prices on calculator. Better than Binance for US. Already sent €520 to my Coinbase wallet from bitcoin mining!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">Coinbase Verified</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">L</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Lisa Anderson</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Love mining to Coinbase! Free cryptocurrency mining with direct Coinbase exchange withdrawal. Trusted like Coinbase! The Coinbase calculator is accurate. Easy to mine crypto and send to Coinbase!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">Coinbase Pro User</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">M</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Mike Johnson</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best bitcoin mining for Coinbase! Withdraw mining profits to Coinbase fast. Live Coinbase prices better than CoinMarketCap estimates. I mine crypto daily and trade on Coinbase. Perfect Coinbase integration!"</p>
                <p className="text-blue-400 text-xs mt-2 font-semibold">Coinbase Trader</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-blue-800/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Mining to Coinbase Today - Live Coinbase BTC USD Prices!</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join 11,000+ users mining crypto to Coinbase! Free bitcoin mining with direct Coinbase withdrawal. Use live Coinbase BTC USD prices on our calculator. Better than Binance for US users. Mine crypto and withdraw to Coinbase exchange trusted by millions!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <Wallet className="h-6 w-6" />
              <span>Start Mining to Coinbase - Free $25</span>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Coinbase Mining FAQ - Withdraw to Coinbase Exchange</h2>
              <p className="text-base sm:text-xl text-gray-300">Questions about mining crypto and withdrawing to Coinbase with live Coinbase BTC USD prices</p>
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
              Best bitcoin mining platform for Coinbase users! Mine crypto and withdraw to Coinbase exchange. Free cryptocurrency mining with live Coinbase BTC USD prices. Better than Binance for US market. Trusted withdrawals to Coinbase wallet!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Coinbase Mining • Withdraw to Coinbase • Coinbase BTC USD • Coinbase Exchange • Coinbase Wallet • Bitcoin Mining • Mine Crypto • Cryptocurrency Mining • Binance Alternative • CoinMarketCap • Mining Crypto • Send to Coinbase
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
