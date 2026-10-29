// src/services/productService.ts

export interface Product {
  id: string;
  title: string;
  category: 'Hoodies' | 'Jackets' | 'Sweaters' | 'Thermal' | 'Shawls';
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  showInHeroBanner?: boolean;
  heroSubtitle?: string;
  description?: string;
  inStock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  slug: string;
}

export interface RackBannerItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discountText: string;
  features: string[];
}

// 1. Interactive Clothing Rack Banner Data (Backend editable)
export async function getRackBannerItems(): Promise<RackBannerItem[]> {
  return [
    {
      id: 'rack-1',
      title: 'Heavy Fleece Winter Hoodie',
      category: 'Hoodies',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      price: 1250,
      originalPrice: 1600,
      discountText: '22% OFF',
      features: ['350 GSM Fleece', 'Kangaroo Pocket']
    },
    {
      id: 'rack-2',
      title: 'Classic Leather Bomber Jacket',
      category: 'Jackets',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      price: 3200,
      originalPrice: 4000,
      discountText: '19% OFF',
      features: ['100% Leather', 'Silk Lining']
    },
    {
      id: 'rack-3',
      title: 'Knitted Woolen Cardigan',
      category: 'Sweaters',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      price: 1450,
      originalPrice: 1900,
      discountText: '23% OFF',
      features: ['Pure Wool', 'Soft Touch']
    },
    {
      id: 'rack-4',
      title: 'Thermal Innerwear Set',
      category: 'Thermal',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      price: 850,
      originalPrice: 1100,
      discountText: '20% OFF',
      features: ['Heat-Lock', 'Body Fit']
    },
    {
      id: 'rack-5',
      title: 'Cashmere Winter Shawl',
      category: 'Shawls',
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
      price: 950,
      originalPrice: 1300,
      discountText: '25% OFF',
      features: ['Ultra Soft', 'Lightweight']
    }
  ];
}

// 2. Winter Categories Data
export async function getCategories(): Promise<Category[]> {
  return [
    { id: 'cat-1', name: 'Hoodies & Sweatshirts', itemCount: 42, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', slug: 'hoodies' },
    { id: 'cat-2', name: 'Jackets & Coats', itemCount: 35, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80', slug: 'jackets' },
    { id: 'cat-3', name: 'Sweaters & Cardigans', itemCount: 28, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80', slug: 'sweaters' },
    { id: 'cat-4', name: 'Thermal & Base Layers', itemCount: 19, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80', slug: 'thermal' },
    { id: 'cat-5', name: 'Shawls & Winter Wraps', itemCount: 24, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=400&q=80', slug: 'shawls' },
  ];
}

// 3. Complete Store Product Catalog
// Hero banners are directly driven by products with showInHeroBanner = true
export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 'prod-101',
      title: 'WinterCart Signature Leather Biker Jacket',
      category: 'Jackets',
      price: 3450,
      originalPrice: 4600,
      image: '/images/slides/slide-jacket-1.png',
      images: [
        '/images/slides/slide-jacket-1.png',
        'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 142,
      badge: 'Best Seller',
      isFeatured: true,
      isTrending: true,
      showInHeroBanner: true,
      heroSubtitle: 'Welcome to WinterCart',
      description: 'Premium heavyweight winter wear, authentic biker leather jackets, and cozy thermal collections engineered for cold winds.',
      inStock: true
    },
    {
      id: 'prod-102',
      title: 'Mens Heavy Cotton Utility Jacket',
      category: 'Jackets',
      price: 2850,
      originalPrice: 3600,
      image: '/images/slides/slide-jacket-2.png',
      images: [
        '/images/slides/slide-jacket-2.png',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 96,
      badge: 'New Arrival',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'New Arrival',
      description: 'Wind-resistant rugged exterior with soft inner lining engineered for cold winter breezes and urban commuting.',
      inStock: true
    },
    {
      id: 'prod-103',
      title: 'Snowboard Insulated Winter Coat',
      category: 'Jackets',
      price: 3800,
      originalPrice: 4800,
      image: '/images/slides/slide-jacket-3.png',
      images: [
        '/images/slides/slide-jacket-3.png',
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 118,
      badge: 'Winter Warmth',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Winter Warmth',
      description: 'Multi-layer thermal insulation keeping you snug and protected through chilly winter nights and foggy mornings.',
      inStock: true
    },
    {
      id: 'prod-104',
      title: 'Casual Slim Fit Thermal Base Layer',
      category: 'Hoodies',
      price: 1250,
      originalPrice: 1650,
      image: '/images/slides/slide-shirt-4.png',
      images: [
        '/images/slides/slide-shirt-4.png',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.7,
      reviewCount: 78,
      badge: 'Everyday Classic',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Everyday Classic',
      description: 'Soft breathable cotton base layer designed for effortless styling under winter coats and leather jackets.',
      inStock: true
    },
    {
      id: 'prod-105',
      title: 'Slim Fit Textured Knit Pullover',
      category: 'Sweaters',
      price: 1650,
      originalPrice: 2200,
      image: '/images/slides/slide-sweater-5.png',
      images: [
        '/images/slides/slide-sweater-5.png',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 84,
      badge: 'Essential Knitwear',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Essential Knitwear',
      description: 'Warm textured weave with snug ribbed cuffs for effortless layering during casual winter outings and office wear.',
      inStock: true
    },
    {
      id: 'prod-106',
      title: 'Striped Climbing Mountain Windbreaker',
      category: 'Jackets',
      price: 2600,
      originalPrice: 3400,
      image: '/images/slides/slide-windbreaker-6.png',
      images: [
        '/images/slides/slide-windbreaker-6.png',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 92,
      badge: 'All-Weather',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'All-Weather Protection',
      description: 'Water-resistant storm shell with adjustable drawstring hood designed for active winter expeditions and damp breezes.',
      inStock: true
    },
    {
      id: 'prod-107',
      title: 'Soft Ribbed Knit Cashmere Top',
      category: 'Sweaters',
      price: 1450,
      originalPrice: 1950,
      image: '/images/slides/slide-top-7.png',
      images: [
        '/images/slides/slide-top-7.png',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 65,
      badge: 'Feminine Line',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Feminine Winter Line',
      description: 'Elegant contoured silhouette crafted with premium thermal cotton for all-day comfort and luxurious softness.',
      inStock: true
    },
    {
      id: 'prod-108',
      title: 'Pro-Thermal Heat-Lock Athletic Set',
      category: 'Thermal',
      price: 990,
      originalPrice: 1350,
      image: '/images/slides/slide-sport-8.png',
      images: [
        '/images/slides/slide-sport-8.png',
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 156,
      badge: 'Performance Gear',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Performance Gear',
      description: 'Moisture-wicking athletic fit that traps body heat while keeping you dry, agile, and protected from frost.',
      inStock: true
    },
    {
      id: 'prod-109',
      title: 'Heavyweight Minimalist Graphic Cotton Tee',
      category: 'Hoodies',
      price: 850,
      originalPrice: 1200,
      image: '/images/slides/slide-tshirt-9.png',
      images: [
        '/images/slides/slide-tshirt-9.png',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.7,
      reviewCount: 88,
      badge: 'Urban Streetwear',
      isFeatured: true,
      showInHeroBanner: true,
      heroSubtitle: 'Urban Streetwear',
      description: 'Heavyweight 280 GSM organic cotton tee featuring signature minimalist aesthetic, relaxed drape, and ribbed neckband.',
      inStock: true
    },
    {
      id: 'prod-110',
      title: 'Over-Sized Fleece Streetwear Hoodie',
      category: 'Hoodies',
      price: 1350,
      originalPrice: 1800,
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 128,
      badge: 'Best Seller',
      isFeatured: true,
      showInHeroBanner: false,
      description: 'Extra plush 350 GSM fleece hoodie with double-lined drawstring hood and reinforced ribbed hem.',
      inStock: true
    },
    {
      id: 'prod-111',
      title: 'Traditional Kashmiri Embroidered Shawl',
      category: 'Shawls',
      price: 2200,
      originalPrice: 2800,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 51,
      badge: 'Premium',
      isFeatured: true,
      showInHeroBanner: false,
      description: 'Handwoven soft pashmina blend shawl adorned with intricate heritage needlework embroidery.',
      inStock: true
    },
    {
      id: 'prod-112',
      title: 'Lightweight Padded Winter Vest',
      category: 'Jackets',
      price: 1750,
      originalPrice: 2200,
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.6,
      reviewCount: 43,
      badge: 'Popular',
      isFeatured: true,
      showInHeroBanner: false,
      description: 'Featherlight quilted body warmer vest with zip pockets, providing core insulation without arm restriction.',
      inStock: true
    }
  ];
}

// 4. Get Single Product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
