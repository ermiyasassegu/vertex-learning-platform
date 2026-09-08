import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CourseBreadcrumbProps {
  courseTitle: string;
  /** When set, the course title becomes a link and `current` is shown as the final crumb. */
  courseHref?: string;
  current?: string;
}

export function CourseBreadcrumb({ courseTitle, courseHref, current }: CourseBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#64748B] pt-4 pb-6 flex-wrap">
      <Link href="/" className="hover:text-[#0F172A] transition-colors">
        All Courses
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] stroke-[2]" />
      {courseHref && current ? (
        <>
          <Link
            href={courseHref}
            className="hover:text-[#0F172A] transition-colors truncate max-w-[220px]"
          >
            {courseTitle}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] stroke-[2]" />
          <span className="text-[#0F172A] font-medium">{current}</span>
        </>
      ) : (
        <span className="text-[#0F172A] font-medium truncate max-w-[320px] sm:max-w-none">
          {courseTitle}
        </span>
      )}
    </nav>
  );
}
