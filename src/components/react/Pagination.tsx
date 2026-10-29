// src/components/react/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showItemCount?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showItemCount = true,
}: Props) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses logic (e.g. 1, 2, 3 ... 10)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200/80 select-none">
      {/* Showing X-Y of Z results counter */}
      {showItemCount && totalItems !== undefined && (
        <div className="text-xs text-slate-500 font-semibold">
          Showing <span className="font-extrabold text-indigo-950">{startItem}</span> to{' '}
          <span className="font-extrabold text-indigo-950">{endItem}</span> of{' '}
          <span className="font-extrabold text-indigo-950">{totalItems}</span> items
        </div>
      )}

      {/* Pagination Controls Pill */}
      <nav aria-label="Pagination" className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-2xl shadow-2xs">
        {/* Previous Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            currentPage === 1
              ? 'text-slate-300 cursor-not-allowed opacity-50'
              : 'text-slate-700 hover:text-rose-500 hover:bg-slate-50 active:scale-95 cursor-pointer'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 px-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`dots-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400"
                >
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-102'
                    : 'text-slate-700 hover:text-indigo-950 hover:bg-slate-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            currentPage === totalPages
              ? 'text-slate-300 cursor-not-allowed opacity-50'
              : 'text-slate-700 hover:text-rose-500 hover:bg-slate-50 active:scale-95 cursor-pointer'
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}

