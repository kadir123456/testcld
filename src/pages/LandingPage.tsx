// src/pages/LandingPage.tsx - UPDATED WITH CALCULATOR & SEO
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Hammer, Shield, Zap, DollarSign, Target, Lock, Users, CheckCircle, Server, Award, Clock, TrendingUp, Eye, Menu, X, Mail, MapPin, Phone, Calculator } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState(2507);
  const [totalEarnings, setTotalEarnings] = useState(247589);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3));
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 50));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.landing-header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is bitcoin mining and how does it work with proof of work (PoW)?",
      answer: "Bitcoin mining is the process of validating bitcoin transactions using the proof of work (PoW) consensus mechanism. Our free bitcoin cloud mining platform allows you to mine bitcoin without expensive hardware like Bitmain Antminer or ASIC miners. We handle all the complex cryptographic processes so you can earn passive income from cryptocurrency mining. Simply use our bitcoin miner and start earning without worrying about high electricity costs or technical expertise."
    },
    {
      question: "How is FreeCloudMiner different from Genesis Mining for bitcoin mining?",
      answer: "Our bitcoin cloud mining platform offers better rates and performance than Genesis Mining. We provide free bitcoin mining with no Genesis Mining fees. Our bitcoin miner delivers superior results compared to Genesis Mining, NiceHash, and other platforms with faster cryptocurrency payouts and lower minimum withdrawal. Use our bitcoin mining calculator to compare profitability. We offer transparent pricing and better hardware infrastructure for mining bitcoin using proof of work (PoW)."
    },
    {
      question: "Can I withdraw my bitcoin mining earnings to Binance or Coinbase?",
      answer: "Yes! Withdraw your bitcoin mining earnings directly to Binance or Coinbase exchanges. Our bitcoin cloud mining platform supports instant Binance withdrawal and Coinbase withdrawal with live BTC USD prices. Mine bitcoin and get instant cryptocurrency transfers with no delays. We support all major digital asset exchanges and bitcoin wallets for your mining profits."
    },
    {
      question: "Do I need expensive hardware like Bitmain Antminer for bitcoin mining?",
      answer: "No! Our bitcoin cloud mining service eliminates the need for expensive ASIC miners like Bitmain Antminer or Altcoin ASIC Miner. We handle all the bitcoin mining hardware based on proof of work (PoW) consensus. Simply use our bitcoin miner platform and start earning cryptocurrency without buying physical equipment. Our infrastructure provides the computing power you need for profitable bitcoin mining. Check potential earnings with our bitcoin mining calculator!"
    },
    {
      question: "How do I start bitcoin mining on your platform?",
      answer: "Starting bitcoin mining is simple: 1) Register on our bitcoin cloud mining platform 2) Get your $25 bonus for our bitcoin miner 3) Start mining bitcoin and earning cryptocurrency 4) Withdraw your bitcoin profits to your wallet, Binance, or Coinbase. Our bitcoin mining platform makes cryptocurrency mining easy for everyone with real-time blockchain updates. No technical expertise needed - just sign up and start earning with proof of work (PoW) mining!"
    },
    {
      question: "Is bitcoin cloud mining secure on your platform?",
      answer: "Absolutely! Our bitcoin cloud mining platform uses bank-level security with SSL encryption and 2FA protection. Your bitcoin miner account and cryptocurrency earnings are protected 24/7 using blockchain technology. We're a trusted bitcoin mining service with 10,000+ active users and no term contract obligations. All mining bitcoin operations use secure proof of work (PoW) protocols to ensure the safety of your digital assets."
    }
  ];

  return (
    <div className="landing-page min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead />
      
      {/* Header */}
      <header className="landing-header fixed top-0 w-full z-50 transition-all duration-300 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">FreeCloudMiner</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/market" className="text-gray-300 hover:text-white transition-colors">Market</Link>
              <Link to="/news" className="text-gray-300 hover:text-white transition-colors">News</Link>
              <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Calculator className="h-4 w-4" />
                <span>Calculator</span>
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap"
              >
                Get Free $25
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link to="/market" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>💹 Market</Link>
                <Link to="/news" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>📰 News</Link>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <Calculator className="h-4 w-4" />
                  <span>Calculator</span>
                </Link>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>📝 Blog</Link>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-200">Verified Platform</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-200">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-200">10,000+ Users</span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Bitcoin Mining Platform - Start Free Bitcoin Cloud Mining Today
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Start bitcoin mining with our free bitcoin cloud mining platform. Mine bitcoin without expensive hardware like Bitmain Antminer using proof of work (PoW) consensus. Our bitcoin miner provides cutting-edge technology for cryptocurrency mining. Join 10,000+ users earning passive income from digital assets with our user-friendly bitcoin mining service. Get real-time updates, avoid high electricity costs, and start earning with our bitcoin mining calculator!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>🎁</span>
                  <span>Get Free $25 Bonus</span>
                </Link>

                <a
                  href="#features"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all text-center"
                >
                  How It Works
                </a>
              </div>

              {/* Calculator CTA */}
              <div className="mt-6 sm:mt-8">
                <Link
                  to="/calculator"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Bitcoin Mining Calculator - Check Profitability</span>
                </Link>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">10K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Bitcoin Mining Users</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€250K+</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Daily Bitcoin Payouts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">24/7</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Bitcoin Cloud Mining</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">$0</h2>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Start Bitcoin Miner Free</p>
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
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">{activeUsers.toLocaleString()}</strong> mining now
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">€{totalEarnings.toLocaleString()}</strong> earned today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  <strong className="text-white font-bold">1,247</strong> withdrawals
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Security Seals */}
        <section className="py-10 sm:py-12 lg:py-16 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-center text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8">Trusted Bitcoin Cloud Mining Platform</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 text-center">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-xs sm:text-sm">SSL Encrypted</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 text-center">
                <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-xs sm:text-sm">2FA Protected</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 text-center">
                <Server className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-xs sm:text-sm">DDoS Protection</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 text-center">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-xs sm:text-sm">Verified</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 text-center col-span-2 sm:col-span-1">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-xs sm:text-sm">10K+ Users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Real Bitcoin Mining Reviews</h2>
              <p className="text-gray-300 text-base sm:text-lg">Verified bitcoin cloud mining users earning passive income with our bitcoin miner</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 flex-shrink-0">
                    D
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">David Chen</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">"Best bitcoin cloud mining platform I've tried! Started bitcoin mining with $0 and earned $150 in 2 months. Bitcoin miner works great! Excellent alternative to expensive ASIC hardware."</p>
                <p className="text-gray-500 text-xs mt-2">Verified - 60 days active</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 flex-shrink-0">
                    E
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Emma Rodriguez</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">"This bitcoin cloud mining platform is legit! Bitcoin mining without expensive fees. Perfect free bitcoin miner for beginners. Better than buying expensive Bitmain Antminer or Altcoin ASIC Miner hardware!"</p>
                <p className="text-gray-500 text-xs mt-2">Verified - 85 days active</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 flex-shrink-0">
                    A
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Alex Kumar</h4>
                    <div className="flex text-yellow-400 text-xs sm:text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">"Bitcoin cloud mining really works! Got my bitcoin withdrawal to my wallet in 3 days using proof of work (PoW). Best bitcoin mining service ever with all the key features I need!"</p>
                <p className="text-gray-500 text-xs mt-2">Verified - 42 days active</p>
              </div>
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <section className="py-10 sm:py-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-y border-green-500/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6">
              Try our bitcoin cloud mining service risk-free! Not satisfied with our bitcoin miner? Full refund within 30 days. Start bitcoin mining today with no term contract!
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span>100% Refund</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Why Choose Our Bitcoin Cloud Mining Platform</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Best bitcoin mining service with cutting-edge blockchain technology. Start bitcoin cloud mining with our bitcoin miner and earn passive income from cryptocurrency. No expensive ASIC hardware needed. Use our bitcoin mining calculator to check profitability based on proof of work (PoW)!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure Bitcoin Cloud Mining</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Bank-level security for your bitcoin mining operations. SSL encryption and 2FA protect your bitcoin miner earnings and digital cryptocurrency assets with real-time blockchain monitoring.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Advanced Bitcoin Mining Infrastructure</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We utilize Bitmain Antminer and specialized Altcoin ASIC Miner setups for bitcoin mining to ensure maximum efficiency based on proof of work (PoW). No expensive ASIC hardware required - we handle all the technical expertise for cryptocurrency mining!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Daily Bitcoin Payouts - Earn Passive Income</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Earn with bitcoin mining daily using our bitcoin miner. Our bitcoin cloud mining platform provides automatic cryptocurrency payouts to your bitcoin wallet. Start mining bitcoin now with our simple interface!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Easy Bitcoin Mining Setup</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Start bitcoin mining in minutes! Our bitcoin cloud mining platform is user-friendly and perfect for beginners. No technical knowledge needed for cryptocurrency mining with our simple bitcoin miner interface.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Transparent Bitcoin Mining Platform</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Real-time earnings dashboard for bitcoin cloud mining. Our bitcoin miner shows all cryptocurrency profits transparently with key features. Honest bitcoin mining service with no hidden fees based on blockchain technology.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">24/7 Bitcoin Mining Support</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Professional support for your bitcoin mining journey. Get help anytime with our bitcoin cloud mining platform. We support all cryptocurrency miners with no term contract commitments using our bitcoin miner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Start Bitcoin Mining Today - No Expensive Hardware Required
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our bitcoin cloud mining platform and earn passive income from cryptocurrency! Get $25 bonus with our bitcoin miner. Best bitcoin mining service with free trials. Start mining bitcoin now and avoid high electricity costs. Use our bitcoin mining calculator to check how proof of work (PoW) makes mining bitcoin profitable!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>🚀</span>
                <span>Start Free Bitcoin Mining</span>
              </Link>
              <a
                href="mailto:freecloudeminer1@gmail.com"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <span>💬</span>
                <span>Contact Support</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Bitcoin Mining FAQ</h2>
              <p className="text-base sm:text-xl text-gray-300">
                Common questions about bitcoin mining, our bitcoin cloud mining platform, bitcoin miner service, and how proof of work (PoW) makes mining bitcoin profitable. Learn about cryptocurrency mining!
              </p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-semibold text-white text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-2xl text-blue-400 font-bold flex-shrink-0">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 sm:px-6 pb-4">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:mt-12">
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                More questions about our bitcoin mining platform, bitcoin cloud mining service, bitcoin miner, or bitcoin mining calculator? Contact our 24/7 cryptocurrency mining support!
              </p>
              <a 
                href="mailto:freecloudeminer1@gmail.com" 
                className="inline-flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-5 sm:px-6 py-3 rounded-lg transition-colors text-sm sm:text-base"
              >
                <span>📧</span>
                <span>freecloudeminer1@gmail.com</span>
              </a>
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
              Start your bitcoin mining journey today! We offer cutting-edge bitcoin cloud mining services with a simple interface, daily cryptocurrency payouts to your bitcoin wallet, and no term contract commitment. Earn passive income from digital assets using our bitcoin miner without expensive ASIC hardware or high electricity costs. Try our bitcoin mining calculator!
            </p>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8 text-sm sm:text-base">
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">Platform</h3>
              <nav className="space-y-2">
                <Link to="/market" className="block text-gray-300 hover:text-white transition-colors">💹 Market Data</Link>
                <Link to="/news" className="block text-gray-300 hover:text-white transition-colors">📰 Crypto News</Link>
                <Link to="/calculator" className="block text-gray-300 hover:text-white transition-colors">🧮 Bitcoin Mining Calculator</Link>
                <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Key Features</a>
                <Link to="/how-mining-works" className="block text-gray-300 hover:text-white transition-colors">How Bitcoin Mining Works</Link>
                <a href="#faq" className="block text-gray-300 hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">Bitcoin Mining</h3>
              <nav className="space-y-2">
                <Link to="/genesis" className="block text-gray-300 hover:text-white transition-colors">Genesis Mining Alternative</Link>
                <Link to="/binance" className="block text-gray-300 hover:text-white transition-colors">Binance Mining</Link>
                <Link to="/coinbase" className="block text-gray-300 hover:text-white transition-colors">Coinbase Mining</Link>
                <Link to="/ethereum" className="block text-gray-300 hover:text-white transition-colors">Ethereum Miner</Link>
                <Link to="/dogecoin" className="block text-gray-300 hover:text-white transition-colors">Dogecoin Mining</Link>
                <Link to="/litecoin" className="block text-gray-300 hover:text-white transition-colors">Litecoin Mining</Link>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">Company</h3>
              <nav className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
                <Link to="/blog" className="block text-gray-300 hover:text-white transition-colors">Blog</Link>
                <a href="/careers" className="block text-gray-300 hover:text-white transition-colors">Careers</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">Support</h3>
              <nav className="space-y-2">
                <a href="/help" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact Us</Link>
                <a href="mailto:freecloudeminer1@gmail.com" className="block text-gray-300 hover:text-white transition-colors">Email Support</a>
                <a href="#faq" className="block text-gray-300 hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">Legal</h3>
              <nav className="space-y-2">
                <a href="/privacy" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="block text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="/cookies" className="block text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
                <a href="/risk" className="block text-gray-300 hover:text-white transition-colors">Risk Disclosure</a>
              </nav>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4">
              &copy; 2024 FreeCloudMiner. All rights reserved. Best bitcoin mining platform for bitcoin cloud mining and cryptocurrency mining. Mine bitcoin without expensive hardware using our bitcoin miner. Use our bitcoin mining calculator!
            </p>
            <p className="text-gray-500 text-xs">
              Bitcoin Mining Keywords: bitcoin • bitcoin mining • bitcoin cloud mining • bitcoin miner • proof of work PoW • cryptocurrency mining • blockchain technology • Bitmain Antminer • ASIC miner • digital currency • BTC mining • crypto mining • Genesis Mining alternative • Binance mining • Coinbase mining • bitcoin mining calculator • mine bitcoin • free bitcoin mining • cloud mining platform • passive income cryptocurrency • earn bitcoin • bitcoin wallet • no expensive hardware • low electricity costs • real-time blockchain updates
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
