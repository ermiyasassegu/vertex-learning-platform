import * as React from "react";
import { Star } from "lucide-react";

export function WeeklyBanner() {
  return (
    <div className="w-full py-8 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center gap-4 text-center">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        
        <div className="flex items-center gap-2 text-sm text-[#475569] font-normal shrink-0 px-2">
          <Star className="w-4 h-4 text-[#F97316] stroke-[1.8]" />
          <span>New courses and lessons added every week.</span>
        </div>

        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>
    </div>
  );
}
