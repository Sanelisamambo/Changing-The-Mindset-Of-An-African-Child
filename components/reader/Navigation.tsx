'use client';

import { ChevronLeft, ChevronRight, Home, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  chapter?: string;
}

export default function Navigation({ currentPage, totalPages, onPageChange, chapter }: NavigationProps) {
  const [inputValue, setInputValue] = useState<string>(String(currentPage));
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input value when currentPage changes from outside
  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or numbers only
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '') {
      // If empty, revert to current page
      setInputValue(String(currentPage));
      return;
    }
    
    const pageNum = parseInt(inputValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      // If invalid, revert to current page
      setInputValue(String(currentPage));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setInputValue(String(currentPage));
      inputRef.current?.blur();
    }
  };

  return (
    <div className="w-full">
      {/* ============ TOP NAVIGATION BAR ============ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-2">
        {/* Left: Page info with gradient */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20">
            <BookOpen size={12} className="text-blue-400 sm:size-14" />
            <span className="text-[10px] sm:text-xs text-white/40">Page</span>
            <span className="text-xs sm:text-sm font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              {currentPage}
            </span>
            <span className="text-[10px] sm:text-xs text-white/30">/ {totalPages}</span>
          </div>
          
          {/* Chapter indicator - hidden on mobile */}
          {chapter && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20">
              <span className="text-xs text-white/40">📚</span>
              <span className="text-xs text-white/60">{chapter}</span>
            </div>
          )}
        </div>

        {/* Right: Home button - hidden on mobile, shown on tablet+ */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white hover:border-blue-500/30 transition-all hover:scale-105 group bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20"
        >
          <ArrowLeft size={16} className="group-hover:text-blue-400 transition-colors" />
          <span className="text-xs group-hover:text-blue-400 transition-colors">Home</span>
        </Link>
      </div>

      {/* ============ MAIN NAVIGATION CONTROLS - MOBILE OPTIMIZED ============ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 px-3 sm:px-4 shadow-xl shadow-black/10">
        
        {/* Previous button - Full width on mobile */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-black/20 text-sm sm:text-base"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Previous</span>
        </button>

        {/* Page input - FIXED: Can now be emptied */}
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20 w-full sm:w-auto justify-center">
          <span className="text-[10px] sm:text-xs text-white/40 font-medium">Go to</span>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            max={totalPages}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder="Page #"
            className="w-14 sm:w-16 px-1.5 sm:px-2 py-1 bg-black/60 border border-white/20 rounded-lg text-center text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono placeholder:text-white/20"
            style={{ color: 'white' }}
          />
          <span className="text-[10px] sm:text-xs text-white/30">of {totalPages}</span>
        </div>

        {/* Next button - Full width on mobile */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-black/20 text-sm sm:text-base"
        >
          <span>Next</span>
          <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ============ QUICK JUMP BUTTONS - Horizontal scroll on mobile ============ */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto px-1 pb-1 scrollbar-hide">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg text-white/40 hover:text-white hover:border-blue-500/30 hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
        >
          ⟪ First
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 10))}
          disabled={currentPage <= 1}
          className="px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg text-white/40 hover:text-white hover:border-blue-500/30 hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
        >
          -10
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 10))}
          disabled={currentPage >= totalPages}
          className="px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg text-white/40 hover:text-white hover:border-blue-500/30 hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
        >
          +10
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg text-white/40 hover:text-white hover:border-blue-500/30 hover:bg-black/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Last ⟫
        </button>
      </div>

      {/* ============ KEYBOARD SHORTCUTS HINT ============ */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 text-[10px] text-white/20 select-none">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] font-mono">→</kbd>
          <span className="text-white/30 hidden xs:inline">Navigate</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] font-mono">Home</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] font-mono">End</kbd>
          <span className="text-white/30 hidden xs:inline">First/Last</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] font-mono">Enter</kbd>
          <span className="text-white/30 hidden xs:inline">Go to page</span>
        </span>
      </div>

      {/* ============ HIDE SCROLLBAR STYLES ============ */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}