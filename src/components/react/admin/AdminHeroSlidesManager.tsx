// src/components/react/admin/AdminHeroSlidesManager.tsx
import { useState } from 'react';
import type { Product } from '../../../services/productService';
import {
  Sliders,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
  Package,
  Layers,
  ShoppingBag
} from 'lucide-react';

interface Props {
  initialProducts: Product[];
}

export default function AdminHeroSlidesManager({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Products currently featured on the hero banner
  const bannerProducts = products.filter((p) => p.showInHeroBanner);

  // Products eligible to be added to hero banner
  const eligibleProducts = products.filter((p) => !p.showInHeroBanner);

  const handleRemoveFromBanner = (productId: string) => {
    if (confirm('Remove this product from the homepage hero carousel? (The product will remain in your catalog)')) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, showInHeroBanner: false } : p))
      );
      setSuccessMessage('Product removed from hero banner.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleAddToBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      alert('Please select a product from the list.');
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProductId
          ? {
              ...p,
              showInHeroBanner: true,
              heroSubtitle: customSubtitle.trim() || p.badge || p.category,
            }
          : p
      )
    );

    setIsAddModalOpen(false);
    setSelectedProductId('');
    setCustomSubtitle('');
    setSuccessMessage('Product successfully added to the homepage hero banner!');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="text-emerald-500 hover:text-emerald-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Header & Statistics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <span>Homepage Hero Banners</span>
          </h2>
          <p className="text-xs text-slate-500">
            Control which catalog products are showcased in the prominent homepage carousel. Every slide links directly to its product details page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Live Slider</span>
          </a>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product to Banner</span>
          </button>
        </div>
      </div>

      {/* Live Banner Items Counter Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-indigo-950">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Active Carousel Products: <span className="text-rose-500 font-black">{bannerProducts.length}</span> items</span>
        </div>
        <div className="text-slate-500 text-[11px]">
          Rotation: <span className="font-semibold text-slate-700">5s Auto-play</span> • Destination: <span className="font-semibold text-slate-700">Individual Product Details Pages</span>
        </div>
      </div>

      {/* Grid of Hero Banner Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bannerProducts.map((p, index) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition"
          >
            {/* Cutout Image Container with Slide Tag */}
            <div className="relative aspect-[16/10] bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100">
              <img
                src={p.image}
                alt={p.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 bg-indigo-950 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-xs">
                Slide #{index + 1}
              </span>
              <span className="absolute top-3 right-3 bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                {p.category}
              </span>
            </div>

            {/* Slide Details */}
            <div className="p-5 space-y-2.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">
                  {p.heroSubtitle || p.badge || 'Featured Product'}
                </span>
                <span className="font-black text-indigo-950 text-sm">
                  ৳{p.price.toLocaleString()}
                </span>
              </div>

              <h3 className="font-extrabold text-indigo-950 text-sm leading-snug truncate">
                {p.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {p.description || 'Premium winter product with fast delivery.'}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-slate-500 truncate max-w-[170px]">
                  /products/{p.id}
                </span>
                <span className="font-bold text-emerald-600">● In Stock</span>
              </div>
            </div>

            {/* Slide Action Bar */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`/products/${p.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-600 hover:text-indigo-950 flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Details</span>
              </a>

              <div className="flex items-center gap-1.5">
                <a
                  href={`/admin/products/${p.id}/edit`}
                  className="p-1.5 text-slate-500 hover:text-indigo-950 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                  title="Edit Product & Banner Settings"
                >
                  <Edit2 className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handleRemoveFromBanner(p.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  title="Remove from Hero Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Product to Banner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-indigo-950">Add Product to Hero Banner</h3>
                  <p className="text-xs text-slate-500">Select an existing catalog product to feature on the carousel.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddToBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Select Product *
                </label>
                {eligibleProducts.length > 0 ? (
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer"
                    required
                  >
                    <option value="">-- Choose a catalog product --</option>
                    {eligibleProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category} - ৳{p.price})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
                    All products in your catalog are already featured in the hero banner carousel!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Hero Subtitle Tagline (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Winter Warmth, New Arrival, Limited Edition"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={eligibleProducts.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  Add to Hero Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
