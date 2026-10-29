// src/components/react/PriceRangeFilter.tsx
import React from 'react';

interface Props {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceRangeFilter({ min, max, minVal, maxVal, onChange }: Props) {
  const minPercent = Math.min(100, Math.max(0, Math.round(((minVal - min) / (max - min)) * 100)));
  const maxPercent = Math.min(100, Math.max(0, Math.round(((maxVal - min) / (max - min)) * 100)));

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newMin = Math.min(val, maxVal - 50);
    onChange(Math.max(min, newMin), maxVal);
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newMax = Math.max(val, minVal + 50);
    onChange(minVal, Math.min(max, newMax));
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? min : Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.max(min, Math.min(val, maxVal - 50));
      onChange(clamped, maxVal);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? max : Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.min(max, Math.max(val, minVal + 50));
      onChange(minVal, clamped);
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* Dual Range Track & Circular Thumbs */}
      <div className="relative pt-4 pb-2 px-1">
        {/* Grey Background Track */}
        <div className="h-2 w-full bg-slate-200 rounded-full relative">
          {/* Active Highlight Bar (Amber/Gold matching design) */}
          <div
            className="absolute h-2 bg-amber-500 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />
        </div>

        {/* Dual HTML5 Range Inputs Overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={minVal}
          onChange={handleMinSlider}
          className="range-slider-thumb absolute inset-x-0 top-3 w-full h-2 appearance-none bg-transparent pointer-events-none z-20 cursor-pointer"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={maxVal}
          onChange={handleMaxSlider}
          className="range-slider-thumb absolute inset-x-0 top-3 w-full h-2 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer"
          aria-label="Maximum price"
        />
      </div>

      {/* Two Rounded Input Boxes Side-by-Side (as shown in user mockup) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Min Price (৳)
          </label>
          <input
            type="number"
            min={min}
            max={maxVal - 50}
            step={50}
            value={minVal}
            onChange={handleMinInput}
            className="w-full bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 text-center transition shadow-2xs focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Max Price (৳)
          </label>
          <input
            type="number"
            min={minVal + 50}
            max={max}
            step={50}
            value={maxVal}
            onChange={handleMaxInput}
            className="w-full bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 text-center transition shadow-2xs focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

