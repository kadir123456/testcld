import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.freecloudminer.com';

// Blog verilerini import et
function getBlogPosts() {
  try {
    const blogFilePath = path.join(process.cwd(), 'src/data/blogPosts.ts');
    
    if (!fs.existsSync(blogFilePath)) {
      console.log('⚠️ Blog post dosyası bulunamadı:', blogFilePath);
      return [];
    }
    
    const blogFile = fs.readFileSync(blogFilePath, 'utf8');
    
    // TypeScript dosyasından blog postlarını parse et
    const blogMatch = blogFile.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
    
    if (!blogMatch) {
      console.log('⚠️ Blog postları bulunamadı.');
      return [];
    }
    
    const postsText = blogMatch[1];
    const posts = [];
    
    // Her blog post objesi için slug ve publishDate çek
    const postMatches = postsText.matchAll(/\{[\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?publishDate:\s*["']([^"']+)["'][\s\S]*?\}/g);
    
    for (const match of postMatches) {
      posts.push({
        slug: match[1],
        publishDate: match[2]
      });
    }
    
    console.log(`✅ ${posts.length} blog yazısı bulundu`);
    return posts;
  } catch (error) {
    console.error('❌ Blog postları okunurken hata:', error);
    return [];
  }
}

// Tarih formatını düzenle (örn: "15 Mart 2025" veya "October 13, 2025" -> "2025-03-15")
function parseDate(dateStr) {
  try {
    // Eğer tarih zaten YYYY-MM-DD formatındaysa direkt döndür
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    const months = {
      'ocak': '01', 'şubat': '02', 'mart': '03', 'nisan': '04',
      'mayıs': '05', 'mayis': '05', 'haziran': '06', 'temmuz': '07', 
      'ağustos': '08', 'agustos': '08', 'eylül': '09', 'eylul': '09', 
      'ekim': '10', 'kasım': '11', 'kasim': '11', 'aralık': '12', 'aralik': '12',
      'january': '01', 'february': '02', 'march': '03', 'april': '04',
      'may': '05', 'june': '06', 'july': '07', 'august': '08',
      'september': '09', 'october': '10', 'november': '11', 'december': '12',
      'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
      'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 
      'oct': '10', 'nov': '11', 'dec': '12'
    };
    
    const parts = dateStr.trim().split(/[\s,]+/).filter(p => p);
    
    if (parts.length >= 3) {
      let day, month, year;
      
      // Format 1: "October 13, 2025" veya "October 13 2025"
      // Format 2: "13 Ekim 2025" veya "13 Mart 2025"
      
      // İlk part sayı mı kontrol et
      if (/^\d+$/.test(parts[0])) {
        // Format 2: Gün ay yıl (13 Ekim 2025)
        day = parts[0].padStart(2, '0');
        month = months[parts[1].toLowerCase()] || '01';
        year = parts[2];
      } else {
        // Format 1: Ay gün yıl (October 13, 2025)
        month = months[parts[0].toLowerCase()] || '01';
        day = parts[1].replace(',', '').padStart(2, '0');
        year = parts[2].replace(',', '');
      }
      
      // Tarih validasyonu
      const dateObj = new Date(`${year}-${month}-${day}`);
      if (!isNaN(dateObj.getTime())) {
        return `${year}-${month}-${day}`;
      }
    }
    
    // Parse edilemezse bugünün tarihini döndür
    console.warn(`⚠️ Tarih parse edilemedi: "${dateStr}", bugünün tarihi kullanılıyor`);
    return new Date().toISOString().split('T')[0];
    
  } catch (error) {
    console.error(`❌ Tarih parse hatası: "${dateStr}"`, error);
    return new Date().toISOString().split('T')[0];
  }
}

// Statik PUBLIC sayfalar (Sitemap'e eklenecek)
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'daily', priority: '0.9' },
  { url: '/calculator', changefreq: 'weekly', priority: '0.8' },
  { url: '/news', changefreq: 'daily', priority: '0.8' },
  { url: '/market', changefreq: 'hourly', priority: '0.8' },
  { url: '/how-mining-works', changefreq: 'monthly', priority: '0.7' },
  { url: '/mining-packages', changefreq: 'weekly', priority: '0.7' },
];

// NOT: /auth, /dashboard, /mining, /packages, /profile, /admin, /withdrawal, /support
// gibi protected sayfalar sitemap'e EKLENMEDİ (robots.txt'te disallow)

// Blog yazılarını ekle
const blogPosts = getBlogPosts();
const blogUrls = blogPosts.map(post => ({
  url: `/blog/${post.slug}`,
  changefreq: 'weekly',
  priority: '0.8',
  lastmod: parseDate(post.publishDate)
}));

// Tüm URL'leri birleştir
const allPages = [...staticPages, ...blogUrls];

// Sitemap XML oluştur
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// public klasörüne yaz (dist değil!)
const outputDir = path.join(process.cwd(), 'public');

// public klasörü yoksa oluştur
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);

console.log(`\n✅ Sitemap başarıyla oluşturuldu!`);
console.log(`📊 Toplam ${allPages.length} sayfa eklendi:`);
console.log(`  - ${staticPages.length} statik sayfa`);
console.log(`  - ${blogUrls.length} blog yazısı`);
console.log(`\n🔗 Sitemap dosyası: public/sitemap.xml`);
console.log(`📍 Sitemap URL: ${baseUrl}/sitemap.xml\n`);
