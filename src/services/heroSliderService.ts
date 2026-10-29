// src/services/heroSliderService.ts

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return [
    {
      id: 'slide-1',
      subtitle: 'Welcome to',
      title: 'WinterCart.com',
      description: 'Premium heavyweight winter wear, authentic biker leather jackets, and cozy thermal collections.',
      image: '/images/slides/slide-jacket-1.png',
      buttonText: 'Shop Now',
      link: '/products'
    },
    {
      id: 'slide-2',
      subtitle: 'New Arrival',
      title: 'Mens Cotton Jacket',
      description: 'Wind-resistant rugged exterior with soft inner lining engineered for cold winter breezes.',
      image: '/images/slides/slide-jacket-2.png',
      buttonText: 'Shop Now',
      link: '/products?category=jackets'
    },
    {
      id: 'slide-3',
      subtitle: 'Winter Warmth',
      title: 'Snowboard Winter Coat',
      description: 'Multi-layer thermal insulation keeping you snug and protected through chilly winter nights.',
      image: '/images/slides/slide-jacket-3.png',
      buttonText: 'Shop Now',
      link: '/products?category=jackets'
    },
    {
      id: 'slide-4',
      subtitle: 'Everyday Classic',
      title: 'Casual Slim Fit Layer',
      description: 'Soft breathable cotton base layer designed for effortless styling under winter jackets.',
      image: '/images/slides/slide-shirt-4.png',
      buttonText: 'Shop Now',
      link: '/products?category=hoodies'
    },
    {
      id: 'slide-5',
      subtitle: 'Essential Knitwear',
      title: 'Slim Fit Knit Pullover',
      description: 'Warm textured weave with snug ribbed cuffs for effortless layering during casual winter outings.',
      image: '/images/slides/slide-sweater-5.png',
      buttonText: 'Shop Now',
      link: '/products?category=sweaters'
    },
    {
      id: 'slide-6',
      subtitle: 'All-Weather Protection',
      title: 'Striped Climbing Windbreaker',
      description: 'Water-resistant storm shell with adjustable hood designed for active winter expeditions.',
      image: '/images/slides/slide-windbreaker-6.png',
      buttonText: 'Shop Now',
      link: '/products?category=jackets'
    },
    {
      id: 'slide-7',
      subtitle: 'Feminine Winter Line',
      title: 'Soft Ribbed Knit Top',
      description: 'Elegant contoured silhouette crafted with premium thermal cotton for all-day comfort.',
      image: '/images/slides/slide-top-7.png',
      buttonText: 'Shop Now',
      link: '/products?category=sweaters'
    },
    {
      id: 'slide-8',
      subtitle: 'Performance Gear',
      title: 'Thermal Base Layer',
      description: 'Moisture-wicking athletic fit that traps body heat while keeping you dry and agile.',
      image: '/images/slides/slide-sport-8.png',
      buttonText: 'Shop Now',
      link: '/products?category=thermal'
    },
    {
      id: 'slide-9',
      subtitle: 'Urban Streetwear',
      title: 'Casual Graphic Cotton Tee',
      description: 'Heavyweight organic cotton tee featuring signature minimalist aesthetic and relaxed drape.',
      image: '/images/slides/slide-tshirt-9.png',
      buttonText: 'Shop Now',
      link: '/products?category=hoodies'
    }
  ];
}
