import * as React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types";

interface CourseCoverPosterProps {
  coverImage?: SanityImage;
  title: string;
  isNextJsCourse?: boolean;
}

export function CourseCoverPoster({
  coverImage,
  title,
  isNextJsCourse = true,
}: CourseCoverPosterProps) {
  // If a real uploaded Sanity cover image exists and it's not the default placeholder
  const imageUrl = coverImage?.asset ? urlFor(coverImage).width(800).height(800).url() : null;

  if (imageUrl && !isNextJsCourse) {
    return (
      <div className="relative w-full aspect-square max-w-[380px] rounded-[24px] overflow-hidden border border-[#E2E8F0] shadow-sm bg-black">
        <Image
          src={imageUrl}
          alt={coverImage?.alt || title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>
    );
  }

  // Next.js Metallic "N" Logo Cover matching vertex-course.png exactly
  return (
    <div className="relative w-full aspect-square max-w-[380px] rounded-[24px] bg-[#020408] border border-[#1E293B]/80 shadow-md flex items-center justify-center p-8 select-none overflow-hidden">
      {/* Subtle ambient gradient highlight behind the logo */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />

      {/* High-fidelity 3D metallic Next.js Logo SVG */}
      <svg
        viewBox="0 0 180 180"
        className="w-48 h-48 sm:w-56 sm:h-56 relative z-10 drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Diagonal stem gradient */}
          <linearGradient id="diagSheen" x1="50" y1="30" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="65%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Left vertical stem gradient */}
          <linearGradient id="leftStem" x1="40" y1="30" x2="65" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Right vertical stem gradient */}
          <linearGradient id="rightStem" x1="120" y1="30" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* Left Vertical Bar */}
        <rect
          x="36"
          y="28"
          width="24"
          height="124"
          rx="3"
          fill="url(#leftStem)"
        />

        {/* Right Vertical Bar */}
        <rect
          x="120"
          y="28"
          width="24"
          height="124"
          rx="3"
          fill="url(#rightStem)"
        />

        {/* Diagonal Cross Bar with metallic reflection cut */}
        <path
          d="M38 32 L132 152 H144 L50 32 Z"
          fill="url(#diagSheen)"
        />

        {/* Diagonal Bevel Highlight */}
        <path
          d="M50 32 L138 144"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-90"
        />
      </svg>
    </div>
  );
}
