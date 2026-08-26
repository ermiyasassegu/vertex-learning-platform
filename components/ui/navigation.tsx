import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface VertexLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

export function VertexLogo({ size = 28, showText = true, className }: VertexLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M6 8L16 26L26 8H20L16 16L12 8H6Z"
          fill="#F97316"
        />
        <path
          d="M16 4L23 16H18.5L16 11.5L13.5 16H9L16 4Z"
          fill="#FB923C"
        />
      </svg>
      {showText && (
        <span className="font-bold text-xl tracking-tight text-[#0F172A]">
          Vertex
        </span>
      )}
    </div>
  );
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  activeItem?: "courses" | "my-learning";
}

export function Navigation({
  activeItem = "courses",
  className,
  ...props
}: NavigationProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between py-4 px-6 bg-white border-b border-[#E2E8F0] rounded-[16px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-8">
        <VertexLogo />

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#"
            className={cn(
              "transition-colors",
              activeItem === "courses"
                ? "text-[#F97316] font-semibold"
                : "text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            Courses
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors",
              activeItem === "my-learning"
                ? "text-[#F97316] font-semibold"
                : "text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            My Learning
          </Link>
        </div>
      </div>
    </nav>
  );
}
