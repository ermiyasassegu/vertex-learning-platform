import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn("flex items-center gap-2 text-sm text-[#64748B]", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-[#94A3B8] shrink-0" />}
            {isLast || !item.href ? (
              <span className={cn(isLast ? "text-[#0F172A] font-medium" : "text-[#64748B]")}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="hover:text-[#0F172A] transition-colors"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
