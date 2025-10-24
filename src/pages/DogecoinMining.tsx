// src/pages/DogecoinMining.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Target, Users, CheckCircle, Award, TrendingUp, Menu, X, Calculator, Heart } from 'lucide-react';

export const DogecoinMining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(5241);
  const [totalEarnings, setTotalEarnings] = useState(125780);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 6));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 120));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Dogecoin Mining and how does the dogecoin miner work?",
      answer: "Dogecoin mining is cryptocurrency mining for DOGE coin. Our dogecoin miner platform lets you mine crypto dogecoin without expensive hardware. Start mining crypto DOGE with our user-friendly crypto miner service and earn passive income from this popular meme cryptocurrency!"
    },
    {
      question: "How to start Dogecoin mining with your cryptocurrency miner?",
      answer: "Starting dogecoin mining is easy! Register on our dogecoin miner platform, get your free bonus, and start mining crypto DOGE immediately. Our miner crypto service handles all technical aspects. No expensive hardware needed to mine cryptos dogecoin with our cryptocurrency mining platform."
    },
    {
      question: "Is dogecoin miner profitable compared to nicehash and genesis?",
      answer: "Yes! Our dogecoin mining platform offers competitive rates better than nicehash and genesis mining. Use our whattomine-style calculator to check dogecoin miner profitability. Our crypto miner service provides transparent earnings for mining crypto dogecoin with daily payouts."
    },
    {
      question: "What makes your dogecoin mining better than bitcom or genesis mining?",
      answer: "Unlike bitcom, genesis, or nicehash, our dogecoin miner platform offers free mining crypto with no hidden fees. Our cryptocurrency mining service is transparent, secure, and perfect for beginners. Start miner crypto DOGE without expensive hardware and mine crypto with cutting-edge technology."
    },
    {
      question: "Can I use dogecoin miner with bitcoin mining simultaneously?",
      answer: "Absolutely! Our cryptocurrency miner platform supports both dogecoin mining and bitcoin mining. Mine cryptos including dogecoin and bitcoin at the same time. Our crypto miner service allows portfolio diversification for maximum passive income from digital assets."
    },
    {
      question: "How does your dogecoin mining compare to whattomine calculator?",
      answer: "Our dogecoin miner includes a built-in whattomine-style cryptocurrency mining calculator. Check your miner crypto DOGE profitability in real-time. Our crypto miner calculator is optimized for our mining crypto platform, showing exact dogecoin mining earnings better than whattomine."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900">
      <Helmet>
        <title>Dogecoin Free Cloud Mining 2025 | Earn 100 DOGE Daily</title>
        <meta name="description" content="Start mining Dogecoin for free — no hardware, no fees. Earn up to 100 DOGE daily, withdraw instantly to your wallet. Join 50,000+ active miners →" />
        <meta name="keywords" content="dogecoin mining, dogecoin miner, cryptocurrency miner, mine crypto, miner crypto, mine cryptos, mining crypto, crypto miner, miner, nicehash, genesis, genesis mining, bitcom, whattomine, cryptocurrency mining, bitcoin mining, free dogecoin mining, doge miner, doge mining" />
        <link rel="canonical" href="https://freecloudeminer.com/dogecoin" />
      </Helmet>
      
      {/* Header */}
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
              <Link to="/ethereum" className="text-gray-300 hover:text-white transition-colors">Ethereum</Link>
              <Link to="/dogecoin" className="text-yellow-400 font-semibold">Dogecoin Miner</Link>
              <Link to="/litecoin" className="text-gray-300 hover:text-white transition-colors">Litecoin</Link>
              <Link to="/solana" className="text-gray-300 hover:text-white transition-colors">Solana</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Start Mining DOGE
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
                <Link to="/ethereum" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>⟠ Ethereum</Link>
                <Link to="/dogecoin" className="text-yellow-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>🐕 Dogecoin Miner</Link>
                <Link to="/litecoin" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Ł Litecoin</Link>
                <Link to="/solana" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>◎ Solana</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-orange-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Award className="h-4 w-4 sm:h-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm text-gray-200">Best Dogecoin Miner</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Secure DOGE Mining</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Heart className="h-4 w-4 sm:h-5 sm:h-5 text-red-400" />
                <span className="text-xs sm:text-sm text-gray-200">5,000+ DOGE Miners</span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Dogecoin Mining - Free Dogecoin Miner Platform for Mining Crypto DOGE
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start dogecoin mining free with our dogecoin miner platform. Mine crypto dogecoin without expensive hardware or technical expertise. Best crypto miner alternative to nicehash, genesis mining, and whattomine. Our miner crypto DOGE service offers cutting-edge technology for mining crypto dogecoin. Join the meme coin revolution and mine cryptos DOGE with passive income potential!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>🐕</span>
                  <span>Start Dogecoin Miner Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center">
                  DOGE Calculator
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">5K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Dogecoin Miners Active</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€126K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">DOGE Mining Earnings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">24/7</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Crypto Miner Support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Start Mining DOGE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="py-4 sm:py-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-y border-yellow-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> mining DOGE now
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">€{totalEarnings.toLocaleString()}</strong> earned today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">1,542</strong> DOGE withdrawals
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Choose Our Dogecoin Miner for Cryptocurrency Mining</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best crypto miner platform for mining crypto dogecoin. Start miner crypto DOGE without expensive hardware. Better than nicehash, genesis mining, and whattomine. Our cryptocurrency miner service offers transparent dogecoin mining with passive income from meme coins!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Fast Dogecoin Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our cryptocurrency miner uses optimized technology for mining crypto dogecoin efficiently. Mine cryptos DOGE faster than nicehash or genesis mining with our high-performance miner crypto infrastructure for the best dogecoin mining experience.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Daily DOGE Payouts</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Earn passive income with our dogecoin miner platform. Daily cryptocurrency mining payouts of DOGE to your wallet. Start mining crypto and mine cryptos dogecoin with guaranteed returns from our reliable crypto miner service for dogecoin mining success.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Easy Crypto Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Start dogecoin miner in minutes! Our cryptocurrency miner platform is beginner-friendly. No technical expertise needed for mining crypto DOGE. Simpler than whattomine, bitcom, or genesis mining platforms for easy dogecoin mining.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Miner Crypto</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Bank-level security for your dogecoin miner earnings. Our cryptocurrency mining platform protects your mining crypto DOGE profits with SSL encryption and 2FA protection. More secure than nicehash or bitcom for safe dogecoin mining.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Transparent Mining Crypto</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Real-time dashboard for your dogecoin miner. Our crypto miner shows all mining crypto DOGE earnings transparently. Better than genesis mining with our cryptocurrency miner analytics and whattomine-style calculator for accurate dogecoin mining tracking.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-yellow-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">24/7 DOGE Support</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Expert support for your dogecoin miner journey. Our cryptocurrency mining team helps you mine crypto DOGE successfully. Professional miner crypto support better than nicehash or genesis customer service for all dogecoin mining needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Real Dogecoin Mining Reviews - Crypto Miner Success Stories</h2>
              <p className="text-gray-300 text-base sm:text-lg">Verified users mining crypto DOGE with our dogecoin miner platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">J</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Jessica Martinez</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best dogecoin miner! Much better than nicehash for mining crypto DOGE. This cryptocurrency miner lets me mine cryptos dogecoin without hardware. Earned €180 with this crypto miner in 3 weeks! To the moon! 🚀"</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">T</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Tom Anderson</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"This dogecoin mining platform is wow! Started miner crypto DOGE with zero investment. Better than genesis mining and whattomine. Perfect cryptocurrency mining for DOGE lovers! Much profit, very passive income!"</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">L</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Linda Thompson</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Excellent dogecoin miner service! Mine crypto DOGE easily with this cryptocurrency miner. Better than nicehash and bitcom. Great for mining crypto dogecoin and earning passive income! Such amaze!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-yellow-600/20 to-orange-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Dogecoin Mining Today - Mine Crypto DOGE Without Hardware</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our cryptocurrency mining platform! Best crypto miner for mining crypto dogecoin. Better than nicehash, genesis mining, and whattomine. Start miner crypto DOGE now and mine cryptos for passive income from the people's cryptocurrency!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <span>🐕</span>
              <span>Start Mining Dogecoin Now</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Dogecoin Miner FAQ - Cryptocurrency Mining DOGE</h2>
              <p className="text-base sm:text-xl text-gray-300">Common questions about dogecoin miner, dogecoin mining, crypto miner, and our cryptocurrency mining platform</p>
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

      {/* Footer */}
      <footer className="bg-black/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best dogecoin miner platform for cryptocurrency mining. Mine crypto dogecoin without expensive hardware. Start miner crypto DOGE with our crypto miner service. Better than nicehash, genesis mining, whattomine, and bitcom. Join our cryptocurrency miner community and mine cryptos DOGE for passive income! Much wow!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Dogecoin Mining • Dogecoin Miner • Cryptocurrency Miner • Mine Crypto • Miner Crypto • Mining Crypto • Crypto Miner • NiceHash Alternative • Genesis Mining Alternative • Whattomine Calculator • Bitcom Alternative • Mine Cryptos • Cryptocurrency Mining • Bitcoin Mining
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
