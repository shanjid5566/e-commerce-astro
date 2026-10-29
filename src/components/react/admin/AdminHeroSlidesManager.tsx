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

        <a
          href="/admin/hero-slides/new"
          className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner</span>
        </a>
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
                <a
                  href={`/admin/hero-slides/${slide.id}/edit`}
                  className="p-1.5 text-slate-500 hover:text-indigo-950 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                  title="Edit Banner"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </a>
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

    </div>
  );
}

