// src/pages/AboutPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Shield, Users, Target, Award, TrendingUp, Globe, Zap } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead 
        customTitle="About Us - Free Bitcoin Mining Platform | Bitcoin mining"
        customDescription="Learn about FreeCloudMiner - the leading bitcoin cloud mining free platform. Our mission to make cloud miner free accessible to everyone. Trusted by 10,000+ users worldwide."
        customKeywords="about free cloud mining, bitcoin mining free company, cloud miner free platform, online free mining about, mining cloud free company"
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Bitcoin Mining</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Home</Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Blog</Link>
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
                About FreeCloudMiner - Leading Free Bitcoin Mining Platform
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Pioneering bitcoin cloud mining free since 2020. Making cloud miner free accessible to everyone worldwide with our online free mining platform.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <h3 className="text-4xl font-bold text-blue-400 mb-2">10K+</h3>
                <p className="text-gray-300">Active Free Cloud Mining Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <h3 className="text-4xl font-bold text-green-400 mb-2">€2M+</h3>
                <p className="text-gray-300">Bitcoin Mining Free Payouts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <h3 className="text-4xl font-bold text-purple-400 mb-2">50+</h3>
                <p className="text-gray-300">Countries Using Cloud Miner Free</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <h3 className="text-4xl font-bold text-yellow-400 mb-2">24/7</h3>
                <p className="text-gray-300">Online Free Mining Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To democratize bitcoin cloud mining free and make cloud miner free accessible to everyone, regardless of technical knowledge or capital. We believe mining cloud free should be simple, transparent, and profitable for all.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our free cloud mining platform empowers individuals worldwide to participate in the cryptocurrency revolution through online free mining without expensive hardware or technical expertise.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To become the world's most trusted free bitcoin mining platform, serving millions of users with our cloud mining bitcoin free service. We envision a future where everyone can earn passive income through mining cloud free.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Building the most user-friendly online cloud mining free ecosystem with innovative features, maximum security, and sustainable growth for all cloud miner free participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                What makes our free cloud mining platform different - the principles behind bitcoin cloud mining free success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Security First</h3>
                <p className="text-gray-300">
                  Bank-level security for cloud mining bitcoin free. SSL encryption, 2FA, and cold wallet storage protect your online free mining earnings.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">User-Centric</h3>
                <p className="text-gray-300">
                  Every decision prioritizes our free bitcoin mining users. Simple cloud miner free interface, transparent mining cloud free operations.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Transparency</h3>
                <p className="text-gray-300">
                  Real-time online cloud mining free stats. No hidden fees in our bitcoin cloud mining free platform. Honest free cloud mining service.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-300">
                  Constantly improving our cloud miner free technology. Leading mining cloud free innovation for better online free mining experience.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
                <p className="text-gray-300">
                  High-performance bitcoin cloud mining free infrastructure. Optimized cloud mining bitcoin free for maximum earnings.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-300">
                  Building a global free cloud mining community. Supporting all online free mining users to succeed together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-20 bg-black/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Why Choose FreeCloudMiner for Bitcoin Cloud Mining Free
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              The most trusted cloud miner free platform with proven mining cloud free results
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-left">
                <h3 className="text-xl font-bold text-white mb-3">✓ Proven Free Cloud Mining Track Record</h3>
                <p className="text-gray-300">
                  4+ years of reliable bitcoin cloud mining free service. Thousands of satisfied cloud miner free users earning daily with our online free mining platform.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-left">
                <h3 className="text-xl font-bold text-white mb-3">✓ Advanced Cloud Mining Bitcoin Free Technology</h3>
                <p className="text-gray-300">
                  Latest mining cloud free infrastructure with optimized algorithms. Our free bitcoin mining technology delivers superior performance.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-left">
                <h3 className="text-xl font-bold text-white mb-3">✓ 24/7 Online Free Mining Support</h3>
                <p className="text-gray-300">
                  Professional support team available anytime for all cloud mining free questions. We help every free cloud mining user succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join 10,000+ Free Cloud Mining Users Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start bitcoin cloud mining free now! Get $25 bonus with our cloud miner free platform. Best online free mining service!
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>🚀</span>
              <span>Start Free Bitcoin Mining</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2024 FreeCloudMiner. All rights reserved.
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
