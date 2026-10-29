// src/components/react/CartView.tsx
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $cart, initCartStore, updateQuantity, removeFromCart, clearCart } from '@stores/cartStore';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartView() {
  const [mounted, setMounted] = useState(false);
  const items = useStore($cart);

  useEffect(() => {
    initCartStore();
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2500 || subtotal === 0 ? 0 : 70;
  const total = subtotal + deliveryFee;

  if (!mounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-5 animate-fadeIn">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Looks like you haven't added any winter wear to your cart yet.
        </p>
        <div className="pt-2">
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-rose-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fadeIn">
      {/* Items List */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            {items.length} {items.length === 1 ? 'Product' : 'Products'}
          </span>
          <button
            onClick={() => clearCart()}
            className="text-xs text-rose-500 hover:text-rose-600 font-bold transition cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 flex gap-4 sm:gap-6 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-24 object-contain p-1.5 rounded-xl bg-slate-50 shrink-0 border border-slate-200"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{item.title}</h3>
                <p className="text-sm font-black text-slate-900 mt-1">৳{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900 select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    Total: ৳{item.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-28">
        <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-slate-900">৳{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-bold text-slate-900">
              {deliveryFee === 0 ? (
                <span className="text-emerald-500 font-bold">FREE</span>
              ) : (
                `৳${deliveryFee}`
              )}
            </span>
          </div>
          {subtotal < 2500 && (
            <p className="text-[11px] text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
              💡 Add ৳{2500 - subtotal} more for Free Cash on Delivery!
            </p>
          )}

          <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-black text-slate-900">
            <span>Total</span>
            <span className="text-rose-500">৳{total}</span>
          </div>
        </div>

        <button
          onClick={() => alert(`Order placed successfully for ৳${total}! Cash on Delivery confirmed.`)}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl text-sm transition shadow-lg shadow-rose-500/25 active:scale-95 cursor-pointer"
        >
          Confirm Cash on Delivery
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>7-Day Hassle-Free Return Guarantee</span>
        </div>
      </div>
    </div>
  );
}
