"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CourseProgressBarProps {
  progressPercentage?: number;
  continueLink?: string;
}

export function CourseProgressBar({
  progressPercentage = 35,
  continueLink = "#modules",
}: CourseProgressBarProps) {
  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[1000px] bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-[20px] shadow-lg px-6 py-4 flex items-center justify-between gap-6 sm:gap-10 transition-all duration-200">
        
        {/* Left: Progress Info */}
        <div className="shrink-0">
          <p className="text-xs text-[#64748B] font-normal leading-tight">
            Your Progress
          </p>
          <p className="text-sm sm:text-base font-semibold text-[#0F172A] mt-0.5">
            {progressPercentage}% complete
          </p>
        </div>

        {/* Center: Progress Bar Track */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#D96338] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Right: Continue Learning Action */}
        <div className="shrink-0">
          <Link
            href={continueLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#D96338] hover:bg-[#C2542D] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99]"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
