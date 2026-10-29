// src/services/heroSliderService.ts
import { getProducts } from './productService';

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  description?: string;
  image: string;
  price?: number;
  originalPrice?: number;
  buttonText?: string;
  link: string;
}

/**
 * Hero slides are derived directly from store products marked with showInHeroBanner = true.
 * Clicking a slide or its CTA navigates straight to that product's details page (/products/[id]).
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const products = await getProducts();
  const bannerProducts = products.filter((p) => p.showInHeroBanner);

  return bannerProducts.map((p) => ({
    id: p.id,
    subtitle: p.heroSubtitle || p.badge || p.category,
    title: p.title,
    description: p.description,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    buttonText: 'Shop Now',
    link: `/products/${p.id}`,
  }));
}
