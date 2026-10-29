// src/components/react/ProductImageGallery.tsx
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
  badge?: string;
}

export default function ProductImageGallery({ images, title, badge }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const galleryImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const scrollThumbs = (direction: 'left' | 'right') => {
    if (thumbsRef.current) {
      const offset = direction === 'left' ? -120 : 120;
      thumbsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-4 select-none">
      {/* 1. Main Featured Image Container */}
      <div className="relative w-full aspect-[4/5] max-h-[640px] rounded-3xl overflow-hidden bg-slate-100 shadow-md border border-slate-200/80 group">
        {/* Badge Top Left */}
        {badge && (
          <span className="absolute top-4 left-4 bg-indigo-950/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg uppercase tracking-wider z-10 border border-white/10">
            {badge}
          </span>
        )}

        {/* Counter Pill Bottom Right */}
        {galleryImages.length > 1 && (
          <span className="absolute bottom-4 right-4 bg-slate-950/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10">
            {activeIdx + 1} / {galleryImages.length}
          </span>
        )}

        {/* Main Image View */}
        <img
          key={activeIdx}
          src={galleryImages[activeIdx]}
          alt={`${title} - view ${activeIdx + 1}`}
          width={600}
          height={600}
          decoding="async"
          className="w-full h-full object-cover object-center"
        />

        {/* Left & Right Main Navigation Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all active:scale-95 z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all active:scale-95 z-20 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* 2. Multiple Images Thumbnails Strip (Red box area) */}
      {galleryImages.length > 1 && (
        <div className="relative flex items-center pt-1">
          {/* Optional Left Scroll Arrow for Thumbnails */}
          {galleryImages.length > 4 && (
            <button
              type="button"
              onClick={() => scrollThumbs('left')}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 mr-2 transition cursor-pointer shrink-0"
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Thumbnails Row */}
          <div
            ref={thumbsRef}
            className="flex items-center gap-3 overflow-x-auto scroll-smooth py-1 scrollbar-none"
          >
            {galleryImages.map((imgUrl, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative w-20 h-24 sm:w-22 sm:h-26 rounded-2xl overflow-hidden shrink-0 cursor-pointer border-2 transition-all duration-200 ${
                    isActive
                      ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10 scale-102 opacity-100'
                      : 'border-slate-200/90 opacity-60 hover:opacity-100 hover:border-slate-400'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional Right Scroll Arrow for Thumbnails */}
          {galleryImages.length > 4 && (
            <button
              type="button"
              onClick={() => scrollThumbs('right')}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 ml-2 transition cursor-pointer shrink-0"
              aria-label="Scroll thumbnails right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
