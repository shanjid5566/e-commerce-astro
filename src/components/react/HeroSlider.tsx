// src/components/react/HeroSlider.tsx
import { useState, useEffect, useRef } from 'react';
import type { HeroSlide } from '../../services/heroSliderService';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';

interface Props {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play Carousel (Every 5 seconds)
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, currentIndex]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const prevSlide = () => {
    resetTimer();
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetTimer();
    setDirection('next');
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    resetTimer();
    setDirection(idx > currentIndex ? 'next' : 'prev');
    setCurrentIndex(idx);
  };

  const current = slides[currentIndex];

  if (!slides.length || !current) return null;

  return (
    <section className="relative w-full bg-white border-b border-slate-200 overflow-hidden select-none py-6 sm:py-8 lg:py-12 lg:min-h-[90vh] lg:flex lg:items-center">
      <div className="container mx-auto px-5 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
        
        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-16 items-center w-full">
          
          {/* Left Column: Fixed Bounding Box with Clickable Link to Product Details */}
          <div className="w-full flex items-center justify-center">
            <a
              href={current.link}
              title={`View ${current.title} details`}
              className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[580px] h-[280px] sm:h-[400px] lg:h-[620px] flex items-center justify-center overflow-visible group cursor-pointer"
            >
              <img
                key={`img-${current.id}-${direction}`}
                src={current.image}
                alt={current.title}
                width={580}
                height={620}
                className={`max-h-full max-w-full object-contain filter drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 ${
                  direction === 'next' ? 'animate-hero-image-next' : 'animate-hero-image-prev'
                }`}
              />
            </a>
          </div>

          {/* Right Column: Clean Typography, Price, & Direct Link to Product */}
          <div
            key={`txt-${current.id}-${direction}`}
            className="flex flex-col items-start justify-center text-left space-y-3 sm:space-y-4 lg:space-y-5 lg:pl-8 animate-hero-text"
          >
            {/* Subtitle & Category pill */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {current.subtitle && (
                <span className="text-xs sm:text-sm lg:text-base text-slate-500 font-semibold tracking-wide">
                  {current.subtitle}
                </span>
              )}
              {current.price && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">
                  <Tag className="w-3 h-3 text-rose-500" />
                  <span>Featured Product</span>
                </span>
              )}
            </div>

            {/* Clickable Product Title */}
            <a
              href={current.link}
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight hover:text-rose-500 transition-colors"
            >
              {current.title}
            </a>

            {/* Price Preview */}
            {current.price && (
              <div className="flex items-baseline gap-3 pt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-indigo-950">
                  ৳{current.price.toLocaleString()}
                </span>
                {current.originalPrice && current.originalPrice > current.price && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    ৳{current.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            )}

            {current.description && (
              <p className="text-slate-500 text-xs sm:text-sm lg:text-base max-w-md leading-relaxed">
                {current.description}
              </p>
            )}

            {/* Shop Now CTA Button -> Goes to /products/[id] */}
            <div className="pt-2 sm:pt-4 flex items-center gap-3">
              <a
                href={current.link}
                className="inline-flex items-center gap-2 border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <span>{current.buttonText || 'Shop Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Slide Indicator Dots */}
        <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 sm:w-7 bg-slate-900'
                  : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-8 top-[24%] sm:top-[30%] lg:top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition shadow-sm border border-slate-200/80 z-20 cursor-pointer active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-8 top-[24%] sm:top-[30%] lg:top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition shadow-sm border border-slate-200/80 z-20 cursor-pointer active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

    </section>
  );
}
