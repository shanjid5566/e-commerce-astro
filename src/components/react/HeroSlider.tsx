// src/components/react/HeroSlider.tsx
import { useState, useEffect, useRef } from 'react';
import type { HeroSlide } from '../../services/heroSliderService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
          
          {/* Left Column: Fixed Bounding Box with Smooth Directional Transition */}
          <div className="w-full flex items-center justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[580px] h-[280px] sm:h-[400px] lg:h-[620px] flex items-center justify-center overflow-visible">
              <img
                key={`img-${current.id}-${direction}`}
                src={current.image}
                alt={current.title}
                className={`max-h-full max-w-full object-contain filter drop-shadow-lg transition-transform duration-500 ease-out hover:scale-105 ${
                  direction === 'next' ? 'animate-hero-image-next' : 'animate-hero-image-prev'
                }`}
              />
            </div>
          </div>

          {/* Right Column: Clean Minimalist Typography with Fade-Up Transition */}
          <div
            key={`txt-${current.id}-${direction}`}
            className="flex flex-col items-start justify-center text-left space-y-3 sm:space-y-4 lg:space-y-5 lg:pl-8 animate-hero-text"
          >
            {current.subtitle && (
              <span className="text-xs sm:text-sm lg:text-base text-slate-500 font-medium tracking-wide">
                {current.subtitle}
              </span>
            )}

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {current.title}
            </h1>

            {current.description && (
              <p className="text-slate-500 text-xs sm:text-sm lg:text-base max-w-md leading-relaxed">
                {current.description}
              </p>
            )}

            <div className="pt-1 sm:pt-4">
              <a
                href={current.link}
                className="inline-block border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
              >
                {current.buttonText || 'Shop Now'}
              </a>
            </div>
          </div>

        </div>

        {/* Slide Indicator Dots: Naturally spaced right below content on mobile, pinned at bottom on desktop */}
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
