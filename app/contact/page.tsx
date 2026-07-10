'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, User, MessageSquare, Send, CheckCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
        
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-all hover:scale-105 group mb-8"
        >
          <ArrowLeft size={18} className="group-hover:text-blue-400 transition-colors" />
          <span className="text-sm group-hover:text-blue-400 transition-colors">Back to Home</span>
        </Link>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* ============ LEFT: CONTACT FORM ============ */}
          <div className="lg:col-span-3">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 md:p-12">
              
              {/* Title with gradient */}
              <div className="flex items-center gap-3 mb-6">
                <Mail size={28} className="text-blue-400" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Get in Touch
                </h1>
              </div>
              
              <p className="text-white/40 text-sm mb-8">
                Have questions about the book? Want to sponsor or partner? Reach out and we'll get back to you soon.
              </p>
              
              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                      <CheckCircle size={40} className="text-white" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                  <p className="text-white/60 mb-6">Your message has been sent successfully. We'll get back to you soon!</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105"
                    >
                      ← Back Home
                    </Link>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 rounded-xl font-semibold hover:text-white hover:border-white/20 transition-all hover:scale-105"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-white/60 mb-1.5">
                        <User size={14} className="text-blue-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-white/60 mb-1.5">
                        <Mail size={14} className="text-purple-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-white/60 mb-1.5">
                      <MessageSquare size={14} className="text-pink-400" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-white/60 mb-1.5">
                      <MessageSquare size={14} className="text-cyan-400" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Your message here..."
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none placeholder:text-white/20"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 rounded-xl font-semibold hover:text-white hover:border-white/20 transition-all hover:scale-105"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ============ RIGHT: CONTACT INFO ============ */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Contact - Phone number removed */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10 p-6">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                  <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/40">Email</p>
                    <a href="mailto:diary.of.a.black.man101@gmail.com" className="text-sm text-white/80 hover:text-blue-400 transition-colors">
                      diary.of.a.black.man101@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                  <MapPin size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/40">Location</p>
                    <span className="text-sm text-white/80">South Africa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10 p-6">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/read/1"
                  className="flex items-center gap-3 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <span className="text-blue-400 group-hover:scale-110 transition-transform">📖</span>
                  <span className="text-sm group-hover:text-blue-400 transition-colors">Read the Book</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <span className="text-purple-400 group-hover:scale-110 transition-transform">📚</span>
                  <span className="text-sm group-hover:text-purple-400 transition-colors">About the Book</span>
                </Link>
                <Link
                  href="/sponsor"
                  className="flex items-center gap-3 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <span className="text-pink-400 group-hover:scale-110 transition-transform">🤝</span>
                  <span className="text-sm group-hover:text-pink-400 transition-colors">Sponsor This Work</span>
                </Link>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400/50 blur-sm animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm text-white/80">Usually responds within 24 hours</p>
                  <p className="text-xs text-white/30">We'll get back to you as soon as possible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
          <p>© 2026 Changing The Mindset Of An African Child. All rights reserved.</p>
          <p className="mt-1">Dedicated to parents • Made with ❤️ in South Africa 🇿🇦</p>
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