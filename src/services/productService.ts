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

// 3. Featured Products Grid Data
export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 'prod-101',
      title: 'Over-Sized Fleece Streetwear Hoodie',
      category: 'Hoodies',
      price: 1350,
      originalPrice: 1800,
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 128,
      badge: 'Best Seller',
      isFeatured: true
    },
    {
      id: 'prod-102',
      title: 'Biker Style Slim Leather Jacket',
      category: 'Jackets',
      price: 3500,
      originalPrice: 4500,
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 94,
      badge: 'Trending',
      isFeatured: true
    },
    {
      id: 'prod-103',
      title: 'Women Buttoned Knit Cardigan',
      category: 'Sweaters',
      price: 1550,
      originalPrice: 1950,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.7,
      reviewCount: 62,
      isFeatured: true
    },
    {
      id: 'prod-104',
      title: 'Ultra-Warm Seamless Thermal Set',
      category: 'Thermal',
      price: 890,
      originalPrice: 1200,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 210,
      badge: 'Hot Deal',
      isFeatured: true
    },
    {
      id: 'prod-105',
      title: 'Traditional Kashmiri Embroidered Shawl',
      category: 'Shawls',
      price: 2200,
      originalPrice: 2800,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewCount: 51,
      badge: 'Premium',
      isFeatured: true
    },
    {
      id: 'prod-106',
      title: 'Lightweight Padded Winter Vest',
      category: 'Jackets',
      price: 1750,
      originalPrice: 2200,
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.6,
      reviewCount: 43,
      badge: 'Popular',
      isFeatured: true
    },
    {
      id: 'prod-107',
      title: 'High-Neck Woolen Turtleneck Sweater',
      category: 'Sweaters',
      price: 1290,
      originalPrice: 1700,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 88,
      isFeatured: true
    },
    {
      id: 'prod-108',
      title: 'Zippered Track Fleece Sweatshirt',
      category: 'Hoodies',
      price: 1150,
      originalPrice: 1500,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.7,
      reviewCount: 76,
      badge: 'Winter Pick',
      isFeatured: true
    }
  ];
}


// 4. Get Single Product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
