'use client';

import { useState, useEffect, useRef, TouchEvent } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  ZoomIn, 
  ZoomOut, 
  Home, 
  BookOpen,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface PageViewerProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PageViewer({ pageNumber, totalPages, onPageChange }: PageViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    
    resetTimer();
    const handleMouseMove = () => resetTimer();
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && pageNumber > 1) {
        handlePageChange(pageNumber - 1, 'left');
      } else if (e.key === 'ArrowRight' && pageNumber < totalPages) {
        handlePageChange(pageNumber + 1, 'right');
      } else if (e.key === 'Home' && pageNumber > 1) {
        handlePageChange(1, 'left');
      } else if (e.key === 'End' && pageNumber < totalPages) {
        handlePageChange(totalPages, 'right');
      } else if (e.key === 'Escape' && fullscreen) {
        toggleFullscreen();
      } else if (e.key === '=' || e.key === '+') {
        handleZoom(10);
      } else if (e.key === '-') {
        handleZoom(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, totalPages, fullscreen]);

  // Handle page change with animation
  const handlePageChange = (page: number, dir: 'left' | 'right') => {
    if (isFlipping || page === pageNumber) return;
    
    setDirection(dir);
    setIsFlipping(true);
    setLoading(true);
    setError(false);
    
    setTimeout(() => {
      onPageChange(page);
      setTimeout(() => {
        setIsFlipping(false);
        setDirection(null);
      }, 300);
    }, 300);
  };

  // Handle zoom
  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && pageNumber < totalPages) {
        handlePageChange(pageNumber + 1, 'right');
      } else if (diff < 0 && pageNumber > 1) {
        handlePageChange(pageNumber - 1, 'left');
      }
    }
  };

  // Format page number
  const pageStr = String(pageNumber).padStart(3, '0');
  const imagePath = `/book-pages/book-${pageStr}.png`;

  // Reset loading state when page changes
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [pageNumber]);

  // Calculate progress
  const progress = ((pageNumber - 1) / (totalPages - 1)) * 100;

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============ HEADER WITH HOME BUTTON ============ */}
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-all hover:scale-105 group"
        >
          <ArrowLeft size={16} className="group-hover:text-blue-400 transition-colors" />
          <span className="text-sm group-hover:text-blue-400 transition-colors">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <BookOpen size={14} className="text-blue-400/40" />
          <span>Reading Mode</span>
        </div>
      </div>

      {/* ============ PROGRESS BAR ============ */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-xs">
          <span className="text-white/40 font-mono">Page {pageNumber}</span>
          <span className="text-white/40 font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner shadow-black/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg shadow-blue-500/30"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ============ IMAGE CONTAINER ============ */}
      <div 
        className={`relative bg-gradient-to-br from-[#0a0a0f] via-[#0d1b2a] to-[#1b3a5c] backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/5 transition-all duration-300 ${
          fullscreen ? 'rounded-none' : ''
        }`}
        style={{ 
          minHeight: '500px',
          height: fullscreen ? '100vh' : 'auto',
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setTimeout(() => setShowControls(false), 1000)}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>

        {/* Loading state with animated shimmer */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0d1b2a] to-[#1b3a5c]">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-white/5 animate-pulse"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse"></div>
              </div>
              <p className="mt-4 text-sm text-white/40 animate-pulse">Loading page...</p>
            </div>
          </div>
        )}

        {/* Page flip animation overlay */}
        {isFlipping && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 ${
              direction === 'left' ? 'animate-slide-right' : 'animate-slide-left'
            }`} />
          </div>
        )}

        {/* Image - Using regular img tag instead of Next.js Image */}
        {!error && (
          <div 
            className="relative w-full transition-transform duration-300"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <img
              ref={imageRef as any}
              src={imagePath}
              alt={`Page ${pageNumber}`}
              className="w-full h-auto"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              draggable={false}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-[#0a0a0f] to-[#1b3a5c]">
            <div className="text-center p-8 max-w-md">
              <div className="text-6xl mb-4 animate-bounce">📄</div>
              <p className="text-red-400 text-lg font-semibold">Could not load page</p>
              <p className="text-white/40 text-sm mt-2">
                Page {pageNumber} image not found
              </p>
              <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-left text-sm">
                <p className="font-semibold text-blue-400">📌 Expected file:</p>
                <code className="block mt-1 bg-black/30 px-2 py-1 rounded text-white/60 font-mono">
                  public/book-pages/book-{pageStr}.png
                </code>
                <p className="mt-2 text-white/40">
                  Make sure your images are named correctly:
                </p>
                <ul className="list-disc list-inside mt-1 text-white/30 text-xs">
                  <li>book-001.png = Page 1</li>
                  <li>book-002.png = Page 2</li>
                  <li>... up to book-130.png = Page 130</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============ FLOATING CONTROLS ============ */}
        <div className={`absolute top-4 left-4 right-4 flex justify-between items-start transition-opacity duration-500 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Left controls - Page info with glass effect */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-xs text-white/60 shadow-lg shadow-black/20">
            <span className="font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              {pageNumber}
            </span>
            <span className="text-white/30"> / {totalPages}</span>
          </div>

          {/* Right controls - Zoom & Fullscreen with glass effect */}
          <div className="flex gap-2">
            <button
              onClick={() => handleZoom(-10)}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-2 text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-black/80 transition-all hover:scale-110 shadow-lg shadow-black/20"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1 text-xs text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-black/80 transition-all shadow-lg shadow-black/20"
            >
              {zoom}%
            </button>
            <button
              onClick={() => handleZoom(10)}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-2 text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-black/80 transition-all hover:scale-110 shadow-lg shadow-black/20"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-2 text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-black/80 transition-all hover:scale-110 shadow-lg shadow-black/20"
              title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>

        {/* ============ NAVIGATION ARROWS - GRADIENT BUTTONS ============ */}
        <div className={`absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {pageNumber > 1 && (
            <button
              onClick={() => handlePageChange(pageNumber - 1, 'left')}
              className="pointer-events-auto ml-4 p-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-110 group shadow-lg shadow-black/20"
              disabled={isFlipping}
            >
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
          {pageNumber < totalPages && (
            <button
              onClick={() => handlePageChange(pageNumber + 1, 'right')}
              className="pointer-events-auto mr-4 p-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-110 group shadow-lg shadow-black/20"
              disabled={isFlipping}
            >
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* ============ BOTTOM CONTROLS - GRADIENT BUTTONS ============ */}
        <div className={`absolute bottom-4 left-4 right-4 flex justify-center gap-2 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => setZoom(100)}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-xs text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-black/80 transition-all hover:scale-105 shadow-lg shadow-black/20"
          >
            Reset Zoom
          </button>
          <button
            onClick={() => handlePageChange(1, 'left')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-2 text-xs text-white font-medium hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 shadow-lg shadow-black/20"
            disabled={pageNumber === 1 || isFlipping}
          >
            ⟪ First
          </button>
          <button
            onClick={() => handlePageChange(totalPages, 'right')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-2 text-xs text-white font-medium hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 shadow-lg shadow-black/20"
            disabled={pageNumber === totalPages || isFlipping}
          >
            Last ⟫
          </button>
        </div>

        {/* Click to show controls */}
        <div 
          className="absolute inset-0 cursor-pointer z-0"
          onClick={() => setShowControls(prev => !prev)}
        />
      </div>

      {/* ============ KEYBOARD SHORTCUTS HINT ============ */}
      <div className="mt-4 text-center text-xs text-white/20 select-none flex flex-wrap items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">←</kbd>
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">→</kbd>
          <span className="text-white/30">Navigate</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">Home</kbd>
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">End</kbd>
          <span className="text-white/30">First/Last</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">+</kbd>
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">-</kbd>
          <span className="text-white/30">Zoom</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[10px] font-mono">F</kbd>
          <span className="text-white/30">Fullscreen</span>
        </span>
      </div>

      {/* ============ GLOBAL STYLES ============ */}
      <style jsx>{`
        @keyframes slide-left {
          0% { transform: translateX(0); opacity: 0.5; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slide-right {
          0% { transform: translateX(0); opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-in forwards;
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}