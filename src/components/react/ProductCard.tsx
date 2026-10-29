// src/components/react/ProductCard.tsx
import { useState } from 'react';
import type { Product } from '@services/productService';
import { addToCart } from '@stores/cartStore';
import { ShoppingBag, Check } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <a
      href={`/products/${product.id}`}
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/4] overflow-hidden bg-slate-50 flex items-center justify-center p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          decoding="async"
          className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge Top Left */}
        {product.badge && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-indigo-950 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-md uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        {/* Discount Pill Top Right */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-rose-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md shadow-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 sm:mb-1.5">
            <span className="font-bold text-rose-500 uppercase tracking-wider text-[10px] sm:text-[11px]">
              {product.category}
            </span>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-indigo-950 group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
          <div>
            <span className="text-sm sm:text-lg font-black text-slate-900">৳{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through ml-1 sm:ml-1.5 block sm:inline">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl font-semibold transition cursor-pointer shrink-0 relative z-10 ${
              isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>
    </a>
  );
}
