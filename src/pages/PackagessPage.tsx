// src/pages/PackagesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, CheckCircle, Zap, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PackagesPage: React.FC = () => {
  const packages = [
    {
      name: 'Starter',
      subtitle: 'Perfect for Free Cloud Mining Beginners',
      price: '$99',
      duration: '90 days',
      hashRate: '61.92 TH/s',
      dailyEarnings: '$2.99',
      totalEarnings: '$269',
      roi: '171%',
      features: [
        '90 days bitcoin cloud mining free access',
        '61.92 TH/s mining cloud free power',
        'Daily $2.99 online free mining earnings',
        'Weekly cloud miner free withdrawals',
        'Email support for free bitcoin mining',
        'Real-time cloud mining bitcoin free stats',
        'Free $25 bonus included'
      ],
      popular: false,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Professional',
      subtitle: 'Most Popular Bitcoin Cloud Mining Free',
      price: '$299',
      duration: '90 days',
      hashRate: '187.01 TH/s',
      dailyEarnings: '$9.03',
      totalEarnings: '$813',
      roi: '172%',
      features: [
        '90 days cloud mining free premium',
        '187.01 TH/s mining cloud free power',
        'Daily $9.03 cloud miner free earnings',
        'Daily online free mining withdrawals',
        'Priority support for bitcoin cloud mining free',
        '5% bonus on all free cloud mining earnings',
        'Advanced cloud mining bitcoin free analytics',
        'Free $25 bonus + 5% extra'
      ],
      popular: true,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Enterprise',
      subtitle: 'Maximum Online Free Mining Power',
      price: '$599',
      duration: '90 days',
      hashRate: '312.10 TH/s',
      dailyEarnings: '$18.08',
      totalEarnings: '$1,627',
      roi: '172%',
      features: [
        '90 days premium cloud mining free',
        '312.10 TH/s mining cloud free power',
        'Daily $18.08 free bitcoin mining earnings',
        'Instant cloud miner free withdrawals',
        'VIP dedicated bitcoin cloud mining free support',
        '10% bonus on all cloud mining bitcoin free earnings',
        'Exclusive online free mining features',
        'Priority mining cloud free queue',
        'Free $25 bonus + 10% extra'
      ],
      popular: false,
      gradient: 'from-yellow-600 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead 
        customTitle="Free Cloud Mining Packages - Bitcoin Cloud Mining Free Plans | FreeCloudMiner"
        customDescription="Choose your bitcoin cloud mining free package. Cloud miner free plans from $99. Start online free mining today! Best mining cloud free packages with guaranteed ROI. Cloud mining bitcoin free with daily payouts."
        customKeywords="free cloud mining packages, bitcoin cloud mining free plans, cloud miner free pricing, online free mining packages, mining cloud free plans, cloud mining bitcoin free pricing"
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
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors hidden sm:block">About</Link>
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
                Free Cloud Mining Packages - Bitcoin Cloud Mining Free Plans
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Choose the perfect cloud miner free package for your online free mining journey. All bitcoin cloud mining free plans include $25 bonus!
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-200">30-Day Money-Back</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-gray-200">172% ROI Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-200">Daily Payouts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div 
                  key={index}
                  className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 border ${
                    pkg.popular ? 'border-blue-500 border-2 relative' : 'border-white/10'
                  } transition-all hover:transform hover:scale-105`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <span>👑</span>
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{pkg.subtitle}</p>
                    <div className={`text-5xl font-bold bg-gradient-to-r ${pkg.gradient} text-transparent bg-clip-text mb-2`}>
                      {pkg.price}
                    </div>
                    <p className="text-gray-400">{pkg.duration}</p>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-3 mb-6 bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Hash Rate:</span>
                      <span className="text-white font-semibold">{pkg.hashRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Daily Earnings:</span>
                      <span className="text-green-400 font-semibold">{pkg.dailyEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Total Earnings:</span>
                      <span className="text-blue-400 font-semibold">{pkg.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">ROI:</span>
                      <span className="text-purple-400 font-semibold">{pkg.roi}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to="/auth"
                    className={`w-full block text-center py-4 bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white rounded-xl font-semibold transition-all transform hover:scale-105`}
                  >
                    Start {pkg.name} Mining
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Free Cloud Mining Package Comparison
              </h2>
              <p className="text-xl text-gray-300">
                Compare bitcoin cloud mining free plans to find the best cloud miner free package for you
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white font-semibold">Feature</th>
                    <th className="text-center p-4 text-white font-semibold">Starter</th>
                    <th className="text-center p-4 text-white font-semibold">Professional</th>
                    <th className="text-center p-4 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Contract Duration</td>
                    <td className="text-center p-4 text-white">90 days</td>
                    <td className="text-center p-4 text-white">90 days</td>
                    <td className="text-center p-4 text-white">90 days</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Mining Power</td>
                    <td className="text-center p-4 text-white">61.92 TH/s</td>
                    <td className="text-center p-4 text-white">187.01 TH/s</td>
                    <td className="text-center p-4 text-white">312.10 TH/s</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Daily Earnings</td>
                    <td className="text-center p-4 text-green-400">$2.99</td>
                    <td className="text-center p-4 text-green-400">$9.03</td>
                    <td className="text-center p-4 text-green-400">$18.08</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Withdrawal Frequency</td>
                    <td className="text-center p-4 text-white">Weekly</td>
                    <td className="text-center p-4 text-white">Daily</td>
                    <td className="text-center p-4 text-white">Instant</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Bonus Earnings</td>
                    <td className="text-center p-4 text-white">$25</td>
                    <td className="text-center p-4 text-white">$25 + 5%</td>
                    <td className="text-center p-4 text-white">$25 + 10%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-gray-300">Support Level</td>
                    <td className="text-center p-4 text-white">Email</td>
                    <td className="text-center p-4 text-white">Priority</td>
                    <td className="text-center p-4 text-white">VIP Dedicated</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Money-Back Guarantee</td>
                    <td className="text-center p-4 text-green-400">✓</td>
                    <td className="text-center p-4 text-green-400">✓</td>
                    <td className="text-center p-4 text-green-400">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Free Cloud Mining Package FAQ
              </h2>
              <p className="text-gray-300">
                Common questions about bitcoin cloud mining free packages and cloud miner free pricing
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">What's included in free cloud mining packages?</h3>
                <p className="text-gray-300">
                  All bitcoin cloud mining free packages include: dedicated mining cloud free power, daily online free mining payouts, real-time stats, 24/7 support, and $25 bonus. Higher tiers get bonus earnings and priority features.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Can I upgrade my cloud miner free package?</h3>
                <p className="text-gray-300">
                  Yes! Upgrade your cloud mining bitcoin free package anytime. The difference in online free mining power activates immediately, and you keep your accumulated earnings.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Is there a free bitcoin mining trial?</h3>
                <p className="text-gray-300">
                  Every package includes a $25 free cloud mining bonus to start. Plus, our 30-day money-back guarantee means risk-free mining cloud free for all plans!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Free Cloud Mining Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 10,000+ bitcoin cloud mining free users. Choose your cloud miner free package and start online free mining now!
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>🚀</span>
              <span>Choose Your Mining Cloud Free Package</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2024 FreeCloudMiner. All rights reserved. Best free cloud mining and bitcoin cloud mining free packages.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
