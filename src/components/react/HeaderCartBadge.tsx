// src/components/react/HeaderCartBadge.tsx
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $cart, initCartStore } from '@stores/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function HeaderCartBadge() {
  const cartItems = useStore($cart);

  useEffect(() => {
    initCartStore();
  }, []);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <a
      href="/cart"
      className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition flex items-center justify-center"
      aria-label="View Shopping Cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
          {totalCount}
        </span>
      )}
    </a>
  );
}
