import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 8,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const pages: (number | string)[] = [1, 2, 3, "...", 8];

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1 text-sm font-medium", className)}
      {...props}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="w-9 h-9 flex items-center justify-center rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-[#64748B]"
            >
              ...
            </span>
          );
        }

        const pageNum = Number(p);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange?.(pageNum)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-[8px] transition-all cursor-pointer",
              isActive
                ? "border border-[#F97316] text-[#F97316] font-semibold bg-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="w-9 h-9 flex items-center justify-center rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
