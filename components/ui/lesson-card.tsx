import * as React from "react";
import { Play, ExternalLink } from "lucide-react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export interface LessonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: "video" | "lesson";
  title: string;
  description: string;
  meta: string; // e.g. "Lesson 5.1 • 12:45" or "Module 5"
  actionLabel?: string;
  onActionClick?: () => void;
}

export function LessonCard({
  type = "video",
  title,
  description,
  meta,
  actionLabel,
  onActionClick,
  className,
  ...props
}: LessonCardProps) {
  const isVideo = type === "video";
  const defaultActionLabel = isVideo ? "Watch from 12:45" : "View lesson";

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200",
        className
      )}
      {...props}
    >
      <div className="mb-3">
        <Badge variant={isVideo ? "video" : "lesson"}>
          {isVideo ? "VIDEO" : "LESSON"}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-6 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] text-xs">
        <span className="font-medium text-[#64748B]">{meta}</span>

        <button
          type="button"
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 font-medium text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer"
        >
          {isVideo ? (
            <>
              <span>{actionLabel || defaultActionLabel}</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </>
          ) : (
            <>
              <span>{actionLabel || defaultActionLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
