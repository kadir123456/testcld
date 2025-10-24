// src/pages/BlogPostPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { SEOHead } from '../components/SEOHead';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog yazısı bulunamadı</h1>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300">
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.freecloudminer.com/blog/${slug}`;

  return (
    <>
      <SEOHead
        customTitle={`${post.title} | FreeCloudMiner Blog`}
        customDescription={post.excerpt}
        customKeywords={`${post.title}, kripto madencilik, bitcoin, ethereum, blockchain, cloud mining`}
        isArticle={true}
        publishedTime={post.publishDate}
        modifiedTime={post.publishDate}
        breadcrumbs={[
          { name: 'Ana Sayfa', url: 'https://www.freecloudminer.com' },
          { name: 'Blog', url: 'https://www.freecloudminer.com/blog' },
          { name: post.title, url: `https://www.freecloudminer.com/blog/${slug}` }
        ]}
      />

      <style>{`
        .blog-content {
          line-height: 1.8;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #fff;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #e5e7eb;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          color: #d1d5db;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          color: #d1d5db;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content strong {
          color: #60a5fa;
          font-weight: 600;
        }
        
        .blog-content .cta-box {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          margin: 2.5rem 0;
          text-align: center;
          animation: pulse-glow 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        
        .blog-content .cta-box::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation: rotate 10s linear infinite;
        }
        
        .blog-content .cta-box > * {
          position: relative;
          z-index: 1;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .blog-content .cta-box h3 {
          margin: 0 0 1rem 0;
          font-size: 1.75rem;
          color: #60a5fa;
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }
        
        .blog-content .cta-box p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          color: #e5e7eb;
        }
        
        .blog-content .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        
        .blog-content .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
        }
        
        .blog-content .highlight-box {
          background: rgba(251, 191, 36, 0.1);
          border-left: 4px solid #fbbf24;
          padding: 1.25rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          animation: fade-in-up 0.5s ease-out;
        }
        
        .blog-content .highlight-box strong {
          color: #fbbf24;
        }
        
        .blog-content .faq-section {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .blog-content .faq-section h2 {
          text-align: center;
          color: #60a5fa;
          border-bottom: none;
          margin-bottom: 2rem;
        }
        
        .blog-content .faq-item {
          background: rgba(31, 41, 55, 0.5);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }
        
        .blog-content .faq-item:hover {
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateX(5px);
        }
        
        .blog-content .faq-item h3 {
          color: #60a5fa;
          font-size: 1.25rem;
          margin: 0 0 0.75rem 0;
        }
        
        .blog-content .faq-item p {
          margin: 0;
          color: #d1d5db;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back to blog */}
          <Link 
            to="/blog"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Post Header */}
          <header className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Share2 className="h-4 w-4 text-gray-400" />
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </header>

          {/* Main CTA - Top */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">
              🚀 Start Free Cloud Mining Today
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of users earning cryptocurrency daily with our secure platform
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Mining - 100% Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Post Content */}
          <article className="blog-content prose prose-lg prose-invert max-w-none animate-fade-in">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6">
              Experience the future of cryptocurrency mining. No hardware required, start earning today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-gray-700"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t border-gray-700 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all block group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-blue-400 text-sm font-medium flex items-center space-x-1">
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
