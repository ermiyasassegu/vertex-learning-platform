import * as React from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "in-progress" | "completed" | "now-playing" | "locked";

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  showLabel?: boolean;
}

export function StatusIndicator({
  status,
  label,
  showLabel = true,
  className,
  ...props
}: StatusIndicatorProps) {
  const statusConfig = {
    "in-progress": {
      defaultLabel: "In Progress",
      color: "text-[#F97316]",
      icon: (
        <svg
          className="w-4 h-4 text-[#F97316]"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8" cy="8" r="6" strokeDasharray="37.7" strokeDashoffset="18.8" />
        </svg>
      ),
    },
    completed: {
      defaultLabel: "Completed",
      color: "text-[#16A34A]",
      icon: <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />,
    },
    "now-playing": {
      defaultLabel: "Now Playing",
      color: "text-[#F97316]",
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#F97316] flex items-center justify-center text-white">
          <svg className="w-2 h-2 fill-current ml-0.5" viewBox="0 0 8 8">
            <polygon points="1,1 7,4 1,7" />
          </svg>
        </div>
      ),
    },
    locked: {
      defaultLabel: "Locked",
      color: "text-[#64748B]",
      icon: <Lock className="w-4 h-4 text-[#64748B]" />,
    },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  return (
    <div
      className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}
      {...props}
    >
      <span className="flex items-center justify-center shrink-0">{config.icon}</span>
      {showLabel && <span className="text-[#0F172A]">{displayLabel}</span>}
    </div>
  );
}
