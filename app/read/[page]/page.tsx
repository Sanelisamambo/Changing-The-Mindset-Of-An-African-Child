'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen, ArrowLeft } from 'lucide-react';
import PageViewer from '@/components/reader/PageViewer';
import Navigation from '@/components/reader/Navigation';
import ChapterDropdown from '@/components/reader/ChapterDropdown';
import { BOOK_META } from '@/lib/book-meta';

interface ReaderPageProps {
  params: {
    page: string;
  };
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const router = useRouter();
  // Ensure page is a number, default to 1 if invalid
  const initialPage = parseInt(params.page) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update if params change
  useEffect(() => {
    const newPage = parseInt(params.page) || 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [params.page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/read/${page}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d1b2a] to-[#1b3a5c] text-white overflow-x-hidden">
      
      {/* ============ FLOATING MATHEMATICAL OBJECTS ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* ===== Large Math Symbols ===== */}
        <div className="absolute top-10 left-[5%] text-7xl text-blue-400/30 font-serif animate-float-math" style={{ animationDuration: '15s', animationDelay: '0s' }}>
          π
        </div>
        <div className="absolute top-20 right-[8%] text-8xl text-purple-400/30 font-serif animate-float-math" style={{ animationDuration: '18s', animationDelay: '2s' }}>
          ∑
        </div>
        <div className="absolute top-1/3 left-[3%] text-6xl text-cyan-400/30 font-serif animate-float-math" style={{ animationDuration: '20s', animationDelay: '4s' }}>
          √
        </div>
        <div className="absolute top-1/2 right-[4%] text-7xl text-pink-400/30 font-serif animate-float-math" style={{ animationDuration: '16s', animationDelay: '1s' }}>
          ∫
        </div>
        <div className="absolute bottom-1/3 left-[8%] text-8xl text-emerald-400/30 font-serif animate-float-math" style={{ animationDuration: '22s', animationDelay: '3s' }}>
          ∞
        </div>
        <div className="absolute bottom-20 right-[6%] text-7xl text-amber-400/30 font-serif animate-float-math" style={{ animationDuration: '19s', animationDelay: '5s' }}>
          θ
        </div>
        <div className="absolute top-2/3 left-[12%] text-6xl text-indigo-400/30 font-serif animate-float-math" style={{ animationDuration: '17s', animationDelay: '2.5s' }}>
          Δ
        </div>
        <div className="absolute bottom-1/4 right-[12%] text-6xl text-rose-400/30 font-serif animate-float-math" style={{ animationDuration: '21s', animationDelay: '3.5s' }}>
          ≠
        </div>

        {/* ===== Extra Math Symbols ===== */}
        <div className="absolute top-[15%] left-[45%] text-5xl text-orange-400/30 font-serif animate-float-math" style={{ animationDuration: '14s', animationDelay: '6s' }}>
          ∂
        </div>
        <div className="absolute bottom-[20%] right-[40%] text-5xl text-teal-400/30 font-serif animate-float-math" style={{ animationDuration: '16s', animationDelay: '7s' }}>
          λ
        </div>
        <div className="absolute top-[10%] right-[50%] text-4xl text-sky-400/30 font-serif animate-float-math" style={{ animationDuration: '13s', animationDelay: '8s' }}>
          φ
        </div>
        <div className="absolute bottom-[30%] left-[50%] text-4xl text-violet-400/30 font-serif animate-float-math" style={{ animationDuration: '15s', animationDelay: '9s' }}>
          μ
        </div>
        <div className="absolute top-1/4 left-[60%] text-5xl text-blue-400/25 font-serif animate-float-math" style={{ animationDuration: '18s', animationDelay: '2s' }}>
          ≈
        </div>
        <div className="absolute bottom-2/3 right-[55%] text-4xl text-purple-400/25 font-serif animate-float-math" style={{ animationDuration: '20s', animationDelay: '4s' }}>
          ±
        </div>

        {/* ===== More Integrals & Calculus Symbols ===== */}
        <div className="absolute top-[5%] left-[35%] text-5xl text-blue-400/25 font-serif animate-float-math" style={{ animationDuration: '16s', animationDelay: '1.5s' }}>
          ∮
        </div>
        <div className="absolute bottom-[15%] right-[25%] text-5xl text-purple-400/25 font-serif animate-float-math" style={{ animationDuration: '19s', animationDelay: '3s' }}>
          ∬
        </div>
        <div className="absolute top-[40%] left-[75%] text-4xl text-cyan-400/25 font-serif animate-float-math" style={{ animationDuration: '17s', animationDelay: '4.5s' }}>
          ∭
        </div>
        <div className="absolute bottom-[60%] left-[5%] text-5xl text-pink-400/25 font-serif animate-float-math" style={{ animationDuration: '21s', animationDelay: '2s' }}>
          ∇
        </div>

        {/* ===== Floating Equations ===== */}
        <div className="absolute top-1/4 left-[15%] text-xl text-blue-400/20 font-mono animate-float-equation" style={{ animationDuration: '25s', animationDelay: '0s' }}>
          E = mc²
        </div>
        <div className="absolute top-2/3 right-[18%] text-xl text-purple-400/20 font-mono animate-float-equation" style={{ animationDuration: '28s', animationDelay: '3s' }}>
          a² + b² = c²
        </div>
        <div className="absolute bottom-1/3 left-[20%] text-lg text-cyan-400/20 font-mono animate-float-equation" style={{ animationDuration: '26s', animationDelay: '1.5s' }}>
          f(x) = ∫ x² dx
        </div>
        <div className="absolute top-3/4 right-[15%] text-lg text-pink-400/20 font-mono animate-float-equation" style={{ animationDuration: '30s', animationDelay: '4s' }}>
          Σ n² = n(n+1)(2n+1)/6
        </div>
        <div className="absolute top-[5%] left-[55%] text-base text-amber-400/20 font-mono animate-float-equation" style={{ animationDuration: '27s', animationDelay: '2s' }}>
          d/dx (x^n) = nx^(n-1)
        </div>
        <div className="absolute bottom-[10%] left-[45%] text-base text-emerald-400/20 font-mono animate-float-equation" style={{ animationDuration: '29s', animationDelay: '5s' }}>
          ∫₀^∞ e^(-x²) dx = √π/2
        </div>

        {/* ===== More Integral Equations ===== */}
        <div className="absolute top-[20%] right-[35%] text-base text-indigo-400/20 font-mono animate-float-equation" style={{ animationDuration: '24s', animationDelay: '6s' }}>
          ∫ u dv = uv - ∫ v du
        </div>
        <div className="absolute bottom-[25%] left-[55%] text-base text-rose-400/20 font-mono animate-float-equation" style={{ animationDuration: '26s', animationDelay: '7s' }}>
          ∮ F · dr = ∬ (∇ × F) · dS
        </div>
        <div className="absolute top-[60%] right-[60%] text-base text-teal-400/20 font-mono animate-float-equation" style={{ animationDuration: '28s', animationDelay: '8s' }}>
          ∫ₐᵇ f(x) dx = F(b) - F(a)
        </div>

        {/* ===== Floating Geometric Shapes ===== */}
        <div className="absolute top-5 left-[20%] w-16 h-16 border-2 border-blue-400/20 rounded-full animate-float-shape" style={{ animationDuration: '12s', animationDelay: '0s' }}></div>
        <div className="absolute top-1/2 right-[25%] w-20 h-20 border-2 border-purple-400/20 rotate-45 animate-float-shape" style={{ animationDuration: '14s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-[30%] w-12 h-12 border-2 border-cyan-400/20 rounded-full animate-float-shape" style={{ animationDuration: '16s', animationDelay: '4s' }}></div>
        <div className="absolute top-2/3 right-[30%] w-14 h-14 border-2 border-emerald-400/20 rotate-12 animate-float-shape" style={{ animationDuration: '18s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-[40%] w-10 h-10 border-2 border-pink-400/20 rounded-full animate-float-shape" style={{ animationDuration: '20s', animationDelay: '3s' }}></div>

        {/* ===== Small Dot Particles ===== */}
        <div className="absolute top-[40%] left-[70%] w-1 h-1 bg-blue-400/40 rounded-full animate-float-shape" style={{ animationDuration: '8s', animationDelay: '0s' }}></div>
        <div className="absolute bottom-[40%] right-[70%] w-1 h-1 bg-purple-400/40 rounded-full animate-float-shape" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
        <div className="absolute top-[60%] left-[80%] w-1 h-1 bg-cyan-400/40 rounded-full animate-float-shape" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
      </div>

      {/* ============ ANIMATED BACKGROUND PARTICLES ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            }}
          ></div>
        ))}
      </div>

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        
        {/* ============ HEADER ============ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Left: Home Link + Title */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/40 hover:text-white transition-all hover:scale-105 group"
              title="Back to Home"
            >
              <ArrowLeft size={20} className="group-hover:text-blue-400 transition-colors" />
              <span className="text-sm group-hover:text-blue-400 transition-colors hidden sm:inline">Home</span>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-blue-400" />
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {BOOK_META.title}
              </h1>
            </div>
          </div>
          
          {/* Right: Chapter Dropdown */}
          <ChapterDropdown
            chapters={BOOK_META.chapters}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* ============ NAVIGATION - TOP ============ */}
        <Navigation
          currentPage={currentPage}
          totalPages={BOOK_META.totalPages}
          onPageChange={handlePageChange}
        />

        {/* ============ PAGE VIEWER ============ */}
        <PageViewer
          pageNumber={currentPage}
          totalPages={BOOK_META.totalPages}
          onPageChange={handlePageChange}
        />

        {/* ============ NAVIGATION - BOTTOM ============ */}
        <Navigation
          currentPage={currentPage}
          totalPages={BOOK_META.totalPages}
          onPageChange={handlePageChange}
        />

        {/* ============ FOOTER ============ */}
        <footer className="mt-8 pt-4 border-t border-white/5 text-center text-white/20 text-xs">
          <p>© 2026 Changing The Mindset Of An African Child. All rights reserved.</p>
          <p className="mt-1 text-[10px] text-white/10">Made with ❤️ in South Africa 🇿🇦</p>
        </footer>
      </div>

      {/* ============ GLOBAL STYLES ============ */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-math {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.25; }
          25% { transform: translateY(-35px) rotate(5deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(-5deg); opacity: 0.3; }
          75% { transform: translateY(-45px) rotate(3deg); opacity: 0.35; }
        }
        @keyframes float-equation {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          33% { transform: translateY(-25px) translateX(20px); opacity: 0.25; }
          66% { transform: translateY(-12px) translateX(-15px); opacity: 0.2; }
        }
        @keyframes float-shape {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(60deg); opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-float-math { animation: float-math linear infinite; }
        .animate-float-equation { animation: float-equation linear infinite; }
        .animate-float-shape { animation: float-shape linear infinite; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </main>
  );
}