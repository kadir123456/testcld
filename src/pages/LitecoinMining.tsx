// ======================================
// LitecoinMining.tsx
// ======================================
// src/pages/LitecoinMining.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Target, Users, CheckCircle, Award, TrendingUp, Menu, X, Calculator, Coins } from 'lucide-react';

export const LitecoinMining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(3156);
  const [totalEarnings, setTotalEarnings] = useState(78920);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 4));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 80));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Litecoin Mining and how does the litecoin miner work?",
      answer: "Litecoin mining is cryptocurrency mining for LTC coin. Our litecoin miner platform lets you mine crypto litecoin without expensive hardware. Start mining crypto LTC with our user-friendly crypto miner service and earn passive income from digital assets!"
    },
    {
      question: "How to start Litecoin mining with your cryptocurrency miner?",
      answer: "Starting litecoin mining is simple! Register on our litecoin miner platform, get your free bonus, and start mining crypto LTC immediately. Our miner crypto service handles all technical aspects. No expensive hardware needed to mine cryptos litecoin."
    },
    {
      question: "Is litecoin miner profitable compared to nicehash and genesis?",
      answer: "Yes! Our litecoin mining platform offers competitive rates better than nicehash and genesis mining. Use our whattomine-style calculator to check litecoin miner profitability. Our crypto miner service provides transparent earnings for mining crypto LTC."
    },
    {
      question: "What makes your litecoin mining better than bitcom or genesis mining?",
      answer: "Unlike bitcom, genesis, or nicehash, our litecoin miner platform offers free mining crypto with no hidden fees. Our cryptocurrency mining service is transparent, secure, and beginner-friendly. Start miner crypto LTC without expensive hardware."
    },
    {
      question: "Can I use litecoin miner with bitcoin mining simultaneously?",
      answer: "Absolutely! Our cryptocurrency miner platform supports both litecoin mining and bitcoin mining. Mine cryptos including litecoin and bitcoin simultaneously. Our crypto miner service allows portfolio diversification."
    },
    {
      question: "How does your litecoin mining compare to whattomine calculator?",
      answer: "Our litecoin miner includes a built-in whattomine-style cryptocurrency mining calculator. Check your miner crypto LTC profitability in real-time. More accurate than whattomine for our mining crypto platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Helmet>
        <title>Litecoin Cloud Mining | 0.05 LTC Daily Payouts</title>
        <meta name="description" content="Mine Litecoin securely in the cloud. Get 0.05 LTC every day, no setup required. Instant withdrawals and lifetime free mining →" />
        <meta name="keywords" content="litecoin mining, litecoin miner, cryptocurrency miner, mine crypto, miner crypto, mine cryptos, mining crypto, crypto miner, miner, nicehash, genesis, genesis mining, bitcom, whattomine, cryptocurrency mining, bitcoin mining, free litecoin mining, ltc miner" />
        <link rel="canonical" href="https://freecloudeminer.com/litecoin" />
      </Helmet>
      
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
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
              <Link to="/dogecoin" className="text-gray-300 hover:text-white transition-colors">Dogecoin</Link>
              <Link to="/litecoin" className="text-gray-400 font-semibold">Litecoin Miner</Link>
              <Link to="/solana" className="text-gray-300 hover:text-white transition-colors">Solana</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Start Mining LTC
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
                <Link to="/dogecoin" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🐕 Dogecoin</Link>
                <Link to="/litecoin" className="text-gray-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>Ł Litecoin Miner</Link>
                <Link to="/solana" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>◎ Solana</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-800/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Award className="h-4 w-4 sm:h-5 sm:h-5 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-200">Best Litecoin Miner</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Secure LTC Mining</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Coins className="h-4 w-4 sm:h-5 sm:h-5 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-200">3,000+ LTC Miners</span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Litecoin Mining - Free Litecoin Miner Platform for Mining Crypto LTC
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start litecoin mining free with our litecoin miner platform. Mine crypto litecoin without expensive hardware or technical expertise. Best crypto miner alternative to nicehash, genesis mining, and whattomine. Our miner crypto LTC service offers cutting-edge technology for mining crypto litecoin. Join our cryptocurrency mining community and mine cryptos LTC with passive income potential!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>Ł</span>
                  <span>Start Litecoin Miner Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center">
                  LTC Calculator
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-1 sm:mb-2">3K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Litecoin Miners Active</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€79K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">LTC Mining Earnings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-1 sm:mb-2">24/7</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Crypto Miner Support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Start Mining LTC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-6 bg-gradient-to-r from-gray-900/30 to-gray-800/30 border-y border-gray-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-gray-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> mining LTC now
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
                  <strong className="text-white font-bold">694</strong> LTC withdrawals
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Choose Our Litecoin Miner for Cryptocurrency Mining</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best crypto miner platform for mining crypto litecoin. Start miner crypto LTC without expensive hardware. Better than nicehash, genesis mining, and whattomine for litecoin mining!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Fast Litecoin Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our cryptocurrency miner uses optimized scrypt algorithm for mining crypto litecoin efficiently. Mine cryptos LTC faster than nicehash or genesis mining with our miner crypto infrastructure.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Daily LTC Payouts</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Earn passive income with our litecoin miner platform. Daily cryptocurrency mining payouts. Start mining crypto and mine cryptos litecoin with guaranteed returns from our crypto miner service.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Easy Crypto Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Start litecoin miner in minutes! Our cryptocurrency miner platform is user-friendly. No technical expertise needed for mining crypto LTC. Easier than whattomine, bitcom, or genesis.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Miner Crypto</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Bank-level security for your litecoin miner earnings. Our cryptocurrency mining platform protects your mining crypto LTC profits with SSL and 2FA. Safer than nicehash or bitcom.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Transparent Mining</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Real-time dashboard for your litecoin miner. Our crypto miner shows all mining crypto LTC earnings. Better than genesis with whattomine-style calculator.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-gray-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">24/7 Support</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Expert support for your litecoin miner journey. Our cryptocurrency mining team helps you mine crypto LTC. Better support than nicehash or genesis.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-600/20 to-gray-800/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Litecoin Mining Today - Mine Crypto LTC Without Hardware</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our cryptocurrency mining platform! Best crypto miner for mining crypto litecoin. Better than nicehash, genesis mining, and whattomine. Start miner crypto LTC now!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <span>Ł</span>
              <span>Start Mining Litecoin Now</span>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Litecoin Miner FAQ</h2>
              <p className="text-base sm:text-xl text-gray-300">Common questions about litecoin miner, litecoin mining, crypto miner, and cryptocurrency mining</p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-white text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-2xl text-gray-400 font-bold">{openFaq === index ? '−' : '+'}</span>
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
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best litecoin miner platform for cryptocurrency mining. Mine crypto litecoin without expensive hardware. Better than nicehash, genesis mining, whattomine, and bitcom. Join our cryptocurrency miner community!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Litecoin Mining • Litecoin Miner • Cryptocurrency Miner • Mine Crypto • Miner Crypto • Mining Crypto • Crypto Miner • NiceHash Alternative • Genesis Mining Alternative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
