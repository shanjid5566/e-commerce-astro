// src/components/react/admin/AdminProductForm.tsx
import { useState } from 'react';
import type { Product, Category } from '../../../services/productService';
import {
  Upload,
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  Star,
  Sparkles,
  Eye,
  AlertCircle
} from 'lucide-react';

interface Props {
  initialProduct?: Product;
  categories: Category[];
  isEdit?: boolean;
}

export default function AdminProductForm({ initialProduct, categories, isEdit = false }: Props) {
  const [title, setTitle] = useState(initialProduct?.title || '');
  const [category, setCategory] = useState<Product['category']>(initialProduct?.category || 'Hoodies');
  const [price, setPrice] = useState<number>(initialProduct?.price || 1350);
  const [originalPrice, setOriginalPrice] = useState<number>(initialProduct?.originalPrice || 1800);
  const [badge, setBadge] = useState<string>(initialProduct?.badge || 'Best Seller');
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.isFeatured ?? true);
  const [inStock, setInStock] = useState<boolean>(true);
  const [description, setDescription] = useState(
    'Crafted from ultra-durable premium winter fabrics to provide guaranteed warmth, supreme comfort, and modern streetwear aesthetic throughout the chilly season.'
  );

  // Multiple Images State
  const defaultImages = initialProduct?.images && initialProduct.images.length > 0
    ? initialProduct.images
    : initialProduct?.image
    ? [initialProduct.image]
    : ['https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'];

  const [images, setImages] = useState<string[]>(defaultImages);
  const [primaryImageIdx, setPrimaryImageIdx] = useState<number>(0);

  // Image Upload Choice: 'file' | 'url'
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Handle URL Link addition
  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    setImages((prev) => [...prev, urlInput.trim()]);
    setUrlInput('');
  };

  // Handle local File Upload (Multiple)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input value
    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length <= 1) {
      alert('Product must have at least one image.');
      return;
    }
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (primaryImageIdx >= images.length - 1) {
      setPrimaryImageIdx(0);
    }
  };

  const discountPercent = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a product title.');
      return;
    }
    if (images.length === 0) {
      alert('Please add at least one product image.');
      return;
    }

    setIsSaved(true);
    setTimeout(() => {
      window.location.href = '/admin/products';
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <a
            href="/admin/products"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-950 hover:bg-slate-50 transition"
            title="Back to products"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div>
            <h2 className="text-xl font-black text-indigo-950 tracking-tight">
              {isEdit ? `Edit Product: ${title || initialProduct?.id}` : 'Create New Winter Apparel Product'}
            </h2>
            <p className="text-xs text-slate-500">
              Configure product details, pricing, stock, and upload multiple high-res gallery images.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-rose-200 transition cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isEdit ? 'Save Changes' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Product Saved Successfully!</p>
            <p className="text-emerald-700">Redirecting to product catalog...</p>
          </div>
        </div>
      )}

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Main Details & Multiple Images */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              General Information
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5" htmlFor="product-title">
                Product Title *
              </label>
              <input
                id="product-title"
                type="text"
                required
                placeholder="e.g. Over-Sized Heavy Fleece Streetwear Hoodie"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5" htmlFor="product-desc">
                Product Description *
              </label>
              <textarea
                id="product-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition leading-relaxed"
                placeholder="Describe fabric weight (GSM), warmth, lining, and styling notes..."
              />
            </div>
          </div>

          {/* Pricing & Discount Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              Pricing &amp; Discounts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Sale / Discounted Price (৳) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Regular / Strike Price (৳) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Calculated Savings Badge
                </label>
                <div className="h-10 px-4 flex items-center bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-black text-emerald-700">
                  {discountPercent > 0 ? `${discountPercent}% OFF DISCOUNT` : 'No Discount'}
                </div>
              </div>
            </div>
          </div>

          {/* Multiple Images Upload & Gallery Manager */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>Product Gallery Images ({images.length})</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Upload multiple product angles or paste image links. Choose your primary thumbnail.
                </p>
              </div>

              {/* Upload Method Switcher Tabs */}
              <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    uploadMethod === 'url' ? 'bg-white text-indigo-950 shadow-2xs' : 'text-slate-500 hover:text-indigo-950'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Image URL Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    uploadMethod === 'file' ? 'bg-white text-indigo-950 shadow-2xs' : 'text-slate-500 hover:text-indigo-950'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from PC</span>
                </button>
              </div>
            </div>

            {/* Upload Area by Method */}
            {uploadMethod === 'url' ? (
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste direct image URL (https://images.unsplash.com/...)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs rounded-xl transition cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add URL</span>
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/60 hover:bg-rose-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center group">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-indigo-950">
                    Click to browse or drag &amp; drop photos from your computer
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Supports PNG, JPG, WEBP (multiple files can be selected simultaneously)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Gallery Thumbnails Grid */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-indigo-950">
                Uploaded Product Images (Click to set as primary thumbnail)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => {
                  const isPrimary = primaryImageIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`relative rounded-2xl overflow-hidden border-2 transition duration-200 group bg-slate-100 aspect-[4/4] flex flex-col justify-between ${
                        isPrimary
                          ? 'border-rose-500 shadow-md shadow-rose-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {/* Primary Cover Badge */}
                      {isPrimary && (
                        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          <span>Primary</span>
                        </span>
                      )}

                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImageIdx(idx)}
                            className="bg-white text-indigo-950 hover:bg-rose-50 hover:text-rose-600 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-xs transition cursor-pointer"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-lg transition cursor-pointer"
                          title="Remove Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Category, Badge, & Publishing Options */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Category & Department Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              Category Department
            </h3>

            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                Target Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer"
              >
                <option value="Hoodies">Hoodies &amp; Sweatshirts</option>
                <option value="Jackets">Jackets &amp; Coats</option>
                <option value="Sweaters">Sweaters &amp; Cardigans</option>
                <option value="Thermal">Thermal &amp; Base Layers</option>
                <option value="Shawls">Shawls &amp; Winter Wraps</option>
              </select>
            </div>
          </div>

          {/* Badge & Merchandising Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              Badge &amp; Merchandising
            </h3>

            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                Product Badge Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Best Seller, Trending, Hot Deal"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Best Seller', 'Trending', 'Hot Deal', 'Winter Pick', 'Premium'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBadge(preset)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition cursor-pointer"
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured on Homepage Toggle */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-950">Feature on Homepage</p>
                <p className="text-[11px] text-slate-400">Display in Trending Winter Essentials grid</p>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-slate-300 accent-rose-500 cursor-pointer"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-950">In Stock / Available</p>
                <p className="text-[11px] text-slate-400">Customers can add to cart</p>
              </div>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-300 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Store Preview Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Catalog Preview</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><span className="text-slate-400 font-normal">Title:</span> {title || 'Untitled Product'}</p>
              <p><span className="text-slate-400 font-normal">Category:</span> {category}</p>
              <p><span className="text-slate-400 font-normal">Pricing:</span> ৳{price} <span className="line-through text-slate-500 text-[11px]">৳{originalPrice}</span></p>
              <p><span className="text-slate-400 font-normal">Total Gallery Images:</span> {images.length}</p>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}

