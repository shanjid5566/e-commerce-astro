// src/components/react/MobileNav.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Search, ShoppingBag, ArrowRight } from 'lucide-react';

interface Props {
  currentPath?: string;
}

export default function MobileNav({ currentPath = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pathname, setPathname] = useState(currentPath);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const isHome = pathname === '/' || pathname === '';
  const isProducts = pathname.startsWith('/products');
  const isTrack = pathname.startsWith('/track-order');
  const isSizeGuide = pathname.startsWith('/size-guide');
  const isAbout = pathname.startsWith('/about');
  const isContact = pathname.startsWith('/contact');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden flex items-center">
      {/* Toggle Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-xl text-slate-700 hover:text-rose-500 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Render 70% Right-to-Left Drawer via Portal */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] lg:hidden transition-[visibility] duration-300 ${
              isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
            }`}
          >
            {/* 30% Visible Dark/Blurred Backdrop Overlay */}
            <div
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            />

            {/* 70% Width Drawer Sliding Smoothly from Right to Left */}
            <div
              className={`fixed top-0 right-0 w-[75vw] sm:w-[320px] max-w-[85vw] h-[100dvh] max-h-[100dvh] bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-10 transition-transform duration-300 ease-out border-l border-slate-200 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-lg sm:text-xl font-black text-indigo-950 tracking-tight"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span>Winter<span className="text-rose-500">Cart</span></span>
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content Body */}
              <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-5">
                {/* Search Bar Form */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wear..."
                    className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white border border-slate-200 transition"
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
                    aria-label="Submit search"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Primary Navigation Links */}
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
                    Menu
                  </p>
                  <a
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isHome
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>Home</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isHome ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                  <a
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isProducts
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>Shop All</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isProducts ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                  <a
                    href="/track-order"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isTrack
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>Track Order</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isTrack ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                  <a
                    href="/size-guide"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isSizeGuide
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>Size Guide</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSizeGuide ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                  <a
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isAbout
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>About Us</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAbout ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                      isContact
                        ? 'font-bold text-rose-500 bg-rose-50'
                        : 'font-semibold text-slate-800 hover:text-rose-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>Contact</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isContact ? 'text-rose-400' : 'text-slate-300'}`} />
                  </a>
                </div>

                {/* Popular Collections */}
                <div className="space-y-0.5 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
                    Collections
                  </p>
                  <a
                    href="/products?category=hoodies"
                    onClick={() => setIsOpen(false)}
                    className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-rose-500 transition"
                  >
                    Heavy Fleece Hoodies
                  </a>
                  <a
                    href="/products?category=jackets"
                    onClick={() => setIsOpen(false)}
                    className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-rose-500 transition"
                  >
                    Leather & Puffer Jackets
                  </a>
                  <a
                    href="/products?category=sweaters"
                    onClick={() => setIsOpen(false)}
                    className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-rose-500 transition"
                  >
                    Knit Sweaters & Cardigans
                  </a>
                  <a
                    href="/products?category=shawls"
                    onClick={() => setIsOpen(false)}
                    className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-rose-500 transition"
                  >
                    Cashmere Shawls & Thermal
                  </a>
                </div>
              </div>

              {/* Drawer Bottom Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                <p className="font-bold text-slate-800">🔥 Free Cash on Delivery</p>
                <p className="text-slate-500">Above ৳2,500 across Bangladesh.</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
