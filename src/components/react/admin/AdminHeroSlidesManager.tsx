// src/components/react/admin/AdminHeroSlidesManager.tsx
import { useState } from 'react';
import type { HeroSlide } from '../../../services/heroSliderService';
import {
  Sliders,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  X,
  Sparkles,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface Props {
  initialSlides: HeroSlide[];
}

export default function AdminHeroSlidesManager({ initialSlides }: Props) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    subtitle: 'Winter Collection',
    description: 'Guaranteed 100% warmth with export-grade fabric.',
    image: '/images/slides/slide-jacket-1.png',
    buttonText: 'Shop Now',
    link: '/products',
  });

  const handleOpenAddModal = () => {
    setEditingSlide(null);
    setFormState({
      title: '',
      subtitle: 'Winter Warmth',
      description: 'Engineered for cold winter days in Bangladesh.',
      image: '/images/slides/slide-jacket-1.png',
      buttonText: 'Shop Now',
      link: '/products',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormState({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description || '',
      image: slide.image,
      buttonText: slide.buttonText || 'Shop Now',
      link: slide.link,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) return;

    if (editingSlide) {
      setSlides((prev) =>
        prev.map((s) =>
          s.id === editingSlide.id
            ? {
                ...s,
                title: formState.title,
                subtitle: formState.subtitle,
                description: formState.description,
                image: formState.image,
                buttonText: formState.buttonText,
                link: formState.link,
              }
            : s
        )
      );
    } else {
      const newSlide: HeroSlide = {
        id: `slide-${Date.now()}`,
        title: formState.title,
        subtitle: formState.subtitle,
        description: formState.description,
        image: formState.image,
        buttonText: formState.buttonText,
        link: formState.link,
      };
      setSlides((prev) => [...prev, newSlide]);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm('Delete this banner from the homepage carousel?')) {
      setSlides((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <span>Homepage Hero Banners</span>
          </h2>
          <p className="text-xs text-slate-500">
            Control the featured slides, titles, banners, and promotional links displayed at the top of your homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Grid of Slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition"
          >
            {/* Banner Preview Area */}
            <div className="relative aspect-[16/10] bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 bg-indigo-950 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                Slide #{index + 1}
              </span>
            </div>

            {/* Slide Meta */}
            <div className="p-4 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider">
                {slide.subtitle}
              </span>
              <h3 className="font-extrabold text-indigo-950 text-sm truncate">
                {slide.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {slide.description || 'No description provided.'}
              </p>
              
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                <span className="truncate max-w-[150px]">Link: {slide.link}</span>
                <span className="font-bold text-slate-600">Button: {slide.buttonText || 'Shop Now'}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-500 hover:text-indigo-950 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View on Store</span>
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(slide)}
                  className="p-1.5 text-slate-500 hover:text-indigo-950 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                  title="Edit Banner"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  title="Delete Banner"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Slide Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-indigo-950">
                  {editingSlide ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                </h3>
                <p className="text-xs text-slate-400">Homepage hero carousel slide</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Subtitle *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Arrival"
                    value={formState.subtitle}
                    onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Button Text</label>
                  <input
                    type="text"
                    placeholder="Shop Now"
                    value={formState.buttonText}
                    onChange={(e) => setFormState({ ...formState, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Main Banner Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mens Heavyweight Cotton Jacket"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief promotional copy for the slider..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Slide Image Path / URL</label>
                  <input
                    type="text"
                    required
                    placeholder="/images/slides/slide-jacket-1.png"
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Destination URL</label>
                  <input
                    type="text"
                    placeholder="/products?category=jackets"
                    value={formState.link}
                    onChange={(e) => setFormState({ ...formState, link: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold shadow-sm shadow-rose-200 transition cursor-pointer"
                >
                  {editingSlide ? 'Save Slide' : 'Publish Banner'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
