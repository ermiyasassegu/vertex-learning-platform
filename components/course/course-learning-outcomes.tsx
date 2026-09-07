import * as React from "react";
import type { LearningOutcome } from "@/sanity/types";

interface CourseLearningOutcomesProps {
  outcomes?: LearningOutcome[];
}

// Custom terracotta outline icons matching vertex-course.png exactly
function LayersOutlineIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0 text-[#D96338]">
      {/* Top Diamond */}
      <path d="M22 6L38 14L22 22L6 14L22 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Middle Layer */}
      <path d="M6 21L22 29L38 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom Layer */}
      <path d="M6 28L22 36L38 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseOutlineIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0 text-[#D96338]">
      {/* Top ellipse */}
      <ellipse cx="22" cy="12" rx="15" ry="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Middle line & wall */}
      <path d="M7 12V22C7 25.3137 13.7157 28 22 28C30.2843 28 37 25.3137 37 22V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom line & wall */}
      <path d="M7 22V32C7 35.3137 13.7157 38 22 38C30.2843 38 37 35.3137 37 32V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpeedometerOutlineIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0 text-[#D96338]">
      {/* Gauge arc */}
      <path d="M9 31C6.5 27.5 5 23 5 18C5 8.611 12.611 1 22 1C31.389 1 39 8.611 39 18C39 23 37.5 27.5 35 31" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" transform="translate(0, 4)" />
      {/* Center needle base */}
      <circle cx="22" cy="26" r="2.5" fill="currentColor" />
      {/* Needle pointing up-left */}
      <path d="M22 26L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tick marks */}
      <path d="M12 21L14 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 14L16.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 11V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29 14L27.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 21L30 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloudOutlineIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0 text-[#D96338]">
      <path
        d="M10 32C6.686 32 4 29.314 4 26C4 22.95 6.27 20.44 9.27 20.06C10.15 13.79 15.51 9 22 9C29.28 9 35.24 14.54 35.94 21.68C38.27 22.47 40 24.69 40 27.33C40 30.46 37.46 33 34.33 33H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getOutcomeIcon(iconName?: string, index: number = 0) {
  const normalized = (iconName || "").toLowerCase();
  if (normalized.includes("layer")) return <LayersOutlineIcon />;
  if (normalized.includes("data") || normalized.includes("cache") || normalized.includes("database"))
    return <DatabaseOutlineIcon />;
  if (normalized.includes("gauge") || normalized.includes("speed") || normalized.includes("perf"))
    return <SpeedometerOutlineIcon />;
  if (normalized.includes("cloud") || normalized.includes("deploy") || normalized.includes("scale"))
    return <CloudOutlineIcon />;

  // Fallbacks by index
  switch (index % 4) {
    case 0:
      return <LayersOutlineIcon />;
    case 1:
      return <DatabaseOutlineIcon />;
    case 2:
      return <SpeedometerOutlineIcon />;
    default:
      return <CloudOutlineIcon />;
  }
}

export function CourseLearningOutcomes({ outcomes }: CourseLearningOutcomesProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="w-full pb-12">
      <div className="bg-white/70 backdrop-blur-xs border border-[#E2E8F0] rounded-[20px] p-6 sm:p-8 shadow-2xs">
        <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#0F172A] mb-6">
          What you&apos;ll learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {outcomes.map((outcome, idx) => (
            <div
              key={outcome._key || idx}
              className="border border-[#E2E8F0] rounded-[16px] bg-white p-5 sm:p-6 flex items-start gap-4 sm:gap-5 shadow-2xs hover:border-[#CBD5E1] transition-colors"
            >
              <div className="mt-0.5">{getOutcomeIcon(outcome.icon, idx)}</div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                  {outcome.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {outcome.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
