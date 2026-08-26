"use client";

import * as React from "react";
import { Search, ArrowRight } from "lucide-react";

export function HeroSection() {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Focus search input on Cmd+K or Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full pt-12 pb-14 px-4 sm:px-8 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-7">
        
        {/* Pill Tag: INTELLIGENT LEARNING */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest text-[#F97316] bg-[#FFEEE5] border border-[#FED7AA] uppercase shadow-xs">
          INTELLIGENT LEARNING
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] font-bold text-[#0F172A] leading-[1.12] tracking-tight">
          Search your learning
          <br />
          in plain English.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#64748B] max-w-lg leading-relaxed font-normal">
          Vertex understands what you want to learn and
          <br className="hidden sm:inline" /> finds the exact lessons across all your courses.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-1">
          <a
            href="#courses"
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-base font-medium px-7 py-3 rounded-[10px] shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>

        {/* Search Bar with ⌘ K */}
        <div className="w-full max-w-2xl pt-5">
          <div
            onClick={() => searchInputRef.current?.focus()}
            className="group flex items-center bg-white border border-[#E2E8F0] rounded-[14px] px-4 py-3.5 shadow-sm hover:border-[#CBD5E1] focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all duration-200 cursor-text"
          >
            <Search className="w-5 h-5 text-[#64748B] group-focus-within:text-[#F97316] transition-colors shrink-0 mr-3.5 stroke-[2]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Ask anything about your learning..."
              className="w-full bg-transparent text-sm sm:text-base text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
            />
            <div className="hidden sm:flex items-center gap-1 shrink-0 ml-2">
              <kbd className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-medium font-mono text-[#64748B] bg-[#FAFAFC] border border-[#E2E8F0] rounded-[6px] shadow-2xs select-none">
                ⌘ K
              </kbd>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
