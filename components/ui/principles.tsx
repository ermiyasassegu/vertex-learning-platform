import * as React from "react";
import { Eye, LayoutGrid, Target, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PrincipleItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultPrinciples: PrincipleItem[] = [
  {
    icon: <Eye className="w-6 h-6 text-[#0F172A]" />,
    title: "Clarity First",
    description: "Every element should communicate clearly.",
  },
  {
    icon: <LayoutGrid className="w-6 h-6 text-[#0F172A]" />,
    title: "Consistency",
    description: "Use components and patterns consistently across the platform.",
  },
  {
    icon: <Target className="w-6 h-6 text-[#0F172A]" />,
    title: "Focus & Calm",
    description: "Remove noise and help learners focus on what matters.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-[#0F172A]" />,
    title: "Accessible",
    description: "Design with accessibility and inclusivity in mind.",
  },
];

export interface PrinciplesProps extends React.HTMLAttributes<HTMLDivElement> {
  principles?: PrincipleItem[];
}

export function Principles({
  principles = defaultPrinciples,
  className,
  ...props
}: PrinciplesProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        className
      )}
      {...props}
    >
      {principles.map((item, index) => (
        <div key={index} className="flex items-start gap-3.5">
          <div className="shrink-0 p-1">{item.icon}</div>
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
