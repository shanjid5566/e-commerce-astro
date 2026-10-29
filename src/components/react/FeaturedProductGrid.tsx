// src/components/react/FeaturedProductGrid.tsx
import type { Product } from '@services/productService';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function FeaturedProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}