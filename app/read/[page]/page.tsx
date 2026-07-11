'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOK_META } from '@/lib/book-meta';

interface ReaderPageProps {
  params: {
    page: string;
  };
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const router = useRouter();
  const initialPage = parseInt(params.page) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showControls, setShowControls] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pageInput, setPageInput] = useState('');
  const [isEditingPage, setIsEditingPage] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pageInputRef = useRef<HTMLInputElement>(null);
  
  // Touch tracking
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Update if params change
  useEffect(() => {
    const newPage = parseInt(params.page) || 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setPageInput('');
      setIsEditingPage(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [params.page]);

  // Focus input when editing
  useEffect(() => {
    if (isEditingPage && pageInputRef.current) {
      pageInputRef.current.focus();
      pageInputRef.current.select();
    }
  }, [isEditingPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > BOOK_META.totalPages) return;
    setCurrentPage(page);
    router.push(`/read/${page}`);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    showControlsWithTimeout();
    setIsMenuOpen(false);
    setIsEditingPage(false);
    setPageInput('');
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(pageInput);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= BOOK_META.totalPages) {
        handlePageChange(pageNum);
      } else {
        setPageInput('');
        setIsEditingPage(false);
      }
    }
    if (e.key === 'Escape') {
      setIsEditingPage(false);
      setPageInput('');
    }
  };

  const handlePageInputBlur = () => {
    if (pageInput) {
      const pageNum = parseInt(pageInput);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= BOOK_META.totalPages) {
        handlePageChange(pageNum);
      }
    }
    setIsEditingPage(false);
    setPageInput('');
  };

  const showControlsWithTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleTouchStartEvent = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 50 && deltaTime < 500) {
      if (deltaX < 0 && currentPage < BOOK_META.totalPages) {
        handlePageChange(currentPage + 1);
      } else if (deltaX > 0 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    }
  };

  const pageStr = String(currentPage).padStart(3, '0');
  const imagePath = `/book-pages/book-${pageStr}.png`;

  const currentChapter = BOOK_META.chapters.find(
    (ch) => currentPage >= ch.start && currentPage <= ch.end
  );

  const progress = ((currentPage - 1) / (BOOK_META.totalPages - 1)) * 100;

  return (
    <main 
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d1b2a] to-[#1b3a5c] text-white overflow-hidden touch-none"
    >
      {/* ============ FLOATING MATHEMATICAL OBJECTS ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-[5%] text-6xl text-blue-400/40 font-serif animate-float-math" style={{ animationDuration: '15s', animationDelay: '0s' }}>
          π
        </div>
        <div className="absolute top-20 right-[8%] text-7xl text-purple-400/40 font-serif animate-float-math" style={{ animationDuration: '18s', animationDelay: '2s' }}>
          ∑
        </div>
        <div className="absolute top-1/3 left-[3%] text-5xl text-cyan-400/40 font-serif animate-float-math" style={{ animationDuration: '20s', animationDelay: '4s' }}>
          √
        </div>
        <div className="absolute top-1/2 right-[4%] text-6xl text-pink-400/40 font-serif animate-float-math" style={{ animationDuration: '16s', animationDelay: '1s' }}>
          ∫
        </div>
        <div className="absolute bottom-1/3 left-[8%] text-7xl text-emerald-400/40 font-serif animate-float-math" style={{ animationDuration: '22s', animationDelay: '3s' }}>
          ∞
        </div>
        <div className="absolute bottom-20 right-[6%] text-6xl text-amber-400/40 font-serif animate-float-math" style={{ animationDuration: '19s', animationDelay: '5s' }}>
          θ
        </div>
        <div className="absolute top-[15%] left-[45%] text-5xl text-orange-400/40 font-serif animate-float-math" style={{ animationDuration: '14s', animationDelay: '6s' }}>
          Δ
        </div>
        <div className="absolute bottom-[20%] right-[40%] text-5xl text-teal-400/40 font-serif animate-float-math" style={{ animationDuration: '16s', animationDelay: '7s' }}>
          λ
        </div>
        <div className="absolute top-1/4 left-[15%] text-xl text-blue-400/30 font-mono animate-float-equation" style={{ animationDuration: '25s', animationDelay: '0s' }}>
          E = mc²
        </div>
        <div className="absolute top-2/3 right-[18%] text-xl text-purple-400/30 font-mono animate-float-equation" style={{ animationDuration: '28s', animationDelay: '3s' }}>
          a² + b² = c²
        </div>
        <div className="absolute bottom-1/3 left-[20%] text-lg text-cyan-400/30 font-mono animate-float-equation" style={{ animationDuration: '26s', animationDelay: '1.5s' }}>
          f(x) = ∫ x² dx
        </div>
        <div className="absolute top-3/4 right-[15%] text-lg text-pink-400/30 font-mono animate-float-equation" style={{ animationDuration: '30s', animationDelay: '4s' }}>
          Σ n² = n(n+1)(2n+1)/6
        </div>
        <div className="absolute top-10 left-[5%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-[8%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-1/3 left-[8%] w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* ============ TOP CONTROLS BAR ============ */}
      <div 
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 bg-gradient-to-b from-[#0a0a0f]/95 to-transparent pt-4 pb-8 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors hover:scale-105 duration-300"
            onClick={() => setShowControls(false)}
          >
            <ArrowLeft size={20} className="hover:text-blue-400 transition-colors" />
            <span className="text-sm hidden sm:inline">Home</span>
          </Link>

          {/* ============ ATTRACTIVE TITLE ============ */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookOpen size={18} className="text-blue-400 animate-pulse" />
              <div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide">
              {BOOK_META.title}
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white/70 hover:text-white hover:text-blue-400 transition-colors p-1 hover:scale-110 duration-300"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* ============ CHAPTER MENU ============ */}
        <div 
          ref={menuRef}
          className={`mt-3 mx-4 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#0a0a0f]/90 backdrop-blur-xl rounded-xl border border-white/10 p-2 max-h-[300px] overflow-y-auto shadow-2xl shadow-blue-500/10 scrollbar-thin">
            {BOOK_META.chapters.map((chapter) => {
              const isActive = currentPage >= chapter.start && currentPage <= chapter.end;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    handlePageChange(chapter.start);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-400 border border-blue-500/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{chapter.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-blue-400/60' : 'text-white/20'}`}>
                    {chapter.start}-{chapter.end}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ PROGRESS BAR ============ */}
        <div className="px-4 mt-2">
          <div className="flex justify-between text-[10px] text-white/30 mb-0.5">
            <span>Page {currentPage}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ============ PAGE VIEWER ============ */}
      <div 
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth relative z-10"
        onTouchStart={handleTouchStartEvent}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          showControlsWithTimeout();
        }}
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {/* Main image */}
        <div className="min-h-screen flex items-start justify-center p-4 pt-20 pb-24 sm:pb-28 md:pb-20">
          <img
            src={imagePath}
            alt={`Page ${currentPage}`}
            className="w-full max-w-4xl h-auto shadow-2xl shadow-blue-500/5 rounded-lg"
            style={{ 
              maxHeight: 'calc(100vh - 120px)',
              objectFit: 'contain',
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/book-pages/book-001.png';
              e.currentTarget.alt = 'Page not found';
            }}
          />
        </div>

        {/* Page indicator at bottom */}
        <div className="text-center text-white/20 text-xs py-4 select-none">
          {currentPage} / {BOOK_META.totalPages}
        </div>
      </div>

      {/* ============ BRIGHT BLUE NAVIGATION BUTTONS ============ */}
      {/* Previous Button - Left Side */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        } ${currentPage <= 1 ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110'}`}
      >
        <div className="bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-md border-2 border-blue-400/60 hover:border-blue-400/80 rounded-full p-1.5 sm:p-2.5 transition-all duration-300 group shadow-lg shadow-blue-500/20">
          <ChevronLeft size={20} className="text-blue-400 group-hover:text-blue-300 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </div>
      </button>

      {/* Next Button - Right Side */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= BOOK_META.totalPages}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        } ${currentPage >= BOOK_META.totalPages ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110'}`}
      >
        <div className="bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-md border-2 border-blue-400/60 hover:border-blue-400/80 rounded-full p-1.5 sm:p-2.5 transition-all duration-300 group shadow-lg shadow-blue-500/20">
          <ChevronRight size={20} className="text-blue-400 group-hover:text-blue-300 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </div>
      </button>

      {/* ============ EDITABLE PAGE NUMBER - BOTTOM LEFT ============ */}
      <div 
        className={`absolute bottom-20 left-4 z-40 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {isEditingPage ? (
          <input
            ref={pageInputRef}
            type="number"
            min={1}
            max={BOOK_META.totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={handlePageInputSubmit}
            onBlur={handlePageInputBlur}
            className="w-16 px-2 py-1.5 text-center text-xs font-mono bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 shadow-xl shadow-black/30"
            placeholder="Pg"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditingPage(true);
              setPageInput(String(currentPage));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-xl border border-white/5 rounded-lg hover:bg-black/40 hover:border-white/10 transition-all duration-300 group"
          >
            <span className="text-[10px] text-white/30 font-light">Pg</span>
            <span className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
              {currentPage}
            </span>
            <span className="text-[10px] text-white/20">/ {BOOK_META.totalPages}</span>
          </button>
        )}
      </div>

      {/* ============ BOTTOM CHAPTER INFO ============ */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-500 bg-gradient-to-t from-[#0a0a0f]/95 to-transparent pt-8 pb-4 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {currentChapter && (
          <div className="text-center">
            <span className="text-xs text-white/30 font-light tracking-wide">
              {currentChapter.label}
            </span>
            <span className="text-[10px] text-white/20 mx-2">•</span>
            <span className="text-[10px] text-white/20">
              Pages {currentChapter.start}-{currentChapter.end}
            </span>
          </div>
        )}
      </div>

      {/* ============ TAP TO SHOW CONTROLS ============ */}
      <div 
        className="absolute inset-0 z-30"
        onClick={() => showControlsWithTimeout()}
        onTouchStart={() => showControlsWithTimeout()}
      />

      {/* ============ GLOBAL STYLES ============ */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes float-math {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
          25% { transform: translateY(-35px) rotate(5deg); opacity: 0.5; }
          50% { transform: translateY(-15px) rotate(-5deg); opacity: 0.4; }
          75% { transform: translateY(-45px) rotate(3deg); opacity: 0.45; }
        }
        @keyframes float-equation {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.25; }
          33% { transform: translateY(-25px) translateX(20px); opacity: 0.35; }
          66% { transform: translateY(-12px) translateX(-15px); opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float-math { animation: float-math linear infinite; }
        .animate-float-equation { animation: float-equation linear infinite; }
        
        /* Hide number input arrows */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
        
        /* Custom scrollbar */
        .scroll-smooth::-webkit-scrollbar {
          width: 4px;
        }
        .scroll-smooth::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.03);
        }
        .scroll-smooth::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
        .scroll-smooth::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }
        
        /* Menu scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
      `}</style>
    </main>
  );
}