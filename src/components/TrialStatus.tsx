// src/components/TrialStatus.tsx
import React from 'react';
import { Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const TrialStatus: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.activePackage) return null;

  const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null;
  const now = new Date();
  const daysLeft = trialEndDate ? Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const earningsLeft = Math.max(0, 25 - (user.totalTrialEarnings || 0));
  const isTrialActive = daysLeft > 0 && earningsLeft > 0;
  
  // Progress percentage calculation
  const progressPercentage = Math.min(((user?.totalTrialEarnings ?? 0) / 25.0) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 md:p-6 border border-blue-500/30 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-white">Free Trial Status</h3>
        {!isTrialActive && (
          <div className="flex items-center space-x-1 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Expired</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 md:p-3 rounded-lg bg-blue-600/20">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-gray-400">Remaining Days</p>
            <p className="text-base md:text-lg font-semibold text-white">
              {daysLeft} {daysLeft === 1 ? 'day' : 'day'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 md:p-3 rounded-lg bg-green-600/20">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-gray-400">Winning Limit</p>
            <p className="text-base md:text-lg font-semibold text-white">
              ${Math.max(0, 25.0 - (user.totalTrialEarnings ?? 0)).toFixed(2)} / $25.00
            </p>
          </div>
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
          <span>Trial Progress</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>$25.00</span>
        </div>
      </div>
      
      {/* Status Messages */}
      {!isTrialActive ? (
        <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-3 md:p-4 mb-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-red-400 text-sm font-medium">
                {daysLeft === 0 ? 'Trial period has expired' : 'Trial earnings limit reached'}
              </p>
              <p className="text-gray-300 text-xs mt-1">
               Upgrade to premium package to continue mining and earn unlimited rewards.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-3 md:p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-green-400 text-sm font-medium">Trial Active</p>
          </div>
          <p className="text-gray-300 text-xs mt-1">
            Start mining now to maximize your trial earnings!
          </p>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Link
          to="/mining"
          className={`flex-1 px-4 py-2 rounded-lg font-medium text-center text-sm transition-colors ${
            isTrialActive
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isTrialActive ? 'Start Mining' : 'Trial Period Expired'}
        </Link>
        
        <Link
          to="/packages"
          className="flex-1 px-4 py-2 rounded-lg font-medium text-center text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all"
        >
          Upgrade Package
        </Link>
      </div>
    </div>
  );
};
