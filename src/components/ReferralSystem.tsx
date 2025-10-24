import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Share2, Copy, Users, DollarSign, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReferralSystem: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!user) return null;

  const referralLink = `${window.location.origin}/auth?ref=${user.referralCode || 'LOADING'}`;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      toast.success(t('success') + ': Referral link copied!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      toast.error(t('error') + ': Link could not be copied');
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CryptoCloud Mining - Free Crypto Mining',
          text: 'Start earning crypto with me! Get a $25 bonus with a free trial.',
          url: referralLink
        });
      } catch (error) {
        copyReferralLink();
      }
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 md:p-6 border border-purple-500/30">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-600/20">
          <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white">Reference System</h3>
          <p className="text-sm text-gray-300">Invite your friends, get 10% bonus!</p>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Gift className="h-4 w-4 text-green-400" />
            <p className="text-xs text-gray-400">Referral Balance</p>
          </div>
          <p className="text-lg font-bold text-green-400">
            ${(user.referralBalance ?? 0).toFixed(2)}
          </p>
          {(user.referralBalance ?? 0) >= 25 ? (
            <p className="text-xs text-green-400 mt-1">✓ Withdrawable</p>
          ) : (
            <p className="text-xs text-yellow-400 mt-1">Min $25 required</p>
          )}
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="h-4 w-4 text-blue-400" />
            <p className="text-xs text-gray-400">Invited</p>
          </div>
          <p className="text-lg font-bold text-blue-400">
            {user.totalReferrals || 0}
          </p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Reference Link
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm"
            />
            <button
              onClick={copyReferralLink}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-1"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">
                {copiedLink ? 'copyAddress!' : t('copyAddress')}
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={shareReferralLink}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Invite Your Friends</span>
        </button>
      </div>

      {/* How it works */}
      <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
        <h4 className="text-white font-medium mb-2 text-sm">How Does It Work?</h4>
        <div className="text-xs text-gray-300 space-y-2">
          <p>
            Share your referral link and earn 10% commission when your friends sign up:
          </p>
          <div className="bg-gray-700/50 p-2 rounded font-mono text-blue-300">
            {referralLink}
          </div>
          <p>
            • Users who register with this link will automatically become your referral.
            • You earn 10% commission when your referral purchases a package.
            • Commissions are added to your referral balance
            • Referral balance requires minimum $25 to withdraw
            • All your referral earnings are tracked transparently
          </p>
        </div>
      </div>
    </div>
  );
}
