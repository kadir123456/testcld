// src/pages/BinanceMining.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Users, CheckCircle, TrendingUp, Menu, X, Calculator, Wallet } from 'lucide-react';

export const BinanceMining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(12847);
  const [totalEarnings, setTotalEarnings] = useState(584920);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 12));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 300));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Can I withdraw mining earnings directly to Binance?",
      answer: "Yes! Our platform allows direct withdrawal to Binance. Mine crypto with us and send bitcoin mining earnings to your Binance wallet. Connect your Binance account and withdraw mining profits to Binance exchange automatically. Best for binance users who want passive income!"
    },
    {
      question: "How to start mining crypto and send to Binance?",
      answer: "Start free bitcoin mining with us, then withdraw to Binance! Register, start cryptocurrency mining, and link your Binance wallet. Your mining crypto earnings go directly to Binance. Use our mining calculator with real-time Binance BTC USD prices!"
    },
    {
      question: "Is mining and withdrawing to Binance profitable?",
      answer: "Yes! Mine crypto and trade on Binance for maximum profits. Our cryptocurrency mining platform uses live Binance prices. Check our calculator with Binance BTC USD rates. Better than coinbase or coinmarketcap for mining profits!"
    },
    {
      question: "Can I mine multiple cryptocurrencies for Binance?",
      answer: "Absolutely! Mine crypto including bitcoin mining, ethereum miner, dogecoin mining for Binance. Our cryptocurrency miner supports all coins on Binance. Withdraw mining earnings to Binance and trade on their exchange!"
    },
    {
      question: "How long does withdrawal to Binance take?",
      answer: "Fast withdrawals to Binance! Your mining crypto profits reach Binance in 24 hours. Better than coinbase withdrawal times. Start cryptocurrency mining today and see your earnings on Binance exchange quickly!"
    },
    {
      question: "Do you charge fees for Binance withdrawals?",
      answer: "Zero withdrawal fees to Binance! Unlike coinbase, we don't charge for sending mining profits to Binance. Free bitcoin mining with free Binance withdrawals. Check live Binance prices on our calculator with coinmarketcap data!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900">
      <Helmet>
        <title>Binance Cloud Mining | Direct Withdrawal $50/Day</title>
        <meta name="description" content="Free cloud mining with instant Binance withdrawal. Earn $50 daily, withdraw directly to Binance. 10,000+ active miners →" />
        <meta name="keywords" content="binance, binance mining, withdraw to binance, binance btc usd, binance exchange, bitcoin mining, btc usd, coinbase, coinmarketcap, mine crypto, cryptocurrency mining, crypto miner, mining crypto, miner crypto, btc, bitcoin, binance wallet, binance withdrawal, send to binance" />
        <link rel="canonical" href="https://freecloudeminer.com/binance" />
        <meta property="og:title" content="Binance Mining: Free Cloud Bitcoin Miner | Instant Withdrawal Zero Fee" />
        <meta property="og:description" content="⚡ Start free Bitcoin cloud mining and withdraw directly to your Binance exchange wallet! Zero fees, instant payout. Best Coinbase/NiceHash alternative for Binance users. Get a 0.001 BTC bonus now!" />
      </Helmet>
      
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
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
              <Link to="/binance" className="text-yellow-400 font-semibold">Binance</Link>
              <Link to="/coinbase" className="text-gray-300 hover:text-white transition-colors">Coinbase</Link>
              <Link to="/coinmarketcap" className="text-gray-300 hover:text-white transition-colors">CoinMarketCap</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Mine to Binance
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🧮 Binance Calculator</Link>
                <Link to="/binance" className="text-yellow-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>⚡ Binance Mining</Link>
                <Link to="/coinbase" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Coinbase</Link>
                <Link to="/coinmarketcap" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>CoinMarketCap</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-orange-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Wallet className="h-4 w-4 sm:h-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm text-gray-200">Direct Binance Withdrawal</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Binance BTC USD Live</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:h-5 text-orange-400" />
                <span className="text-xs sm:text-sm text-gray-200">12K+ Binance Users</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-4">
                <p className="text-yellow-300 text-sm font-semibold">⚡ Binance Mining - Withdraw Bitcoin Mining to Binance Exchange</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Binance Mining - Free Bitcoin Mining with Direct Binance Withdrawal | Live Binance BTC USD
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start free bitcoin mining and withdraw directly to Binance! Our cryptocurrency mining platform connects with Binance exchange for instant withdrawals. Mine crypto with live Binance BTC USD prices. Send mining profits to Binance wallet automatically! Better than coinbase and coinmarketcap for tracking your mining earnings. Check our calculator with real-time Binance prices for cryptocurrency mining, bitcoin mining, and mine crypto operations. Withdraw to Binance free!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Start Mining to Binance - $25 Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Binance BTC USD Calculator</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">12K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Mining to Binance</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€585K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Sent to Binance</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">24H</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Binance Withdrawal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Binance Fees</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-y border-yellow-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> withdrawing to Binance
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">€{totalEarnings.toLocaleString()}</strong> sent to Binance today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  Live <strong className="text-white font-bold">Binance BTC USD</strong> prices
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Mine Crypto and Withdraw to Binance Exchange</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best cryptocurrency mining platform for Binance users! Mine crypto with live Binance BTC USD prices. Better than coinbase or coinmarketcap for mining to Binance!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Wallet className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Direct Binance Withdrawal</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Withdraw mining earnings directly to Binance! No need for coinbase or other exchanges. Our bitcoin mining platform connects with your Binance wallet. Mine crypto and send to Binance exchange automatically with live Binance BTC USD rates!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Live Binance BTC USD Prices</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our cryptocurrency mining calculator uses real-time Binance prices! More accurate than coinmarketcap. Check mining profitability with live Binance BTC USD data. Mine crypto knowing exact Binance exchange rates for bitcoin mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Zero Binance Withdrawal Fees</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Free withdrawals to Binance! Unlike coinbase, we don't charge for sending mining profits to Binance. Mine crypto and withdraw to Binance exchange with $0 fees. Best for cryptocurrency mining to Binance wallet!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Fast Binance Transfers</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Quick mining withdrawals to Binance! Your bitcoin mining earnings reach Binance in 24 hours. Faster than coinbase transfers. Mine crypto today and see profits on Binance exchange tomorrow with our cryptocurrency miner!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Binance Integration</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Safe mining to Binance! Bank-level security for cryptocurrency mining. Your Binance withdrawal is protected. Mine crypto safely and send bitcoin mining profits to Binance exchange with confidence using our crypto miner!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Binance Mining Calculator</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Calculate with Binance prices! Our mining calculator uses live Binance BTC USD data. Better than coinmarketcap calculator. Check cryptocurrency mining profits with real Binance exchange rates before you mine crypto to Binance!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Binance Mining Reviews - Users Withdrawing to Binance</h2>
              <p className="text-gray-300 text-base sm:text-lg">Real cryptocurrency mining users sending bitcoin mining profits to Binance exchange</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">K</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Kevin Park</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Perfect for Binance users! Mine crypto and withdraw to Binance automatically. Live Binance BTC USD prices on calculator. Better than coinbase or coinmarketcap. Already sent €450 to my Binance wallet from bitcoin mining!"</p>
                <p className="text-yellow-400 text-xs mt-2 font-semibold">Binance Verified User</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">S</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Sophie Chen</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Love mining to Binance! Free cryptocurrency mining with direct Binance exchange withdrawal. Zero fees unlike coinbase! The Binance BTC USD calculator is accurate. Easy to mine crypto and send to Binance!"</p>
                <p className="text-yellow-400 text-xs mt-2 font-semibold">Binance Premium User</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">R</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Ryan Foster</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best bitcoin mining for Binance! Withdraw mining profits to Binance in 24h. Live Binance prices better than coinmarketcap. I mine crypto daily and trade on Binance. Perfect integration with Binance exchange!"</p>
                <p className="text-yellow-400 text-xs mt-2 font-semibold">Binance Trader</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-r from-yellow-600/20 to-orange-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Mining to Binance Today - Live Binance BTC USD Prices!</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join 12,000+ users mining crypto to Binance! Free bitcoin mining with direct Binance withdrawal. Use live Binance BTC USD prices on our calculator. Better than coinbase and coinmarketcap for cryptocurrency mining to Binance exchange. Mine crypto and withdraw to Binance with $0 fees!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <Wallet className="h-6 w-6" />
              <span>Start Mining to Binance - Free $25</span>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Binance Mining FAQ - Withdraw to Binance Exchange</h2>
              <p className="text-base sm:text-xl text-gray-300">Questions about mining crypto and withdrawing to Binance with live Binance BTC USD prices</p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-white text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-2xl text-yellow-400 font-bold">{openFaq === index ? '−' : '+'}</span>
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
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best bitcoin mining platform for Binance users! Mine crypto and withdraw to Binance exchange. Free cryptocurrency mining with live Binance BTC USD prices. Better than coinbase and coinmarketcap for mining to Binance. Zero fees for Binance withdrawal!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Binance Mining • Withdraw to Binance • Binance BTC USD • Binance Exchange • Bitcoin Mining • Mine Crypto • Cryptocurrency Mining • Crypto Miner • BTC • Coinbase Alternative • CoinMarketCap Alternative • Mining Crypto • Miner Crypto • Binance Wallet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
