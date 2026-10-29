// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { getProducts } from '../services/productService';

export const GET: APIRoute = async () => {
  const products = await getProducts();
  const siteUrl = 'https://e-commerce-astro-five.vercel.app';
  
  const staticPages = [
    '',
    '/products',
    '/about',
    '/contact',
    '/track-order',
    '/size-guide',
    '/privacy-policy',
    '/terms-of-service',
    '/return-policy',
  ];

  const productPages = products.map((p) => `/products/${p.id}`);
  const allUrls = [...staticPages, ...productPages];
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === '' ? 'daily' : url.startsWith('/products') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/products') ? '0.8' : '0.5'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

