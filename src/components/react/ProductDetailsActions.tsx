// src/components/react/ProductDetailsActions.tsx
import { useState } from 'react';
import type { Product } from '@services/productService';
import { addToCart } from '@stores/cartStore';
import { ShoppingBag, Check, Zap, Plus, Minus } from 'lucide-react';

interface Props {
  product: Product;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailsActions({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(
      {
        id: `${product.id}-${selectedSize}`,
        title: `${product.title} (${selectedSize})`,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: `${product.id}-${selectedSize}`,
        title: `${product.title} (${selectedSize})`,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    // Direct redirect to cart/checkout
    window.location.href = '/cart';
  };

  return (
    <div className="space-y-6 pt-5 border-t border-slate-100">
      {/* Size Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 uppercase tracking-wider">
            Select Size: <span className="text-rose-500 font-black">{selectedSize}</span>
          </span>
          <a
            href="/size-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-rose-500 font-semibold underline decoration-slate-300 underline-offset-4 hover:decoration-rose-400 transition cursor-pointer"
          >
            Size Guide
          </a>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-11 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                selectedSize === size
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions Row */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-slate-900 select-none">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons: Add to Cart and Buy Now */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 ${
              isAdded
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                : 'border-slate-900 bg-white hover:bg-slate-50 text-slate-900 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>Buy Now (৳{product.price * quantity})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
