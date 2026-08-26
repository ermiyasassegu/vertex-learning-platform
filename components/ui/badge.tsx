import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "video" | "lesson" | "popular" | "outline";
}

export function Badge({
  className,
  variant = "video",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    video: "bg-[#FFEEE5] text-[#F97316] border border-[#FED7AA]/40",
    lesson: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/40",
    popular: "bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]/40",
    outline: "bg-white text-[#64748B] border border-[#E2E8F0]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase rounded-[4px] leading-tight select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
