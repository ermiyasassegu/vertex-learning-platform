import * as React from "react";
import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  meta?: string; // e.g. "PDF • 1.2 MB"
  href?: string;
  icon?: React.ReactNode;
}

export function ResourceCard({
  title,
  description,
  meta = "PDF • 1.2 MB",
  href = "#",
  icon,
  className,
  ...props
}: ResourceCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        {icon || (
          <div className="w-10 h-10 rounded-[8px] bg-[#F1F5F9] text-[#64748B] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        )}
      </div>

      <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-6 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] text-xs">
        <span className="font-medium text-[#64748B]">{meta}</span>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-[#F97316] hover:text-[#EA580C] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
