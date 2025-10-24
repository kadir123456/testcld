// scripts/generate-news-summary.cjs - AUTO NEWS SUMMARY WITH GEMINI
const fs = require('fs');
const path = require('path');
const https = require('https');

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

async function generateNewsSummary() {
  console.log('📰 Kripto Haber Özeti Üretiliyor...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY bulunamadı!');
    process.exit(1);
  }

  try {
    // 1. CryptoPanic API'den son haberleri çek
    console.log('📡 CryptoPanic API çağrılıyor...');
    const newsResponse = await fetchData(
      'https://cryptopanic.com/api/v1/posts/?auth_token=free&kind=news&filter=hot',
      { method: 'GET' }
    );
    const newsData = await newsResponse.json();
    const topNews = newsData.results?.slice(0, 10) || [];

    console.log(`✅ ${topNews.length} haber alındı`);

    // 2. Haberleri Gemini ile özetle
    console.log('🤖 Gemini ile özetleniyor...');

    const newsText = topNews.map((news, i) => 
      `${i + 1}. ${news.title}\nSource: ${news.source?.title}\nURL: ${news.url}\n`
    ).join('\n');

    const prompt = `You are a professional cryptocurrency news analyst. Analyze these top crypto news articles and create a comprehensive daily summary.

TODAY'S TOP CRYPTO NEWS:
${newsText}

Create a professional daily news summary with:

1. **MARKET OVERVIEW** (2-3 sentences)
   - Overall market sentiment
   - Major price movements
   - Key trends

2. **TOP STORIES** (3-5 main stories)
   - Brief summary of each major story
   - Why it matters
   - Potential impact

3. **MINING & TECHNOLOGY** (if relevant)
   - Mining difficulty changes
   - New technology developments
   - Infrastructure updates

4. **REGULATORY & INSTITUTIONAL** (if relevant)
   - Government actions
   - Institutional adoption
   - Policy changes

5. **KEY TAKEAWAYS** (3-5 bullet points)
   - What investors should know
   - Important trends to watch
   - Risk factors

Format as HTML with:
- <h2> for main sections
- <h3> for subsections
- <p> for paragraphs
- <ul><li> for lists
- <strong> for emphasis

Make it:
- Professional and objective
- Easy to read
- Actionable insights
- SEO-friendly
- Include relevant keywords: bitcoin, cryptocurrency, mining, blockchain

Write in PERFECT ENGLISH with no errors.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await fetchData(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiResponse.ok || geminiData.error) {
      throw new Error(`Gemini API hatası: ${geminiData.error?.message || 'Bilinmeyen hata'}`);
    }

    const summary = geminiData.candidates[0].content.parts[0].text;

    // 3. Özeti dosyaya kaydet
    const summaryData = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      timestamp: new Date().toISOString(),
      summary: summary,
      sources: topNews.map(news => ({
        title: news.title,
        url: news.url,
        source: news.source?.title
      }))
    };

    const summaryPath = path.join(__dirname, '../src/data/newsSummaries.ts');
    
    let fileContent;
    if (fs.existsSync(summaryPath)) {
      fileContent = fs.readFileSync(summaryPath, 'utf-8');
    } else {
      fileContent = `// Auto-generated news summaries
export interface NewsSummary {
  id: number;
  date: string;
  timestamp: string;
  summary: string;
  sources: Array<{ title: string; url: string; source: string }>;
}

export const newsSummaries: NewsSummary[] = [];
`;
    }

    const summaryJS = `  {
    id: ${summaryData.id},
    date: ${JSON.stringify(summaryData.date)},
    timestamp: ${JSON.stringify(summaryData.timestamp)},
    summary: ${JSON.stringify(summaryData.summary)},
    sources: ${JSON.stringify(summaryData.sources)}
  }`;

    fileContent = fileContent.replace(
      'export const newsSummaries: NewsSummary[] = [',
      `export const newsSummaries: NewsSummary[] = [\n${summaryJS},`
    );

    fs.writeFileSync(summaryPath, fileContent, 'utf-8');

    console.log('\n✅ ═══════════════════════════════════════════════════════');
    console.log('🎉 HABER ÖZETİ BAŞARIYLA OLUŞTURULDU!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📅 Tarih:', summaryData.date);
    console.log('📰 Haber Sayısı:', topNews.length);
    console.log('📝 Özet Uzunluğu:', summary.length, 'karakter');
    console.log('═══════════════════════════════════════════════════════\n');

    return summaryData;

  } catch (error) {
    console.error('❌ Hata:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

generateNewsSummary().then(() => {
  console.log('✅ İşlem tamamlandı!');
  process.exit(0);
}).catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
