'use client';

import { ChevronDown, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Chapter {
  id: string;
  label: string;
  start: number;
  end: number;
}

interface ChapterDropdownProps {
  chapters: Chapter[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ChapterDropdown({ chapters, currentPage, onPageChange }: ChapterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find current chapter
  const currentChapter = chapters.find(
    (ch) => currentPage >= ch.start && currentPage <= ch.end
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChapterSelect = (chapter: Chapter) => {
    onPageChange(chapter.start);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      {/* Label - hidden on mobile, shown on tablet+ */}
      <div className="hidden sm:flex items-center gap-2 mb-2">
        <BookOpen size={14} className="text-blue-400" />
        <span className="text-xs text-white/40 font-medium">Jump to Chapter</span>
      </div>

      {/* ============ DROPDOWN TOGGLE BUTTON ============ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:border-white/20 shadow-lg shadow-black/20 min-w-[180px] sm:min-w-[220px]"
      >
        <span className="flex items-center gap-2 truncate">
          <BookOpen size={14} className="text-blue-400 flex-shrink-0 sm:hidden" />
          <span className="truncate">
            {currentChapter ? currentChapter.label : 'Select Chapter'}
          </span>
        </span>
        <span className="flex items-center gap-2 flex-shrink-0">
          {currentChapter && (
            <span className="hidden sm:inline text-[10px] text-blue-400/60 font-mono">
              {currentChapter.start}-{currentChapter.end}
            </span>
          )}
          <ChevronDown 
            className={`w-4 h-4 text-white/30 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </span>
      </button>

      {/* ============ DROPDOWN MENU ============ */}
      {isOpen && (
        <div className="absolute z-50 w-full sm:w-[280px] mt-2 bg-[#0d1b2a] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden max-h-[300px] overflow-y-auto animate-slide-down">
          {/* Header */}
          <div className="px-4 py-3 bg-white/5 border-b border-white/5">
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">
              Chapters
            </p>
          </div>
          
          {/* Chapter list */}
          <div className="py-1">
            {chapters.map((chapter) => {
              const isActive = currentChapter?.id === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter)}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    )}
                    <span className={isActive ? 'font-medium' : ''}>
                      {chapter.label}
                    </span>
                  </span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-blue-400' : 'text-white/20'}`}>
                    {chapter.start}-{chapter.end}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2 bg-white/5 border-t border-white/5">
            <p className="text-[9px] text-white/20 text-center">
              {chapters.length} chapters • Click to jump
            </p>
          </div>
        </div>
      )}

      {/* ============ CURRENT CHAPTER DISPLAY (Mobile) ============ */}
      {currentChapter && (
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs text-white/30">
            Current: <span className="text-blue-400 font-medium">{currentChapter.label}</span>
            <span className="text-white/20 ml-2">({currentChapter.start}-{currentChapter.end})</span>
          </span>
        </div>
      )}

      {/* ============ ANIMATION STYLES ============ */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}