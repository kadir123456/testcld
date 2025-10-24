// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Mail, MapPin, Phone, Clock, Send, MessageSquare } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    window.location.href = `mailto:freecloudeminer1@gmail.com?subject=${formData.subject}&body=${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead 
        customTitle="Contact Us - Free Cloud Mining Support | FreeCloudMiner"
        customDescription="Contact FreeCloudMiner for bitcoin cloud mining free support. 24/7 help for cloud miner free platform. Get answers about online free mining, mining cloud free, and cloud mining bitcoin free service."
        customKeywords="contact free cloud mining, bitcoin cloud mining free support, cloud miner free help, online free mining contact, mining cloud free support"
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
                Contact Our Free Cloud Mining Support Team
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions about bitcoin cloud mining free? Need help with cloud miner free platform? We're here to help with online free mining support 24/7!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                <p className="text-gray-300 mb-8">
                  Questions about free cloud mining, bitcoin cloud mining free, or cloud mining bitcoin free? Contact us for mining cloud free support!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">Select a subject</option>
                      <option value="Free Cloud Mining Question">Free Cloud Mining Question</option>
                      <option value="Bitcoin Cloud Mining Free Support">Bitcoin Cloud Mining Free Support</option>
                      <option value="Cloud Miner Free Account">Cloud Miner Free Account</option>
                      <option value="Online Free Mining Help">Online Free Mining Help</option>
                      <option value="Withdrawal Issue">Withdrawal Issue</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your cloud mining bitcoin free question..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                      <p className="text-gray-300 mb-3">
                        For free cloud mining and bitcoin cloud mining free support
                      </p>
                      <a href="mailto:freecloudeminer1@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                        freecloudeminer1@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Support Hours</h3>
                      <p className="text-gray-300 mb-2">
                        Our cloud miner free support team is available:
                      </p>
                      <p className="text-white font-semibold">24/7 - Always Online</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Average response time: 2-4 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Office Address</h3>
                      <p className="text-gray-300 mb-2">
                        FreeCloudMiner GmbH
                      </p>
                      <p className="text-gray-400">
                        Berliner Allee 12<br />
                        40212 Düsseldorf<br />
                        Germany
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                      <p className="text-gray-300 mb-3">
                        Need instant help with online free mining?
                      </p>
                      <Link 
                        to="/auth"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                      >
                        Start Live Chat
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quick Help for Cloud Mining Free Questions
            </h2>
            <p className="text-gray-300 mb-8">
              Common bitcoin cloud mining free and cloud miner free questions answered
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                to="/#faq"
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all text-left"
              >
                <h3 className="text-lg font-bold text-white mb-2">How does free cloud mining work?</h3>
                <p className="text-gray-400 text-sm">Learn about our bitcoin cloud mining free platform</p>
              </Link>

              <Link 
                to="/#faq"
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all text-left"
              >
                <h3 className="text-lg font-bold text-white mb-2">Is cloud miner free profitable?</h3>
                <p className="text-gray-400 text-sm">See real mining cloud free earnings data</p>
              </Link>

              <Link 
                to="/#faq"
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all text-left"
              >
                <h3 className="text-lg font-bold text-white mb-2">How to withdraw from online free mining?</h3>
                <p className="text-gray-400 text-sm">Step-by-step cloud mining bitcoin free withdrawal guide</p>
              </Link>

              <Link 
                to="/#faq"
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all text-left"
              >
                <h3 className="text-lg font-bold text-white mb-2">Is free bitcoin mining safe?</h3>
                <p className="text-gray-400 text-sm">Our security measures for cloud mining free</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Free Cloud Mining?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our bitcoin cloud mining free platform! Get $25 bonus with cloud miner free. Best online free mining service!
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>🚀</span>
              <span>Start Mining Cloud Free</span>
            </Link>
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
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
