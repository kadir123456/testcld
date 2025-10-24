import React, { useState } from 'react';
import { PaymentNotification } from '../components/PaymentNotification';
import { useLanguage } from '../hooks/useLanguage';
import { Package } from '../types';
import { Check, Crown, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export const PackagesPage: React.FC = () => {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  
  // This would normally come from Firebase
  const packages: Package[] = [
    {
      id: 'starter',
      name: 'Beginning',
      price: 49,
      duration: 90,
      hashRate: 500,
      dailyEarning: 1.75,
      weeklyWithdrawal: true,
      description: 'Perfect for beginners',
    },
    {
      id: 'professional',
      name: 'professional',
      price: 199,
      duration: 90,
      hashRate: 1500,
      dailyEarning: 7.13,
      weeklyWithdrawal: true,
      description: 'Best value for serious miners',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'enterprise',
      price: 299,
      duration: 90,
      hashRate: 3000,
      dailyEarning: 10.72,
      weeklyWithdrawal: true,
      description: 'Maximum earning potential',
    },
  ];

  const trcAddress = "TMjSDNto6hoHUV9udDcXVAtuxxX6cnhhv3";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(trcAddress);
      setCopiedAddress(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (error) {
      toast.error('Address could not be copied');
    }
  };

  const handlePurchase = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">{t('packages')}</h1>
        <p className="text-gray-400">{t('selectPackage')}</p>
      </div>

      {/* Payment Instructions */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-xl font-semibold text-white mb-4">Payment Instructions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div>
              <p className="text-white font-medium">TRC20 USDT Address</p>
              <p className="text-sm text-gray-400">Send payment to this address</p>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
            >
              <Copy className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400">{copiedAddress ? 'Copied!' : 'copy'}</span>
            </button>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/50">
            <p className="text-white font-mono text-sm break-all">{trcAddress}</p>
          </div>
          <div className="text-sm text-gray-300 space-y-1">
            <p>1. Send USDT (TRC20) to the address above</p>
            <p>2. After sending, click on the "Payment Notification" button.</p>
            <p>3. Wait for admin approval (usually within 24 hours)</p>
            <p>4. Start mining with your new package!</p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border transition-all hover:scale-105 ${
              pkg.popular
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-gray-700'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <Crown className="h-4 w-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
              <div className="text-4xl font-bold text-white mb-2">
                ${pkg.price}
                <span className="text-lg text-gray-400">/month</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{pkg.duration} day duration</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{pkg.hashRate.toLocaleString()} H/s</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">${pkg.dailyEarning}/day forecast</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Weekly withdrawals</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">24/7 support</span>
              </div>
            </div>

            <button
              onClick={() => handlePurchase(pkg)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                pkg.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">How long does approval take?</h4>
            <p className="text-gray-400">Package activations are usually processed within 24 hours after payment confirmation..</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Can I upgrade my package?</h4>
            <p className="text-gray-400">Yes, you can upgrade at any time. Contact support for package upgrades.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Gizli ücretler var mı?</h4>
            <p className="text-gray-400">There are no hidden fees. The price shown is the only amount you pay for the entire package duration..</p>
          </div>
        </div>
      </div>

      {/* Payment Notification Modal */}
      {selectedPackage && (
        <PaymentNotification
          selectedPackage={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};
