import * as React from "react";
import { BarChart2, Clock, Layers } from "lucide-react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export interface CourseCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  level?: string;
  duration?: string;
  modulesCount?: string | number;
  popular?: boolean;
}

export function CourseCard({
  icon,
  title,
  description,
  level = "Intermediate",
  duration = "18h 24m",
  modulesCount = "12 modules",
  popular = false,
  className,
  ...props
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        {icon ? (
          icon
        ) : (
          <div className="w-10 h-10 rounded-[8px] bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            N
          </div>
        )}
        {popular && <Badge variant="popular">POPULAR</Badge>}
      </div>

      <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-6 flex-1">
        {description}
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-[#64748B] pt-4 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{level}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>{typeof modulesCount === "number" ? `${modulesCount} modules` : modulesCount}</span>
        </div>
      </div>
    </div>
  );
}
