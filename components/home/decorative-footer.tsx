import * as React from "react";

export function DecorativeFooter() {
  // Bar heights matching the rhythm in vertex-home.png
  const bars = [
    { height: 40, opacity: 0.35 },
    { height: 65, opacity: 0.5 },
    { height: 95, opacity: 0.65 },
    { height: 130, opacity: 0.8 },
    { height: 160, opacity: 0.9 },
    { height: 140, opacity: 0.8 },
    { height: 100, opacity: 0.6 },
    { height: 75, opacity: 0.5 },
    { height: 110, opacity: 0.7 },
    { height: 155, opacity: 0.85 },
    { height: 125, opacity: 0.75 },
    { height: 85, opacity: 0.55 },
    { height: 115, opacity: 0.7 },
    { height: 160, opacity: 0.9 },
    { height: 135, opacity: 0.8 },
    { height: 90, opacity: 0.6 },
  ];

  return (
    <div className="w-full overflow-hidden pointer-events-none select-none relative mt-8">
      {/* Soft gradient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FED7AA]/30 via-[#FFEEE5]/20 to-transparent z-10" />

      <div className="max-w-[1440px] mx-auto flex items-end justify-between px-2 sm:px-6 h-36 sm:h-44 md:h-52">
        {bars.map((bar, index) => (
          <div
            key={index}
            style={{
              height: `${bar.height}%`,
              opacity: bar.opacity,
            }}
            className="flex-1 mx-0.5 sm:mx-1 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-[#FED7AA] rounded-t-[4px] sm:rounded-t-[6px] transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
