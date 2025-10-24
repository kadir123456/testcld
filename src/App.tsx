// src/App.tsx - COMPLETE WITH ALL SEO PAGES (NO BTCUSDPage)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Bileşenler
import { LanguageProvider } from './components/LanguageProvider.tsx';
import { Layout } from './components/Layout.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

// Hook
import { useAuth } from './hooks/useAuth.ts';

// PUBLIC PAGES (Giriş gerektirmez)
import { LandingPage } from './pages/LandingPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AuthPage } from './pages/AuthPage.tsx';
import { BlogPage } from './pages/BlogPage.tsx';
import { BlogPostPage } from './pages/BlogPostPage.tsx';
import { CalculatorPage } from './pages/CalculatorPage.tsx';
import { CryptoNewsPage } from './pages/CryptoNewsPage.tsx';
import { CryptoMarketPage } from './pages/CryptoMarketPage.tsx';

// HIGH-VOLUME SEO PAGES (Public - Yüksek arama hacimli sayfalar)
import { GenesisMining } from './pages/GenesisMining.tsx';
import { BinanceMining } from './pages/BinanceMining.tsx';
import { CoinMarketCapPage } from './pages/CoinMarketCapPage.tsx';
import { CoinbaseMining } from './pages/CoinbaseMining.tsx';
import { EthereumMiner } from './pages/EthereumMiner.tsx';
import { DogecoinMining } from './pages/DogecoinMining.tsx';
import { LitecoinMining } from './pages/LitecoinMining.tsx';

// PROTECTED PAGES (Giriş gerektirir)
import { Dashboard } from './pages/Dashboard.tsx';
import { MiningPage } from './pages/MiningPage.tsx';
import { PackagesPage } from './pages/PackagesPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { WithdrawalPage } from './pages/WithdrawalPage.tsx';
import { SupportPage } from './pages/SupportPage.tsx';


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1F2937',
                color: '#F3F4F6',
                border: '1px solid #374151',
              },
              success: {
                style: {
                  background: '#065F46',
                  color: '#D1FAE5',
                  border: '1px solid #10B981',
                },
              },
              error: {
                style: {
                  background: '#7F1D1D',
                  color: '#FEE2E2',
                  border: '1px solid #EF4444',
                },
              },
            }}
          />
          
          <Routes>
            {/* Ana sayfa - Landing Page */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LandingPage />
                )
              } 
            />
            
            {/* PUBLIC PAGES - Giriş gerektirmez */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* NEW FEATURES - Public pages */}
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/news" element={<CryptoNewsPage />} />
            <Route path="/market" element={<CryptoMarketPage />} />

            {/* Public mining pages */}
            <Route path="/how-mining-works" element={<MiningPage />} /> 
            <Route path="/mining-packages" element={<PackagesPage />} />
            
            {/* HIGH-VOLUME SEO PAGES - NO BTCUSDPage */}
            <Route path="/genesis" element={<GenesisMining />} />
            <Route path="/binance" element={<BinanceMining />} />
            <Route path="/coinmarketcap" element={<CoinMarketCapPage />} />
            <Route path="/coinbase" element={<CoinbaseMining />} />
            <Route path="/ethereum" element={<EthereumMiner />} />
            <Route path="/dogecoin" element={<DogecoinMining />} />
            <Route path="/litecoin" element={<LitecoinMining />} />
            
            {/* Auth sayfası */}
            <Route 
              path="/auth" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <AuthPage />
                )
              } 
            />
            
            {/* PROTECTED ROUTES - Dashboard ve korumalı sayfalar */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/mining" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <MiningPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/packages" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <PackagesPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <AdminPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/withdrawal" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <WithdrawalPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/support" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <SupportPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* 404 sayfası */}
            <Route 
              path="*" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;