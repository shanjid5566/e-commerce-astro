// src/components/react/ShopCatalog.tsx
import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Product, Category } from '@services/productService';
import ProductCard from './ProductCard';
import PriceRangeFilter from './PriceRangeFilter';
import Pagination from './Pagination';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  X,
  Filter
} from 'lucide-react';

interface Props {
  initialProducts: Product[];
  categories: Category[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

const MIN_PRICE = 0;
const MAX_PRICE = 5000;
const ITEMS_PER_PAGE = 6;

export default function ShopCatalog({ initialProducts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [minPrice, setMinPrice] = useState<number>(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to first page whenever user changes category, price, or sort
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  // Parse category from URL params on load (e.g. /products?category=hoodies)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        setSelectedCategory(catParam.toLowerCase());
      }
    }
  }, []);

  // Prevent body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Update URL param when category changes without reloading page
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (slug === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', slug);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Dynamic Price Range Filter
    result = result.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, selectedCategory, minPrice, maxPrice, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Compute live product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialProducts.forEach((p) => {
      const cat = p.category.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  const categoryList = [
    { slug: 'all', name: 'All Products', count: categoryCounts['all'] || initialProducts.length },
    ...categories.map((c) => ({
      slug: c.slug.toLowerCase(),
      name: c.name,
      count: categoryCounts[c.slug.toLowerCase()] || 0,
    })),
  ];

  const resetFilters = () => {
    handleCategoryChange('all');
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'all' || minPrice > MIN_PRICE || maxPrice < MAX_PRICE || sortBy !== 'featured';

  // Active filter count for badge
  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (minPrice > MIN_PRICE || maxPrice < MAX_PRICE ? 1 : 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* =========================================
          TOP UNIFIED HEADER: Category Title & Desktop Sort
          ========================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
              {selectedCategory === 'all'
                ? 'All Winter Products'
                : categoryList.find((c) => c.slug === selectedCategory)?.name || 'Products'}
            </h1>
            <span className="bg-slate-200/70 text-slate-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {minPrice > MIN_PRICE || maxPrice < MAX_PRICE
              ? `Filtered range: ৳${minPrice} – ৳${maxPrice}`
              : 'Premium heavyweight winter collection'}
          </p>
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured / Trending</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* =========================================
          MOBILE COMPACT UNIFIED ACTION BAR (Filters | Sort)
          ========================================= */}
      <div className="lg:hidden bg-white border border-slate-200/90 rounded-2xl p-1.5 flex items-center shadow-2xs">
        {/* Filter Trigger Button */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition text-xs font-bold text-slate-800 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-slate-200 shrink-0" />

        {/* Sort Select Segment */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold text-slate-800 pointer-events-none">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {sortBy === 'featured'
                ? 'Featured'
                : sortBy === 'price-asc'
                ? 'Price: Low'
                : 'Price: High'}
            </span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            aria-label="Sort products"
          >
            <option value="featured">Featured / Trending</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* =========================================
          ACTIVE FILTER CHIPS (Quick Dismiss Pills)
          ========================================= */}
      {isFiltered && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold shrink-0 shadow-2xs">
              <span>{categoryList.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="hover:text-rose-800 cursor-pointer"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPrice > MIN_PRICE || maxPrice < MAX_PRICE) && (
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold shrink-0 shadow-2xs">
              <span>৳{minPrice} – ৳{maxPrice}</span>
              <button
                type="button"
                onClick={() => {
                  setMinPrice(MIN_PRICE);
                  setMaxPrice(MAX_PRICE);
                }}
                className="hover:text-amber-900 cursor-pointer"
                aria-label="Remove price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-bold text-slate-500 hover:text-rose-500 underline ml-1 shrink-0 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main 2-Column Layout: Left Category Sidebar + Right Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================
            LEFT COLUMN (Desktop): Sticky Category & Price Filter Sidebar
            ========================================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
          
          {/* Categories Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wider">
                  Categories
                </h3>
              </div>
              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            <nav className="space-y-1.5" aria-label="Product categories">
              {categoryList.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-sm font-bold translate-x-1'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-950'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Interactive Dual-Slider Price Filter Card (Matching User Mockup) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">
                Price Range
              </h4>
              {(minPrice > MIN_PRICE || maxPrice < MAX_PRICE) && (
                <button
                  type="button"
                  onClick={() => {
                    setMinPrice(MIN_PRICE);
                    setMaxPrice(MAX_PRICE);
                  }}
                  className="text-[10px] text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <PriceRangeFilter
              min={MIN_PRICE}
              max={MAX_PRICE}
              minVal={minPrice}
              maxVal={maxPrice}
              onChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
            />
          </div>

          {/* Winter Perks Trust Box */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-extrabold uppercase tracking-wider">Winter Cart Perks</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Free delivery on orders over ৳2,500</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Guaranteed Heavy Warmth Fabric</span>
              </li>
              <li className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>7-Day Easy Exchange Guarantee</span>
              </li>
            </ul>
          </div>

        </aside>

        {/* =========================================
            RIGHT COLUMN: Product Cards Grid
            ========================================= */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Product Cards Grid - 2 columns on mobile, 3 columns on desktop */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Reusable Brand-Themed Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                totalItems={filteredProducts.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </>
          ) : (
            /* Empty State (Matching user screenshot) */
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl font-bold">
                🔍
              </div>
              <h3 className="text-base sm:text-lg font-bold text-indigo-950">
                No products match your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting the price range or selecting another category to see more products.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* =========================================
          LEFT-TO-RIGHT MOBILE FILTER DRAWER (React Portal)
          ========================================= */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9998] transition-all duration-300 lg:hidden ${
              isDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            }`}
          >
            {/* Backdrop Overlay */}
            <div
              className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
                isDrawerOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Left to Right Sliding Panel */}
            <aside
              className={`fixed top-0 left-0 bottom-0 z-[9999] w-[85vw] max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
                isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              aria-modal="true"
              role="dialog"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                  <h2 className="text-base font-extrabold text-indigo-950">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Filters Content */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-grow">
                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                    Categories
                  </h3>
                  <div className="space-y-1.5">
                    {categoryList.map((cat) => {
                      const isActive = selectedCategory === cat.slug;
                      return (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                            isActive
                              ? 'bg-rose-500 text-white shadow-sm font-bold translate-x-1'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-950'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Dual-Slider & Inputs (Image 2) */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                    Price Range
                  </h3>
                  <PriceRangeFilter
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    minVal={minPrice}
                    maxVal={maxPrice}
                    onChange={(min, max) => {
                      setMinPrice(min);
                      setMaxPrice(max);
                    }}
                  />
                </div>
              </div>

              {/* Bottom Sticky Action Buttons */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-2/3 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </aside>
          </div>,
          document.body
        )}

    </div>
  );
}
