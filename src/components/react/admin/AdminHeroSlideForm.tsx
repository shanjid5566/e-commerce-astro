// src/components/react/admin/AdminHeroSlideForm.tsx
import { useState } from 'react';
import type { HeroSlide } from '../../../services/heroSliderService';
import {
  Upload,
  Link as LinkIcon,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  Sparkles,
  ExternalLink,
  Eye
} from 'lucide-react';

interface Props {
  initialSlide?: HeroSlide;
  isEdit?: boolean;
}

export default function AdminHeroSlideForm({ initialSlide, isEdit = false }: Props) {
  const [subtitle, setSubtitle] = useState(initialSlide?.subtitle || 'Winter Collection 2026');
  const [title, setTitle] = useState(initialSlide?.title || '');
  const [description, setDescription] = useState(
    initialSlide?.description || 'Premium heavyweight winter wear, authentic biker leather jackets, and cozy thermal collections.'
  );
  const [buttonText, setButtonText] = useState(initialSlide?.buttonText || 'Shop Now');
  const [link, setLink] = useState(initialSlide?.link || '/products');
  const [image, setImage] = useState(initialSlide?.image || '/images/slides/slide-jacket-1.png');

  // Image Upload Choice
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [isSaved, setIsSaved] = useState(false);

  // Handle local File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a banner title.');
      return;
    }

    setIsSaved(true);
    setTimeout(() => {
      window.location.href = '/admin/hero-slides';
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <a
            href="/admin/hero-slides"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-950 hover:bg-slate-50 transition"
            title="Back to hero banners"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div>
            <h2 className="text-xl font-black text-indigo-950 tracking-tight">
              {isEdit ? `Edit Hero Banner: ${title || initialSlide?.id}` : 'Create New Hero Banner Slide'}
            </h2>
            <p className="text-xs text-slate-500">
              Set banner copy, destination CTA link, and upload banner artwork.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/admin/hero-slides"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-rose-200 transition cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isEdit ? 'Save Changes' : 'Publish Banner'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Banner Saved Successfully!</p>
            <p className="text-emerald-700">Redirecting to hero slides manager...</p>
          </div>
        </div>
      )}

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details & Image Upload */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Banner Copy Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              Banner Content &amp; Headlines
            </h3>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                Top Subtitle Tag *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Arrival, Winter Warmth, Essential Knitwear"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
            </div>

            {/* Main Title */}
            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                Main Hero Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mens Cotton Rugged Winter Coat"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                Supporting Promotional Copy
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition leading-relaxed"
                placeholder="Wind-resistant rugged exterior with soft inner lining engineered for cold winter breezes..."
              />
            </div>

            {/* CTA Button and Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Button Label Text
                </label>
                <input
                  type="text"
                  required
                  placeholder="Shop Now"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Target Destination Link
                </label>
                <input
                  type="text"
                  required
                  placeholder="/products?category=jackets"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Banner Image Selection: File or URL */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider">
                Banner Artwork &amp; Photography
              </h3>

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
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {uploadMethod === 'url' ? (
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Image URL Path
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/slides/slide-jacket-1.png or https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/60 hover:bg-rose-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center group">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-indigo-950">
                    Click to browse or drag &amp; drop banner image from PC
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Transparent PNG or high-res JPG/WEBP recommended
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

        </div>

        {/* Right Column: Real-Time Banner Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-rose-500" />
                <span>Live Hero Preview</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Matches Storefront
              </span>
            </div>

            {/* Split Carousel Card Mockup */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs overflow-hidden space-y-5">
              
              {/* Product Artwork Preview */}
              <div className="w-full h-56 bg-slate-50 rounded-xl flex items-center justify-center p-4 border border-slate-100">
                {image ? (
                  <img
                    src={image}
                    alt={title || 'Banner Artwork'}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No image selected</span>
                )}
              </div>

              {/* Text Layout Preview */}
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-semibold block">
                  {subtitle || 'Subtitle Tag'}
                </span>
                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {title || 'Main Banner Title'}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {description || 'Promotional copy describing the winter collection...'}
                </p>

                <div className="pt-2">
                  <span className="inline-block border-2 border-slate-900 text-slate-900 text-[11px] font-bold px-5 py-2 uppercase tracking-wider">
                    {buttonText || 'Shop Now'}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Meta */}
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p>Target Link: <span className="font-bold text-slate-600">{link}</span></p>
            </div>
          </div>
        </div>

      </div>

    </form>
  );
}
