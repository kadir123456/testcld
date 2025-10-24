import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSelector } from '../components/LanguageSelector';
import { supportedLanguages, detectUserLanguage } from '../utils/languages';
import { useNavigate, Link } from 'react-router-dom';
import { Hammer, Eye, EyeOff, ArrowLeft, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  const { login, register, resetPassword, updateUserLanguage } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // URL'den referans kodunu al
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      setReferralCode(refParam);
    }
  }, []);

  React.useEffect(() => {
    if (mode === 'register' && !selectedLanguage) {
      setSelectedLanguage(detectUserLanguage());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (loading) return;
    
    if (!email || !password) {
      toast.error(t('error') + ': Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('error') + ': Please enter a valid email address');
      return;
    }

    // Password validation for login/register
    if (mode !== 'reset') {
      if (password.length < 6) {
        toast.error(t('error') + ': Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success(t('success') + ': Welcome back!');
      } else if (mode === 'register') {
        await register(email, password);
        
        // Update user language if selected
        if (selectedLanguage) {
          await updateUserLanguage(selectedLanguage);
        }
        
        toast.success(t('success') + ': Hesap başarıyla oluşturuldu!');
        
        // Kayıt sonrası dashboard'a yönlendir
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else if (mode === 'reset') {
        await resetPassword(email);
        toast.success(t('success') + ': Password reset email sent!');
        setMode('login');
      }
    } catch (error: any) {
      toast.error(t('error') + ': ' + (error.message || 'İşlem başarısız'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: 'login' | 'register' | 'reset') => {
    setMode(newMode);
    setEmail('');
    setPassword('');
    setSelectedLanguage('');
    setReferralCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Return to home page button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            <span>{t('backToHome')}</span>
          </Link>

        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-7 w-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CryptoCloud Mining</h1>
            <p className="text-gray-400">
              {mode === 'login' ? t('loginWelcome') :
               mode === 'register' ? t('registerWelcome') :
               t('resetWelcome')}
            </p>
          </div>

          {/* Language Selector at top */}
          <div className="mb-6 flex justify-center">
            <LanguageSelector />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('emailPlaceholder')}
                required
                disabled={loading}
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('passwordPlaceholder')}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe className="inline h-4 w-4 mr-2" />
                  {t('selectLanguage')}
                </label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label htmlFor="referral" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('referralCode')}
                </label>
                <input
                  id="referral"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t('referralPlaceholder')}
                  disabled={loading}
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => switchMode('reset')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  disabled={loading}
                >
                  {t('forgotPassword')}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || (mode !== 'reset' && !password)}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{t('processing')}</span>
                </div>
              ) : (
                mode === 'login' ? t('login') : 
                mode === 'register' ? t('register') : 
                t('resetPassword')
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <p className="text-gray-400">
                {t('noAccount')}
                <button
                  onClick={() => switchMode('register')}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  disabled={loading}
                >
                  {t('register')}
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p className="text-gray-400">
                {t('haveAccount')}
                <button
                  onClick={() => switchMode('login')}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  disabled={loading}
                >
                  {t('login')}
                </button>
              </p>
            )}

            {mode === 'reset' && (
              <p className="text-gray-400">
                {t('wantToLogin')}
                <button
                  onClick={() => switchMode('login')}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  disabled={loading}
                >
                  {t('login')}
                </button>
              </p>
            )}
          </div>

          {mode === 'register' && (
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center space-x-2">
                <span>🎁</span>
                <span>{t('freeTrialIncluded')}</span>
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• {t('freeTrialMonths')}</li>
                <li>• {t('freeTrialEarnings')}</li>
                <li>• {t('freeTrialCoins')}</li>
                <li>• {t('freeTrialNoPayment')}</li>
              </ul>
            </div>
          )}

          {/* Company Info */}
          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium">CryptoCloud Mining GmbH</p>
              <p>Berliner Allee 12, 40212 Düsseldorf, Germany</p>
            </div>
          </div>
        </div>
        
        {/* Güven göstergeleri */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <span>🔒</span>
              <span>{t('sslSecure')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span>{t('fastProcessing')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🛡️</span>
              <span>{t('trusted')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
