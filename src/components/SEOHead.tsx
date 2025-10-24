// src/components/SEOHead.tsx - FIXED: FAQPage REMOVED (already in index.html)
import { Helmet } from 'react-helmet-async';

export const SEOHead: React.FC = () => {
  return (
    <Helmet>
      <title>Bitcoin Mining 2025 | Free Bitcoin Cloud Mining Platform | Best Bitcoin Miner</title>
      <meta 
        name="description" 
        content="Start bitcoin mining with our free bitcoin cloud mining platform. Mine bitcoin without expensive hardware using proof of work (PoW). Best bitcoin miner alternative to Genesis Mining. Withdraw to Binance & Coinbase. Use our bitcoin mining calculator with live prices!" 
      />
      <meta 
        name="keywords" 
        content="bitcoin mining, bitcoin, bitcoin cloud mining, bitcoin miner, mine bitcoin, cryptocurrency mining, blockchain, BTC mining, proof of work, PoW, crypto mining, Bitmain Antminer, ASIC miner, digital currency, Genesis Mining alternative, Binance mining, Coinbase mining, bitcoin mining calculator, free bitcoin mining, bitcoin wallet, passive income cryptocurrency" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://freecloudeminer.com/" />
      <meta property="og:title" content="Bitcoin Mining Platform | Free Bitcoin Cloud Mining 2025 | Bitcoin Miner" />
      <meta 
        property="og:description" 
        content="Start bitcoin mining free with our bitcoin cloud mining platform. Mine bitcoin without expensive ASIC hardware. Best bitcoin miner alternative to Genesis Mining!" 
      />
      <meta property="og:image" content="https://freecloudeminer.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://freecloudeminer.com/" />
      <meta property="twitter:title" content="Bitcoin Mining: Free Bitcoin Cloud Mining Platform 2025" />
      <meta 
        property="twitter:description" 
        content="Mine bitcoin free! Bitcoin cloud mining platform without expensive hardware using proof of work (PoW). Best bitcoin miner service!" 
      />
      <meta property="twitter:image" content="https://freecloudeminer.com/twitter-image.jpg" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="author" content="FreeCloudMiner" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://freecloudeminer.com/" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FreeCloudMiner",
          "url": "https://freecloudeminer.com",
          "logo": "https://freecloudeminer.com/logo.png",
          "description": "Leading bitcoin mining platform for bitcoin cloud mining and cryptocurrency mining. Best bitcoin miner alternative to Genesis Mining. Mine bitcoin using proof of work (PoW). Withdraw to Binance, Coinbase.",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "freecloudeminer1@gmail.com",
            "availableLanguage": ["English"]
          },
          "sameAs": [
            "https://twitter.com/freecloudeminer",
            "https://facebook.com/freecloudeminer"
          ]
        })}
      </script>

      {/* Structured Data - Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Bitcoin Mining Platform",
          "provider": {
            "@type": "Organization",
            "name": "FreeCloudMiner"
          },
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bitcoin Mining Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bitcoin Mining",
                  "description": "Start bitcoin cloud mining free. Mine bitcoin without expensive hardware using proof of work (PoW). Best bitcoin miner platform."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Genesis Mining Alternative",
                  "description": "Better than Genesis Mining with lower fees. Bitcoin cloud mining without Genesis Mining costs. Superior bitcoin miner."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Binance Bitcoin Withdrawal",
                  "description": "Mine bitcoin and withdraw to Binance. Direct Binance withdrawal with live BTC USD prices from bitcoin mining."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Coinbase Bitcoin Integration",
                  "description": "Mine bitcoin and send to Coinbase. Trusted Coinbase withdrawal with live prices from our bitcoin miner."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bitcoin Mining Calculator",
                  "description": "Bitcoin mining calculator with live prices for accurate cryptocurrency mining profitability based on proof of work."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ethereum Miner",
                  "description": "Professional ethereum miner service. Mine crypto ethereum with our cryptocurrency miner platform."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Dogecoin Mining",
                  "description": "Dogecoin mining and dogecoin miner service. Mining crypto dogecoin made easy."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Litecoin Mining",
                  "description": "Litecoin mining and litecoin miner platform. Mine cryptos litecoin efficiently."
                }
              }
            ]
          },
          "keywords": "bitcoin mining, free btc mining, genesis mining, genesis, binance, coinbase, coinmarketcap, ethereum miner, dogecoin mining, litecoin mining, cryptocurrency mining, mine crypto, crypto miner, nicehash, whattomine"
        })}
      </script>

      {/* NOTE: FAQPage removed - already exists in index.html to avoid duplication */}

      {/* Structured Data - Product */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Free Bitcoin Cloud Mining Service",
          "image": "https://freecloudeminer.com/logo.png",
          "description": "Start bitcoin mining with our free bitcoin cloud mining platform. Mine bitcoin without expensive hardware using proof of work (PoW). Best bitcoin miner alternative to Genesis Mining. Withdraw to Binance & Coinbase.",
          "brand": {
            "@type": "Brand",
            "name": "FreeCloudMiner"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://freecloudeminer.com",
            "priceCurrency": "USD",
            "price": "0.00",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "FreeCloudMiner"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "10247"
          },
          "keywords": "bitcoin mining, bitcoin, bitcoin cloud mining, bitcoin miner, mine bitcoin, proof of work, PoW, cryptocurrency mining, blockchain, BTC, Genesis Mining alternative, Binance, Coinbase"
        })}
      </script>

      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FreeCloudMiner - Bitcoin Mining Calculator",
          "url": "https://freecloudeminer.com/calculator",
          "description": "Bitcoin mining calculator with live prices. Calculate bitcoin mining profitability for cryptocurrency. Track BTC mining earnings with proof of work (PoW) data.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "keywords": "bitcoin mining calculator, bitcoin calculator, crypto mining calculator, BTC calculator, mining profitability calculator, proof of work calculator"
        })}
      </script>

      {/* Structured Data - BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://freecloudeminer.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bitcoin Mining",
              "item": "https://freecloudeminer.com/how-mining-works"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Genesis Mining Alternative",
              "item": "https://freecloudeminer.com/genesis"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Binance Mining",
              "item": "https://freecloudeminer.com/binance"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Coinbase Mining",
              "item": "https://freecloudeminer.com/coinbase"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Bitcoin Mining Calculator",
              "item": "https://freecloudeminer.com/calculator"
            },
            {
              "@type": "ListItem",
              "position": 7,
              "name": "Dogecoin Mining",
              "item": "https://freecloudeminer.com/dogecoin"
            },
            {
              "@type": "ListItem",
              "position": 8,
              "name": "Litecoin Mining",
              "item": "https://freecloudeminer.com/litecoin"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};
