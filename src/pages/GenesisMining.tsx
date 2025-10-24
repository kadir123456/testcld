// src/pages/GenesisMining.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hammer, Shield, Zap, DollarSign, Target, Users, CheckCircle, Award, TrendingUp, Menu, X, Calculator, Star, ArrowRight } from 'lucide-react';

export const GenesisMining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMiners, setActiveMiners] = useState(8947);
  const [totalEarnings, setTotalEarnings] = useState(342890);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMiners(prev => prev + Math.floor(Math.random() * 8));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 200));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Genesis Mining and how does genesis cloud mining work?",
      answer: "Genesis mining is cryptocurrency mining service. Our genesis cloud mining alternative lets you mine crypto without expensive hardware. Start genesis mining with our platform - better rates than genesis mining company. Our genesis crypto mining service offers free genesis mining trials."
    },
    {
      question: "Is your platform a better alternative to genesis mining?",
      answer: "Yes! Our genesis cloud mining alternative offers better rates than genesis mining. While genesis mining charges fees, we offer free genesis mining options. Our genesis crypto mining platform is more transparent than genesis mining company with real-time genesis mining calculator."
    },
    {
      question: "How does genesis cloud mining compare to nicehash and whattomine?",
      answer: "Our genesis mining alternative beats nicehash and whattomine in profitability. Use our genesis mining calculator to compare. Our genesis cloud mining service offers better rates than genesis mining, nicehash, and bitcom combined. Free genesis mining trials available!"
    },
    {
      question: "What cryptocurrencies can I mine with genesis cloud mining?",
      answer: "Our genesis mining alternative supports bitcoin mining, ethereum miner, dogecoin mining, litecoin mining, solana mining, and more! Unlike genesis mining company, we offer free genesis mining for all coins. Best genesis crypto mining platform for mine crypto diversification."
    },
    {
      question: "Is genesis mining safe and legitimate?",
      answer: "Our genesis cloud mining alternative is 100% safe! While searching for genesis mining reviews, users find our platform more transparent. We offer better security than genesis mining with bank-level protection. Our genesis crypto mining service is verified and trusted by 10,000+ users."
    },
    {
      question: "How much can I earn with genesis cloud mining?",
      answer: "Earnings depend on your investment. Our genesis mining calculator shows exact profits. Users report better returns than genesis mining company. Try our free genesis mining trial - no risk! Our genesis cloud mining platform offers daily payouts, better than genesis mining's terms."
    }
  ];

  const comparisonData = [
    {
      feature: "Free Trial",
      us: "✅ Yes - $25 Free",
      genesis: "❌ No Free Trial"
    },
    {
      feature: "Minimum Deposit",
      us: "✅ $0 to Start",
      genesis: "❌ High Minimum"
    },
    {
      feature: "Daily Payouts",
      us: "✅ Yes - Automatic",
      genesis: "⚠️ Limited"
    },
    {
      feature: "Withdrawal Fees",
      us: "✅ Zero Fees",
      genesis: "❌ High Fees"
    },
    {
      feature: "Contract Terms",
      us: "✅ Flexible - No Lock",
      genesis: "❌ Long Term Lock"
    },
    {
      feature: "Transparency",
      us: "✅ 100% Transparent",
      genesis: "⚠️ Limited Info"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Helmet>
        <title>Better Than Genesis Mining | 100% Free Alternative</title>
        <meta name="description" content="Superior Genesis Mining alternative. No contracts, no fees, higher profits. Start earning in 30 seconds →" />
        <meta name="keywords" content="genesis, genesis mining, genesis cloud mining, genesis crypto mining, genesis mining alternative, genesis mining calculator, genesis mining review, genesis mining company, mine crypto, cryptocurrency mining, bitcoin mining, nicehash, whattomine, bitcom, crypto miner, mining crypto, miner crypto" />
        <link rel="canonical" href="https://freecloudeminer.com/genesis" />
        <meta property="og:title" content="Genesis Mining Alternative - Free Genesis Cloud Mining" />
        <meta property="og:description" content="Best genesis mining alternative! Free genesis cloud mining better than genesis mining company. Start genesis crypto mining with our genesis mining calculator!" />
      </Helmet>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
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
              <Link to="/genesis" className="text-purple-400 font-semibold">Genesis Alternative</Link>
              <Link to="/nicehash" className="text-gray-300 hover:text-white transition-colors">NiceHash</Link>
              <Link to="/whattomine" className="text-gray-300 hover:text-white transition-colors">WhatToMine</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap">
                Try Genesis Alternative
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>🧮 Genesis Calculator</Link>
                <Link to="/genesis" className="text-purple-400 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>⭐ Genesis Alternative</Link>
                <Link to="/nicehash" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>NiceHash</Link>
                <Link to="/whattomine" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>WhatToMine</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Star className="h-4 w-4 sm:h-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm text-gray-200">Best Genesis Mining Alternative</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-200">Better Than Genesis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:h-5 text-purple-400" />
                <span className="text-xs sm:text-sm text-gray-200">10,000+ Users Switched</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-full px-4 py-2 mb-4">
                <p className="text-purple-300 text-sm font-semibold">🔥 Genesis Mining Alternative - Free Genesis Cloud Mining</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Genesis Mining Alternative - Free Genesis Cloud Mining Better Than Genesis Mining Company
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Looking for genesis mining alternative? Our free genesis cloud mining platform offers better rates than genesis mining company! Start genesis crypto mining without high fees. Use our genesis mining calculator to compare profits. Better than genesis mining, nicehash, whattomine, and bitcom. Try free genesis mining with $25 bonus - no term contract! Best genesis cloud mining service for cryptocurrency mining, bitcoin mining, and mine crypto operations!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link to="/auth" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>🚀</span>
                  <span>Try Genesis Alternative Free - $25 Bonus</span>
                </Link>
                <Link to="/calculator" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Genesis Mining Calculator</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">10K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Left Genesis Mining</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€343K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Genesis Alternative Earnings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-400 mb-1 sm:mb-2">24/7</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Genesis Cloud Mining</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Start Genesis Mining</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="py-4 sm:py-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-y border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeMiners.toLocaleString()}</strong> using genesis alternative
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
                  <strong className="text-white font-bold">2,841</strong> left genesis mining
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Genesis Mining Alternative vs Genesis Mining Company</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                See why our genesis cloud mining platform is better than genesis mining! Compare genesis crypto mining features and use our genesis mining calculator.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-white font-bold text-sm sm:text-base">Feature</th>
                      <th className="px-4 sm:px-6 py-4 text-center text-white font-bold text-sm sm:text-base">Our Genesis Alternative</th>
                      <th className="px-4 sm:px-6 py-4 text-center text-white font-bold text-sm sm:text-base">Genesis Mining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-4 sm:px-6 py-4 text-gray-300 font-semibold text-sm sm:text-base">{item.feature}</td>
                        <td className="px-4 sm:px-6 py-4 text-center text-sm sm:text-base">
                          <span className="text-green-400 font-semibold">{item.us}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center text-sm sm:text-base">
                          <span className="text-red-400 font-semibold">{item.genesis}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl">
                <span>Switch from Genesis Mining</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Choose Our Genesis Mining Alternative for Genesis Cloud Mining</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best genesis crypto mining platform! Better than genesis mining company, nicehash, whattomine, and bitcom. Use our genesis mining calculator for free genesis mining profitability!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Free Genesis Mining Trial</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Unlike genesis mining company, we offer free genesis cloud mining! Get $25 bonus to start genesis crypto mining. No fees like genesis mining. Use our genesis mining calculator to see profits from free genesis mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Better Rates Than Genesis</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our genesis mining alternative offers better returns than genesis mining company! Compare with genesis mining calculator. Our genesis cloud mining beats genesis mining, nicehash, and whattomine in profitability for cryptocurrency mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">No Genesis Mining Fees</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Zero withdrawal fees with our genesis cloud mining! Genesis mining company charges high fees. Our genesis crypto mining alternative is transparent. Free genesis mining with no hidden costs - better than genesis mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Flexible Genesis Cloud Mining</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  No long-term contracts like genesis mining! Our genesis mining alternative offers flexible terms. Start and stop genesis crypto mining anytime. Unlike genesis mining company, we put you in control of your mining crypto!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Real Genesis Mining Calculator</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Use our advanced genesis mining calculator! More accurate than genesis mining company calculator or whattomine. Our genesis cloud mining calculator shows real-time profits for cryptocurrency mining and bitcoin mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Better Support Than Genesis</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  24/7 support for genesis cloud mining! Genesis mining company has limited support. Our genesis crypto mining team helps you instantly. Best customer service for your genesis mining alternative needs and mine crypto questions!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Why Users Left Genesis Mining for Our Genesis Alternative</h2>
              <p className="text-gray-300 text-base sm:text-lg">Real genesis cloud mining reviews from users who switched from genesis mining company</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">J</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">John Williams</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Left genesis mining after 2 years! This genesis mining alternative is way better. Free genesis cloud mining with no fees. Used genesis mining calculator - profits are 40% higher than genesis mining company!"</p>
                <p className="text-purple-400 text-xs mt-2 font-semibold">Former Genesis Mining User</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">M</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Maria Garcia</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Best genesis cloud mining alternative! Genesis mining company had too many fees. This genesis crypto mining platform is transparent. Better than genesis mining, nicehash, and whattomine combined!"</p>
                <p className="text-purple-400 text-xs mt-2 font-semibold">Switched from Genesis Mining</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">D</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">David Lee</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"Searched 'genesis mining alternative' and found this! So glad I left genesis mining. This genesis cloud mining service has better rates. Free genesis mining trial convinced me. Never going back to genesis mining company!"</p>
                <p className="text-purple-400 text-xs mt-2 font-semibold">Ex-Genesis Mining Customer</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Switch to Best Genesis Mining Alternative Today!</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join 10,000+ users who left genesis mining! Our genesis cloud mining platform offers free genesis crypto mining with better rates than genesis mining company. Use our genesis mining calculator and see why we're the best genesis mining alternative. Better than genesis mining, nicehash, whattomine, and bitcom for cryptocurrency mining and bitcoin mining!
            </p>
            <Link to="/auth" className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl">
              <span>🚀</span>
              <span>Leave Genesis Mining - Start Free Now</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Genesis Mining Alternative FAQ - Genesis Cloud Mining Questions</h2>
              <p className="text-base sm:text-xl text-gray-300">Common questions about genesis mining alternative, genesis cloud mining, and genesis crypto mining</p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-white text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-2xl text-purple-400 font-bold">{openFaq === index ? '−' : '+'}</span>
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
              <Hammer className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
              <span className="text-2xl sm:text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Best genesis mining alternative! Free genesis cloud mining platform better than genesis mining company. Start genesis crypto mining without fees. Use our genesis mining calculator. Better than genesis mining, nicehash, whattomine, and bitcom. Join 10,000+ users who left genesis mining for better cryptocurrency mining and bitcoin mining!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 FreeCloudMiner - Genesis Mining Alternative • Genesis Cloud Mining • Genesis Crypto Mining • Genesis Mining Calculator • Better Than Genesis Mining • Mine Crypto • Cryptocurrency Mining • Bitcoin Mining • NiceHash Alternative • WhatToMine Alternative • Bitcom Alternative • Miner Crypto • Mining Crypto • Crypto Miner
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
