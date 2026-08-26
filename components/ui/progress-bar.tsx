import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  label,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const displayLabel = label || `${Math.round(percentage)}% complete`;

  return (
    <div className={cn("flex items-center gap-4 w-full", className)} {...props}>
      <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#F97316] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-[#0F172A] whitespace-nowrap">
          {displayLabel}
        </span>
      )}
    </div>
  );
}
