// scripts/generate-blog.cjs - UPDATED WITH 100+ SEO KEYWORDS
const fs = require('fs');
const path = require('path');
const https = require('https');

// COMPREHENSIVE SEO KEYWORDS - 100+ keywords for high traffic
const KEYWORDS = [
  // Existing keywords
  'free cloud mining',
  'bitcoin cloud mining free',
  'cloud miner free',
  'online cloud mining free',
  'mining cloud free',
  'cloud mining bitcoin free',
  'free bitcoin mining',
  'free mining website',
  
  // Primary Keywords (High Volume)
  'bitcoin mining calculator',
  'bitcoin mining app',
  'cloud mining platforms',
  'bitcoin cloud mining',
  'crypto mining calculator',
  
  // Secondary Keywords (Medium-High Volume)
  'how does mining bitcoin work',
  'bitmain antminer',
  'altcoin asic miner',
  'bitcoin mining profitability',
  'cloud mining services',
  'bitcoin wallet',
  'proof of work pow',
  'passive income cryptocurrency',
  
  // Long-tail Keywords (Targeted Traffic)
  'bitcoin mining for beginners',
  'how long to mine one bitcoin',
  'free trial cloud mining',
  'instant bitcoin mining',
  'cloud mining contracts',
  'no term contract mining',
  
  // Technical Keywords
  'expensive hardware mining',
  'high electricity costs mining',
  'asic miner profitability',
  'mining rig setup',
  'gpu mining vs asic mining',
  'bitcoin mining difficulty',
  'mining pool comparison',
  'cryptocurrency mining guide',
  'mining hash rate explained',
  'blockchain mining process',
  
  // Service-related Keywords
  'best cloud mining platforms',
  'cloud mining reviews',
  'legit cloud mining sites',
  'trusted cloud mining',
  'cloud mining comparison',
  'top bitcoin mining sites',
  'reliable cloud mining',
  'verified cloud mining platforms',
  
  // Feature Keywords
  'real time mining monitoring',
  'simple interface mining',
  'user friendly crypto platform',
  'cutting edge mining technology',
  'digital assets management',
  'bitcoin mining dashboard',
  'mining profitability tracker',
  'automated mining platform',
  'cloud mining calculator',
  
  // Comparison Keywords
  'cloud mining vs traditional mining',
  'bitcoin vs ethereum mining',
  'best mining method 2025',
  'cloud mining or hardware mining',
  'crypto exchange mining',
  'pool mining vs solo mining',
  'asic vs gpu mining',
  
  // Tutorial Keywords
  'start bitcoin mining tutorial',
  'cloud mining step by step',
  'mining without technical expertise',
  'beginner bitcoin mining guide',
  'setup cloud mining account',
  'how to start crypto mining',
  'bitcoin mining walkthrough',
  'cloud mining for dummies',
  
  // Security Keywords
  'secure bitcoin mining',
  'cloud mining security',
  'protect mining earnings',
  'mining scam prevention',
  '2fa bitcoin mining',
  'safe cloud mining platforms',
  'bitcoin mining safety tips',
  'avoid mining scams',
  
  // Profit Keywords
  'bitcoin mining earnings',
  'daily mining payouts',
  'passive income mining',
  'earn bitcoin online',
  'mining roi calculator',
  'bitcoin mining profit 2025',
  'cryptocurrency earning methods',
  'mining income calculator',
  'bitcoin mining revenue',
  
  // Equipment Keywords
  'antminer s19 pro',
  'whatsminer m30s',
  'avalon miner',
  'mining hardware comparison',
  'best asic miner 2025',
  'mining equipment guide',
  'asic miner reviews',
  'bitcoin mining machines',
  'antminer profitability',
  
  // Cost Keywords
  'mining electricity calculator',
  'mining cost analysis',
  'free cloud mining no deposit',
  'zero investment mining',
  'cheap cloud mining',
  'affordable bitcoin mining',
  'low cost mining solutions',
  'mining electricity costs',
  
  // Market Keywords
  'bitcoin price mining impact',
  'crypto market mining trends',
  'mining difficulty analysis',
  'halving impact on mining',
  'bitcoin mining forecast 2025',
  'cryptocurrency market trends',
  'bitcoin mining economics',
  'mining industry outlook',
  
  // Additional High-Value Keywords
  'bitcoin mining rewards',
  'mining pool fees',
  'cloud mining contracts explained',
  'bitcoin network hashrate',
  'mining profitability 2025',
  'cryptocurrency mining strategies',
  'bitcoin mining optimization',
  'cloud mining roi',
  'mining payout methods',
  'bitcoin mining pools comparison'
];

const CATEGORIES = ['beginner', 'advanced', 'security', 'market', 'tutorial'];

function fetchData(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ 
            ok: res.statusCode === 200, 
            json: () => Promise.resolve(JSON.parse(data)) 
          });
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function generateBlogPost() {
  console.log('🎬 Blog üretimi başlatılıyor...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY bulunamadı!');
    process.exit(1);
  }

  const keyword = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  console.log('🚀 Blog yazısı üretiliyor...');
  console.log('📝 Anahtar kelime:', keyword);
  console.log('📂 Kategori:', category);
  console.log('📊 Toplam anahtar kelime havuzu:', KEYWORDS.length);

  const prompt = `Write a comprehensive, SEO-optimized blog post about "${keyword}" for 2025. 

CRITICAL REQUIREMENTS:
1. Write in PERFECT PROFESSIONAL ENGLISH (native-level quality)
2. SEO OPTIMIZATION: Natural keyword placement (8-12 times)
3. GOOGLE RICH CONTENT FORMAT for featured snippets
4. Professional, trustworthy tone
5. Accurate technical information
6. 2000-2500 words

CRITICAL FORMAT: Use this EXACT delimiter format:

---TITLE---
SEO-optimized title (60 chars max) including "${keyword}"
---SLUG---
url-friendly-slug
---EXCERPT---
Compelling 150-160 character meta description with primary keyword
---CONTENT---
<div class="blog-content">

<div class="intro-section">
<p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
<p>[Write engaging 2-3 paragraph introduction with primary keyword and hook]</p>
</div>

<div class="table-of-contents">
<h2>📋 Table of Contents</h2>
<ul>
<li><a href="#section1">Section 1 Title</a></li>
<li><a href="#section2">Section 2 Title</a></li>
<li><a href="#section3">Section 3 Title</a></li>
<li><a href="#section4">Section 4 Title</a></li>
<li><a href="#section5">Section 5 Title</a></li>
</ul>
</div>

<div class="main-content">

<h2 id="section1">Main Section Title</h2>
<p>[Detailed content with natural keyword placement]</p>

<div class="highlight-box">
<strong>💡 Pro Tip:</strong> Important insight
</div>

<h3>Subsection Title</h3>
<p>[Detailed explanation]</p>
<ul>
<li><strong>Point 1:</strong> Details</li>
<li><strong>Point 2:</strong> Details</li>
<li><strong>Point 3:</strong> Details</li>
</ul>

<div class="stats-box">
<h4>📊 Key Statistics (2025)</h4>
<ul>
<li>Statistic 1 with source</li>
<li>Statistic 2 with source</li>
<li>Statistic 3 with source</li>
</ul>
</div>

[Continue with 5-6 main sections (H2) with subsections (H3)]

<div class="comparison-table">
<h3>📊 Comparison Table</h3>
<table>
<thead>
<tr><th>Feature</th><th>Option 1</th><th>Option 2</th><th>Option 3</th></tr>
</thead>
<tbody>
<tr><td>Feature 1</td><td>Details</td><td>Details</td><td>Details</td></tr>
<tr><td>Feature 2</td><td>Details</td><td>Details</td><td>Details</td></tr>
</tbody>
</table>
</div>

<div class="cta-box">
<h3>🚀 Ready to Start Mining?</h3>
<p>Join thousands earning cryptocurrency daily with our platform.</p>
<a href="/calculator" class="cta-button">Try Our Mining Calculator</a>
</div>

<h2 id="conclusion">Conclusion</h2>
<p>[Comprehensive conclusion with call-to-action]</p>

</div>

</div>
---KEYWORDS---
${keyword}, bitcoin mining, cloud mining, cryptocurrency, blockchain, mining profitability, digital assets, crypto mining
---FAQ---
Q: [Question about ${keyword}]? | A: [Detailed 2-3 sentence answer with data]
Q: [Profitability question]? | A: [Answer with numbers/stats]
Q: [Security question]? | A: [Detailed safety answer]
Q: [Technical question]? | A: [Clear technical explanation]
Q: [Beginner question]? | A: [Simple, helpful answer]
---END---

CONTENT REQUIREMENTS:
✅ 2000-2500 words
✅ Professional English (no errors)
✅ Include 2-3 comparison tables
✅ Add 6-8 highlight boxes
✅ Include statistics with sources
✅ Use bullet points for readability
✅ Add 2 CTA boxes
✅ Table of Contents with links
✅ Semantic HTML structure
✅ Featured snippet format
✅ Real examples and data
✅ Professional, trustworthy tone

SEO OPTIMIZATION:
- Primary keyword in title, intro, conclusion
- Natural keyword placement throughout
- Answer common questions directly
- Use numbers and data
- Include 2025 for freshness
- Meta description with keyword

DO NOT:
❌ Overly promotional language
❌ Unrealistic claims
❌ Include images/img tags
❌ Poor structure
❌ Keyword stuffing
❌ Skip FAQ section

Write the complete blog post using EXACT delimiter format.`;

  try {
    console.log('🤖 Gemini API çağrılıyor...');
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetchData(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    const data = await response.json();
    
    console.log('🔍 API Yanıt Durumu:', response.ok);
    
    if (!response.ok || data.error) {
      console.error('❌ API Hatası:', JSON.stringify(data, null, 2));
      throw new Error(`Gemini API hatası: ${data.error?.message || 'Bilinmeyen hata'}`);
    }
    
    if (!data.candidates || !data.candidates[0]) {
      console.error('❌ Geçersiz API yanıtı:', JSON.stringify(data, null, 2));
      throw new Error('Geçersiz API yanıtı');
    }
    
    const text = data.candidates[0].content.parts[0].text;
    
    console.log('📄 API yanıtı alındı');
    console.log('📏 Yanıt uzunluğu:', text.length, 'karakter');
    
    // Delimiter format ile parse et
    const titleMatch = text.match(/---TITLE---\s*(.*?)\s*---SLUG---/s);
    const slugMatch = text.match(/---SLUG---\s*(.*?)\s*---EXCERPT---/s);
    const excerptMatch = text.match(/---EXCERPT---\s*(.*?)\s*---CONTENT---/s);
    const contentMatch = text.match(/---CONTENT---\s*(.*?)\s*---KEYWORDS---/s);
    const keywordsMatch = text.match(/---KEYWORDS---\s*(.*?)\s*---FAQ---/s);
    const faqMatch = text.match(/---FAQ---\s*(.*?)\s*---END---/s);
    
    if (!titleMatch || !slugMatch || !excerptMatch || !contentMatch || !keywordsMatch) {
      console.error('❌ Gerekli field\'lar bulunamadı');
      console.log('Title:', !!titleMatch);
      console.log('Slug:', !!slugMatch);
      console.log('Excerpt:', !!excerptMatch);
      console.log('Content:', !!contentMatch);
      console.log('Keywords:', !!keywordsMatch);
      console.error('İlk 1000 karakter:', text.substring(0, 1000));
      throw new Error('Field\'lar bulunamadı');
    }
    
    // FAQ parse et with schema markup
    let faqContent = '';
    if (faqMatch) {
      const faqLines = faqMatch[1].trim().split('\n').filter(line => line.trim());
      faqContent = '<div class="faq-section"><h2>❓ Frequently Asked Questions</h2>';
      faqLines.forEach(line => {
        const match = line.match(/Q:\s*(.*?)\s*\|\s*A:\s*(.*)/);
        if (match) {
          const question = match[1].trim();
          const answer = match[2].trim();
          faqContent += `<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">${question}</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">${answer}</p>
            </div>
          </div>`;
        }
      });
      faqContent += '</div>';
    }
    
    const blogData = {
      title: titleMatch[1].trim(),
      slug: slugMatch[1].trim(),
      excerpt: excerptMatch[1].trim(),
      content: contentMatch[1].trim() + faqContent,
      keywords: keywordsMatch[1].trim().split(',').map(k => k.trim()).filter(k => k)
    };
    
    console.log('✅ İçerik parse edildi:', blogData.title);

    // Calculate read time
    const wordCount = blogData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const newPost = {
      id: Date.now(),
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      author: 'FreeCloudMiner Team',
      publishDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: `${readTime} min read`,
      category: category,
      image: '/images/blog/default.jpg',
      keywords: blogData.keywords
    };

    const filePath = path.join(__dirname, '../src/data/blogPosts.ts');
    
    console.log('📁 Dosya okunuyor:', filePath);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Dosya bulunamadı: ${filePath}`);
    }
    
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Güvenli format - JSON.stringify tüm escape işlemlerini halleder
    const postJS = `  {
    id: ${newPost.id},
    title: ${JSON.stringify(newPost.title)},
    slug: ${JSON.stringify(newPost.slug)},
    excerpt: ${JSON.stringify(newPost.excerpt)},
    content: ${JSON.stringify(newPost.content)},
    author: ${JSON.stringify(newPost.author)},
    publishDate: ${JSON.stringify(newPost.publishDate)},
    readTime: ${JSON.stringify(newPost.readTime)},
    category: ${JSON.stringify(newPost.category)},
    image: ${JSON.stringify(newPost.image)},
    keywords: ${JSON.stringify(newPost.keywords)}
  }`;

    fileContent = fileContent.replace(
      'export const blogPosts: BlogPost[] = [',
      `export const blogPosts: BlogPost[] = [\n${postJS},`
    );

    fs.writeFileSync(filePath, fileContent, 'utf-8');

    console.log('\n✅ ═══════════════════════════════════════════════════════');
    console.log('🎉 BLOG YAZISI BAŞARIYLA OLUŞTURULDU!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📝 Başlık:', newPost.title);
    console.log('🔗 Slug:', newPost.slug);
    console.log('📂 Kategori:', newPost.category);
    console.log('📖 Okuma Süresi:', newPost.readTime);
    console.log('📊 Kelime Sayısı:', wordCount);
    console.log('🎯 Ana Anahtar Kelime:', keyword);
    console.log('🔑 Toplam Anahtar Kelime:', newPost.keywords.length);
    console.log('📅 Yayın Tarihi:', newPost.publishDate);
    console.log('═══════════════════════════════════════════════════════\n');
    
    return newPost;

  } catch (error) {
    console.error('❌ Hata oluştu:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

console.log('🎬 Blog üretimi başlatılıyor...');
console.log('📊 Anahtar kelime havuzu:', KEYWORDS.length, 'keyword');
generateBlogPost().then(() => {
  console.log('🎉 İşlem tamamlandı!');
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
