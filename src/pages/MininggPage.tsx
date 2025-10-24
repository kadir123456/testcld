// src/pages/MiningPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Zap, Shield, DollarSign, TrendingUp, Server, Cpu, Lock, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const MiningPage: React.FC = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: 'Sign Up for Free Cloud Mining',
      description: 'Create your free account on our bitcoin cloud mining free platform. No credit card needed. Get $25 bonus instantly for cloud miner free start.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Choose Cloud Mining Bitcoin Free Package',
      description: 'Select your preferred mining cloud free package. From $99 Starter to $599 Enterprise. All online free mining plans include daily payouts.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Server,
      title: 'Start Online Free Mining Automatically',
      description: 'Your cloud miner free starts mining immediately. Our bitcoin cloud mining free infrastructure works 24/7. No hardware, no technical knowledge needed.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      title: 'Earn from Mining Cloud Free Daily',
      description: 'Watch your free cloud mining earnings grow every day. Withdraw anytime with our cloud mining bitcoin free platform. Fast, secure payouts.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Bitcoin Cloud Mining Free',
      description: 'Bank-level security with SSL encryption, 2FA, and cold wallet storage for your cloud miner free earnings.',
      stats: '99.9% Uptime'
    },
    {
      icon: Cpu,
      title: 'Industrial Mining Cloud Free Power',
      description: 'Latest ASIC miners for online free mining. Professional-grade bitcoin cloud mining free infrastructure.',
      stats: '300+ PH/s'
    },
    {
      icon: TrendingUp,
      title: 'Guaranteed Cloud Mining Bitcoin Free ROI',
      description: 'All free cloud mining packages deliver 172% ROI. Proven cloud miner free profitability with transparent earnings.',
      stats: '172% ROI'
    },
    {
      icon: Lock,
      title: 'Transparent Online Free Mining',
      description: 'Real-time dashboard for all bitcoin cloud mining free activities. See your mining cloud free power and earnings live.',
      stats: 'Real-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead 
        customTitle="How Free Cloud Mining Works - Bitcoin Cloud Mining Free Guide | FreeCloudMiner"
        customDescription="Learn how bitcoin cloud mining free works. Complete guide to cloud miner free platform, online free mining process, and mining cloud free earnings. Start cloud mining bitcoin free today!"
        customKeywords="how free cloud mining works, bitcoin cloud mining free guide, cloud miner free tutorial, online free mining how to, mining cloud free explained, cloud mining bitcoin free process"
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FreeCloudMiner</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Home</Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Blog</Link>
              <Link to="/packages" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Packages</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Contact</Link>
              <Link to="/auth" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                Start Free
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
                How Free Cloud Mining Works - Bitcoin Cloud Mining Free Explained
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Complete guide to cloud miner free platform. Learn how online free mining delivers daily bitcoin earnings with mining cloud free technology.
              </p>
              
              <div className="flex justify-center space-x-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-2xl font-bold text-green-400">172%</span>
                  <p className="text-gray-300 text-sm">ROI Guaranteed</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-2xl font-bold text-blue-400">24/7</span>
                  <p className="text-gray-300 text-sm">Auto Mining</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-2xl font-bold text-purple-400">$25</span>
                  <p className="text-gray-300 text-sm">Free Bonus</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Steps */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                4 Simple Steps to Start Free Cloud Mining
              </h2>
              <p className="text-xl text-gray-300">
                From registration to earnings - how bitcoin cloud mining free works on our cloud miner free platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center h-full">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 mt-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-400">
                        <span className="text-3xl">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Advanced Bitcoin Cloud Mining Free Technology
              </h2>
              <p className="text-xl text-gray-300">
                Professional cloud miner free infrastructure powering online free mining for 10,000+ users
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                          <span className="text-green-400 font-semibold text-sm">{feature.stats}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Earnings Calculator */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 sm:p-12 border border-blue-500/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Free Cloud Mining Earnings Calculator
                </h2>
                <p className="text-xl text-gray-300">
                  Calculate your bitcoin cloud mining free earnings with our cloud miner free calculator
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Starter Package</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">$2.99</div>
                  <p className="text-gray-400 text-sm mb-3">per day</p>
                  <div className="text-xl font-semibold text-green-400">$269</div>
                  <p className="text-gray-400 text-sm">total (90 days)</p>
                </div>

                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 text-center border-2 border-purple-500">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                    POPULAR
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Professional</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-1">$9.03</div>
                  <p className="text-gray-300 text-sm mb-3">per day</p>
                  <div className="text-xl font-semibold text-green-400">$813</div>
                  <p className="text-gray-300 text-sm">total (90 days)</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-1">$18.08</div>
                  <p className="text-gray-400 text-sm mb-3">per day</p>
                  <div className="text-xl font-semibold text-green-400">$1,627</div>
                  <p className="text-gray-400 text-sm">total (90 days)</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-300 mb-4">
                  All online free mining packages include $25 bonus and 30-day money-back guarantee
                </p>
                <Link
                  to="/packages"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  View All Mining Cloud Free Packages
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose Our Free Cloud Mining Platform
              </h2>
              <p className="text-xl text-gray-300">
                Leading bitcoin cloud mining free service with proven cloud miner free results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ No Hardware Needed</h3>
                <p className="text-gray-300">
                  Start bitcoin cloud mining free without expensive ASIC miners. Our cloud miner free platform handles all hardware.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ Daily Payouts</h3>
                <p className="text-gray-300">
                  Earn from online free mining every day. Withdraw your mining cloud free earnings anytime, no minimum hold period.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ 100% Transparent</h3>
                <p className="text-gray-300">
                  Real-time cloud mining bitcoin free dashboard. See all online free mining activity, earnings, and statistics live.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ Bank-Level Security</h3>
                <p className="text-gray-300">
                  SSL encryption, 2FA, and cold wallet storage protect your free cloud mining earnings. Trusted by 10,000+ users.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ 24/7 Support</h3>
                <p className="text-gray-300">
                  Professional bitcoin cloud mining free support team. Get help with cloud miner free platform anytime, anywhere.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">✓ Money-Back Guarantee</h3>
                <p className="text-gray-300">
                  30-day refund on all mining cloud free packages. Try online free mining risk-free with our satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Free Cloud Mining?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 10,000+ users earning with bitcoin cloud mining free. Get $25 bonus on our cloud miner free platform. Best online free mining service!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <span>🚀</span>
                <span>Start Mining Cloud Free Now</span>
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2024 FreeCloudMiner. All rights reserved. Leading free cloud mining and bitcoin cloud mining free platform.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/mining" className="text-gray-300 hover:text-white transition-colors">Mining</Link>
            <Link to="/packages" className="text-gray-300 hover:text-white transition-colors">Packages</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
