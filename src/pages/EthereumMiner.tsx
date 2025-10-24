// src/pages/EthereumMiner.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Target, Users, CheckCircle, Award, TrendingUp, Menu, X, Calculator, Activity } from 'lucide-react';

export const EthereumMiner: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(3842);
  const [totalEarnings, setTotalEarnings] = useState(89456);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 5));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 100));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Ethereum Miner and how does cryptocurrency mining work?",
      answer: "Ethereum miner is a cryptocurrency miner that validates transactions on the Ethereum network. Our ethereum miner platform allows you to mine crypto ethereum without expensive hardware. Start mining crypto with our user-friendly crypto miner service and earn passive income from digital assets."
    },
    {
      question: "How to start Ethereum mining with your crypto miner?",
      answer: "Starting ethereum miner is easy! Register on our cryptocurrency mining platform, get your free bonus, and start mining crypto ethereum immediately. Our miner crypto service handles all technical aspects. No need for expensive hardware or technical expertise to mine cryptos ethereum."
    },
    {
      question: "Is Ethereum miner profitable compared to nicehash and genesis mining?",
      answer: "Yes! Our ethereum miner platform offers better rates than nicehash and genesis mining. Use our whattomine-style calculator to check cryptocurrency miner profitability. Our crypto miner service provides real-time earnings for mining crypto ethereum with transparent payouts."
    },
    {
      question: "What makes your cryptocurrency miner better than bitcom or genesis?",
      answer: "Unlike bitcom, genesis, or nicehash, our ethereum miner platform offers free mining crypto with no hidden fees. Our cryptocurrency mining service is transparent, secure, and beginner-friendly. Start miner crypto ethereum without expensive hardware and mine crypto with cutting-edge technology."
    },
    {
      question: "Can I use ethereum miner alongside bitcoin mining?",
      answer: "Absolutely! Our cryptocurrency miner platform supports both ethereum miner and bitcoin mining. Mine cryptos including ethereum and bitcoin simultaneously. Our crypto miner service allows you to diversify your mining crypto portfolio for maximum passive income from digital assets."
    },
    {
      question: "How does your ethereum miner compare to whattomine calculator?",
      answer: "Our ethereum miner includes a built-in whattomine-style cryptocurrency mining calculator. Check your miner crypto profitability in real-time. Our crypto miner calculator is more accurate than whattomine for our mining crypto platform, showing exact ethereum miner earnings."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Helmet>
        <title>Ethereum Free Mining 2025 | 0.01 ETH Daily</title>
        <meta name="description" content="Start free Ethereum cloud mining. Earn 0.01 ETH daily guaranteed. No equipment, no electricity costs. 5-minute setup →" />
        <meta name="keywords" content="ethereum miner, cryptocurrency miner, mine crypto, miner crypto, mine cryptos, mining crypto, crypto miner, miner, nicehash, genesis, genesis mining, bitcom, whattomine, cryptocurrency mining, bitcoin mining, free ethereum mining, eth miner, ethereum mining calculator" />
        <link rel="canonical" href="https://freecloudeminer.com/ethereum" />
      </Helmet>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">FreeCloudMiner</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/market" className="text-gray-300 hover:text-white transition-colors">Market</Link>
              <Link to="/news" className="text-gray-300 hover:text-white transition-colors">News</Link>
              <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Calculator className="h-4 w-4" />
                <span>Calculator</span>
              </Link>
              <Link to="/ethereum" className="text-blue-400 font-semibold">Ethereum Miner</Link>
              <Link to="/dogecoin" className="text-gray-300 hover:text-white transition-colors">Dogecoin</Link>
              <Link to="/litecoin" className="text-gray-300 hover:text-white transition-colors">Litecoin</Link>
              <Link to="/solana" className="text-gray-300 hover:text-white transition-colors">Solana</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Start Mining ETH
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/market" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>💹 Market</Link>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🧮 Calculator</Link>
                <Link to="/ethereum" className="text-blue-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>⟠ Ethereum Miner</Link>
                <Link to="/dogecoin" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🐕 Dogecoin</Link>
                <Link to="/litecoin" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Ł Litecoin</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Award className="h-4 w-4 sm:h-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm text-gray-200">Best Ethereum Miner</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Secure Crypto Miner</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-200">4,000+ ETH Miners</span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Ethereum Miner - Free Cryptocurrency Mining Platform for Mining Crypto ETH
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start ethereum miner free with our cryptocurrency miner platform. Mine crypto ethereum without expensive hardware or technical expertise. Best crypto miner alternative to nicehash, genesis mining, and whattomine. Our miner crypto service offers cutting-edge technology for mining crypto ETH. Join our cryptocurrency mining community and mine cryptos ethereum with passive income potential!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>⟠</span>
                  <span>Start Ethereum Miner Free</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center">
                  Whattomine Calculator
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">4K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Ethereum Miners Active</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€90K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">ETH Mining Earnings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">24/7</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Crypto Miner Support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Start Mining Crypto</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="py-4 sm:py-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> mining ETH now
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
                  <strong className="text-white font-bold">847</strong> ETH withdrawals
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Choose Our Ethereum Miner for Cryptocurrency Mining</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best crypto miner platform for mining crypto ethereum. Start miner crypto ETH without expensive hardware. Better than nicehash, genesis mining, and whattomine. Our cryptocurrency miner service offers transparent mining crypto with passive income from digital assets!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Fast Ethereum Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our cryptocurrency miner uses cutting-edge technology for mining crypto ethereum efficiently. Mine cryptos ETH faster than nicehash or genesis mining with our optimized miner crypto infrastructure.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Daily ETH Payouts</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Earn passive income with our ethereum miner platform. Daily cryptocurrency mining payouts directly to your wallet. Start mining crypto and mine cryptos ethereum with guaranteed returns from our crypto miner service.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Easy Crypto Miner</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Start ethereum miner in minutes! Our cryptocurrency miner platform is user-friendly. No technical expertise needed for mining crypto ETH. Easier than whattomine, bitcom, or genesis mining platforms.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Miner Crypto</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Bank-level security for your ethereum miner earnings. Our cryptocurrency mining platform protects your mining crypto profits with SSL encryption and 2FA. Safer than nicehash or bitcom.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Transparent Mining Crypto</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Real-time dashboard for your ethereum miner. Our crypto miner shows all mining crypto earnings transparently. Better than genesis mining with our cryptocurrency miner analytics and whattomine-style calculator.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">24/7 Crypto Miner Support</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Expert support for your ethereum miner journey. Our cryptocurrency mining team helps you mine crypto ETH successfully. Professional miner crypto support better than nicehash or genesis customer service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Real Ethereum Miner Reviews - Cryptocurrency Mining Success</h2>
              <p className="text-gray-300 text-base sm:text-lg">Verified users mining crypto ethereum with our crypto miner platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">M</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Michael Zhang</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best ethereum miner I've used! Better than nicehash. This cryptocurrency miner lets me mine crypto ETH without expensive hardware. Earned €240 mining crypto in first month!"</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">S</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Sarah Johnson</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"This crypto miner platform is amazing! Started miner crypto ETH with $0. Better than genesis mining and whattomine. Perfect cryptocurrency mining for beginners!"</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">R</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Robert Miller</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Excellent ethereum miner service! Mine cryptos ethereum easily. This cryptocurrency miner beats nicehash and bitcom. Great for mining crypto with passive income!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Start Ethereum Miner Today - Mine Crypto ETH Without Hardware</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our cryptocurrency mining platform! Best crypto miner for mining crypto ethereum. Better than nicehash, genesis mining, and whattomine. Start miner crypto ETH now and mine cryptos for passive income from digital assets!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <span>⟠</span>
              <span>Start Mining Ethereum Now</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Ethereum Miner FAQ - Cryptocurrency Mining Questions</h2>
              <p className="text-base sm:text-xl text-gray-300">Common questions about ethereum miner, crypto miner, mining crypto, and our cryptocurrency mining platform</p>
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

      {/* Footer */}
      <footer className="bg-black/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best ethereum miner platform for cryptocurrency mining. Mine crypto ethereum without expensive hardware. Start miner crypto ETH with our crypto miner service. Better than nicehash, genesis mining, whattomine, and bitcom. Join our cryptocurrency miner community and mine cryptos for passive income!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Ethereum Miner • Cryptocurrency Miner • Mine Crypto • Miner Crypto • Mining Crypto • Crypto Miner • NiceHash Alternative • Genesis Mining Alternative • Whattomine Calculator • Bitcom Alternative • Mine Cryptos • Cryptocurrency Mining • Bitcoin Mining
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
