'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax effect for hero
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  const parallaxReverse = {
    transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d1b2a] to-[#1b3a5c] text-white overflow-x-hidden">
      
      {/* ============ FLOATING MATHEMATICAL OBJECTS - ENHANCED VISIBILITY ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* ===== Large Math Symbols - More Visible ===== */}
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

        {/* ===== Floating Equations - More Visible ===== */}
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

        {/* ===== Floating Geometric Shapes - More Visible ===== */}
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
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
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          ></div>
        ))}
      </div>

      {/* ============ NAVBAR ============ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              📘
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                African Mindset
              </span>
              <span className="block text-[10px] text-white/40">Changing Lives</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href="/read/1"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 hidden md:inline-block"
            >
              Read
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 hidden md:inline-block"
            >
              About
            </Link>
            <Link
              href="/sponsor"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 hidden md:inline-block"
            >
              Sponsor
            </Link>
            <Link
              href="/read/1"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden z-10"
      >
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* ============ LEFT: BOOK COVER ============ */}
            <div
              className="w-full lg:w-3/5 flex justify-center lg:justify-end"
              style={parallaxStyle}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto lg:mx-0">
                {/* Glow rings */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
                <div className="absolute -inset-4 border border-white/5 rounded-2xl animate-spin-slow"></div>
                
                {/* Cover image with glass effect */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 transform hover:scale-[1.02] transition-all duration-700 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    src="/cover.jpg"
                    alt="Changing The Mindset Of An African Child - Cover"
                    width={900}
                    height={1260}
                    className="w-full h-auto object-contain relative z-0"
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 900px"
                  />
                  {/* Animated border glow */}
                  <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none group-hover:border-blue-500/30 transition-all duration-500"></div>
                  
                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <Link
                      href="/read/1"
                      className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      📖 Read Now
                    </Link>
                  </div>
                </div>

                {/* Decorative floating badges */}
                <div className="absolute -top-4 -right-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-xs text-white/70 animate-float-slow">
                  ✦ 130 Pages
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-xs text-white/70 animate-float-slow delay-1000">
                  ✦ 6 Chapters
                </div>
              </div>
            </div>

            {/* ============ RIGHT: BOOK INFO ============ */}
            <div
              className="w-full lg:w-2/5 text-center lg:text-left"
              style={parallaxReverse}
            >
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-blue-300 mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Available Now • Free to Read
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 animate-fade-in-up">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Changing The
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Mindset Of An
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  African Child
                </span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in-up delay-100">
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 text-white/60">
                  Grade 12
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 text-white/60">
                  Mathematics
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 text-white/60">
                  🇿🇦 isiZulu
                </span>
              </div>

              <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
                A comprehensive mathematics resource dedicated to empowering learners 
                through education in their own language.
              </p>

              {/* ============ STATS with animated counters ============ */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10 animate-fade-in-up delay-300">
                <StatCard number="130" label="Pages" icon="📄" />
                <StatCard number="6" label="Chapters" icon="📚" />
                <StatCard number="1" label="Author" icon="" />
              </div>

              {/* ============ CTA BUTTONS ============ */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
                <Link
                  href="/read/1"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg overflow-hidden shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-xl group-hover:rotate-12 transition-transform duration-300">📖</span>
                    Start Reading
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </Link>

                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform duration-300">📚</span>
                  Learn More
                </Link>
              </div>

              {/* ============ TRUST INDICATORS ============ */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm animate-fade-in-up delay-500">
                <TrustItem icon="✓" text="Free to read" color="text-emerald-400" />
                <TrustItem icon="✓" text="Mobile friendly" color="text-blue-400" />
                <TrustItem icon="✓" text="No download" color="text-purple-400" />
                <TrustItem icon="✓" text="High quality" color="text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ============ SCROLL INDICATOR ============ */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow z-20">
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* ============ CHAPTER PREVIEW SECTION ============ */}
      <section className="relative py-24 px-4 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What's Inside
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            <p className="text-white/40 mt-4 text-sm tracking-wide">
              Explore the chapters of this comprehensive mathematics book
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { chapter: "Number Patterns", pages: "4-40", icon: "🔢", gradient: "from-blue-600/20 to-blue-800/20", border: "border-blue-500/20" },
              { chapter: "Functions & Graphs", pages: "42-62", icon: "📈", gradient: "from-cyan-600/20 to-cyan-800/20", border: "border-cyan-500/20" },
              { chapter: "Coordinate Geometry", pages: "64-74", icon: "📐", gradient: "from-purple-600/20 to-purple-800/20", border: "border-purple-500/20" },
              { chapter: "Euclidean Geometry", pages: "76-94", icon: "📏", gradient: "from-orange-600/20 to-orange-800/20", border: "border-orange-500/20" },
              { chapter: "Trigonometry", pages: "96-113", icon: "🔄", gradient: "from-pink-600/20 to-pink-800/20", border: "border-pink-500/20" },
              { chapter: "Calculus", pages: "115-128", icon: "∫", gradient: "from-indigo-600/20 to-indigo-800/20", border: "border-indigo-500/20" },
            ].map((item, index) => (
              <Link
                key={item.chapter}
                href={`/read/${item.pages.split('-')[0]}`}
                className={`group relative bg-gradient-to-br ${item.gradient} backdrop-blur-sm p-8 rounded-2xl border ${item.border} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 inline-block">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                    {item.chapter}
                  </h3>
                  <p className="text-white/30 text-sm mt-1">Pages {item.pages}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/20 group-hover:text-white/60 transition-colors text-sm font-medium">
                    Read chapter
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up delay-400">
            <Link
              href="/read/1"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              📖 Read the Full Book
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ QUOTE / IMPACT SECTION ============ */}
      <section className="relative py-24 px-4 overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 text-6xl animate-float-slow">"</div>
          <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed text-white/80 animate-fade-in-up">
            A language is not just words. It's a culture, a tradition, 
            <br className="hidden sm:block" />
            and the unification of a community.
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-4 animate-fade-in-up delay-200">
            <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <p className="text-white/30 text-sm tracking-widest uppercase">— Anonymous</p>
            <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          </div>
          <div className="mt-10 max-w-2xl mx-auto text-white/40 text-sm leading-relaxed animate-fade-in-up delay-300">
            This book is dedicated to empowering African learners through 
            mathematics in their own language, isiZulu — because every child 
            deserves to learn in the language they understand best.
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative border-t border-white/5 py-12 px-4 bg-[#0a0a0f]/50 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/40 text-sm">
              © 2026 Changing The Mindset Of An African Child
            </p>
            <p className="text-white/20 text-xs mt-1">
              Dedicated to parents • Made with ❤️ in South Africa 🇿🇦
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/read/1" className="text-white/30 hover:text-white/60 transition-colors text-sm">
              Read
            </Link>
            <Link href="/about" className="text-white/30 hover:text-white/60 transition-colors text-sm">
              About
            </Link>
            <Link href="/sponsor" className="text-white/30 hover:text-white/60 transition-colors text-sm">
              Sponsor
            </Link>
            <Link href="/contact" className="text-white/30 hover:text-white/60 transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </footer>

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
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        @keyframes scroll-down {
          0% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0px); }
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
        .animate-float-slow { animation: float-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-scroll-down { animation: scroll-down 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-float-math { animation: float-math linear infinite; }
        .animate-float-equation { animation: float-equation linear infinite; }
        .animate-float-shape { animation: float-shape linear infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </main>
  );
}

// ============ STAT CARD COMPONENT ============
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  const [count, setCount] = useState(0);
  const target = parseInt(number) || 0;
  const isText = isNaN(target);

  useEffect(() => {
    if (isText) {
      setCount(0);
      return;
    }
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target, isText]);

  return (
    <div className="text-center group cursor-default">
      <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
        {isText ? number : count}
      </p>
      <p className="text-xs text-white/30 uppercase tracking-wider flex items-center justify-center gap-1">
        {icon && <span>{icon}</span>} {label}
      </p>
    </div>
  );
}

// ============ TRUST ITEM COMPONENT ============
function TrustItem({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <span className={`flex items-center gap-2 text-xs ${color}`}>
      <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">
        {icon}
      </span>
      {text}
    </span>
  );
}