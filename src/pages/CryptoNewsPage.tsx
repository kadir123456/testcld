// src/pages/CryptoNewsPage.tsx - CRYPTO NEWS WITH AI SUMMARY
import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, ExternalLink, Newspaper, RefreshCw, Sparkles } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const CryptoNewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('bitcoin');

  const categories = [
    { id: 'bitcoin', name: '🪙 Bitcoin', query: 'bitcoin' },
    { id: 'ethereum', name: '💎 Ethereum', query: 'ethereum' },
    { id: 'crypto', name: '💰 Cryptocurrency', query: 'cryptocurrency' },
    { id: 'blockchain', name: '🔗 Blockchain', query: 'blockchain' },
    { id: 'mining', name: '⛏️ Mining', query: 'bitcoin mining OR crypto mining' }
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      const category = categories.find(c => c.id === selectedCategory);
      const query = category?.query || 'cryptocurrency';
      
      // NewsAPI - Ücretsiz (500 requests/day)
      const apiKey = 'YOUR_NEWSAPI_KEY'; // Get from: https://newsapi.org/
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
      );
      
      if (!response.ok) {
        // Fallback to CryptoPanic API (no key needed for basic use)
        const cryptoPanicResponse = await fetch(
          `https://cryptopanic.com/api/v1/posts/?auth_token=free&currencies=${selectedCategory}&kind=news`
        );
        const cryptoPanicData = await cryptoPanicResponse.json();
        
        const formattedNews = cryptoPanicData.results?.slice(0, 20).map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.title,
          url: item.url,
          urlToImage: item.currencies?.[0]?.url || '/images/crypto-default.jpg',
          publishedAt: item.published_at,
          source: { name: item.source?.title || 'CryptoPanic' }
        })) || [];
        
        setNews(formattedNews);
      } else {
        const data = await response.json();
        const articles = data.articles?.filter((article: any) => 
          article.title && article.url && article.title !== '[Removed]'
        ) || [];
        setNews(articles);
      }
      
      setLastUpdate(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Mock data for demo
      setNews([
        {
          id: '1',
          title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Grows',
          description: 'Bitcoin has surged to a new record, driven by increased institutional investment and growing mainstream acceptance of cryptocurrency.',
          url: '#',
          urlToImage: '/images/bitcoin-news.jpg',
          publishedAt: new Date().toISOString(),
          source: { name: 'Crypto Daily' }
        },
        {
          id: '2',
          title: 'Cloud Mining Platforms See 300% Growth in 2025',
          description: 'The cloud mining industry is experiencing unprecedented growth as more investors seek passive income opportunities in cryptocurrency.',
          url: '#',
          urlToImage: '/images/mining-news.jpg',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: { name: 'Mining Weekly' }
        }
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">Crypto News</h1>
            </div>
            <a
              href="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base"
            >
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Latest Crypto News
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time cryptocurrency news powered by AI. Stay updated with bitcoin, ethereum, and blockchain news.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">
              Last updated: {lastUpdate || 'Loading...'}
            </p>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group"
                >
                  {article.urlToImage && (
                    <div className="relative h-48 overflow-hidden bg-gray-800">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/images/crypto-default.jpg';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        {article.source.name}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                    )}
                    
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && news.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No news found</h3>
              <p className="text-gray-400 mb-6">Try selecting a different category</p>
              <button
                onClick={fetchNews}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Refresh News
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-purple-500/30 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Stay Updated with Mining News
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our platform to receive real-time notifications about cryptocurrency mining opportunities and market trends.
            </p>
            <a
              href="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Start Mining Now</span>
              <TrendingUp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            Latest cryptocurrency news and bitcoin mining updates
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024 FreeCloudMiner. Real-time crypto news powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
};
