"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BarChart2, Clock, FileText } from "lucide-react";
import { formatDuration } from "@/sanity/lib/helpers";
import type { CourseCardData } from "@/sanity/types";

// Next.js Logo Component
function NextJsIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-black text-white flex items-center justify-center font-serif text-2xl font-black shadow-sm shrink-0 select-none">
      <span className="font-bold tracking-tight">N</span>
    </div>
  );
}

// Docker Whale Logo Component matching the UI illustration
function DockerIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0 select-none">
      <svg
        width="48"
        height="40"
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        {/* Container Boxes */}
        <g stroke="#0F172A" strokeWidth="1.2" fill="#38BDF8">
          {/* Row 1 (top) */}
          <rect x="23" y="10" width="6" height="5" rx="1" fill="#7DD3FC" />
          {/* Row 2 (middle) */}
          <rect x="15" y="16" width="6" height="5" rx="1" fill="#7DD3FC" />
          <rect x="23" y="16" width="6" height="5" rx="1" fill="#38BDF8" />
          <rect x="31" y="16" width="6" height="5" rx="1" fill="#0284C7" />
          {/* Row 3 (bottom containers) */}
          <rect x="7" y="22" width="6" height="5" rx="1" fill="#7DD3FC" />
          <rect x="15" y="22" width="6" height="5" rx="1" fill="#38BDF8" />
          <rect x="23" y="22" width="6" height="5" rx="1" fill="#0284C7" />
          <rect x="31" y="22" width="6" height="5" rx="1" fill="#0369A1" />
        </g>
        {/* Whale Body */}
        <path
          d="M3 27C3 27 6 35 18 36C30 37 42 34 46 29C48 26.5 49 24 51 25C52.5 25.8 53 28 50 31C45 36 34 41 18 40C6 39 1 31 1 29C1 27 3 27 3 27Z"
          fill="#0284C7"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Whale Eye */}
        <circle cx="10" cy="30" r="1.5" fill="#FFFFFF" />
        <circle cx="10" cy="30" r="0.75" fill="#0F172A" />
        {/* Whale Spout / Tail fin */}
        <path
          d="M48 25C51 21 54 22 53 20C51 18 47 21 46 23"
          stroke="#0F172A"
          strokeWidth="1.2"
          fill="#38BDF8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// TypeScript Logo Component
function TypeScriptIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#3178C6] text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0 select-none">
      <span className="font-sans tracking-tight">TS</span>
    </div>
  );
}

function DefaultCourseIcon({ title }: { title: string }) {
  const initial = (title || "C").charAt(0).toUpperCase();
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0 select-none">
      <span>{initial}</span>
    </div>
  );
}

function getCourseIcon(slug: string = "", title: string = "") {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();

  if (s.includes("next") || t.includes("next.js")) {
    return <NextJsIcon />;
  }
  if (s.includes("docker") || t.includes("docker") || s.includes("devops") || t.includes("kubernetes")) {
    return <DockerIcon />;
  }
  if (s.includes("typescript") || t.includes("typescript")) {
    return <TypeScriptIcon />;
  }
  return <DefaultCourseIcon title={title} />;
}

function capitalize(str?: string): string {
  if (!str) return "Intermediate";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface CourseGridProps {
  courses?: CourseCardData[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  // If courses fetched from Sanity, prioritize the 3 featured showcase courses
  // (Next.js, Docker, TypeScript) matching the home page UI design exactly
  const displayCourses = React.useMemo(() => {
    if (!courses || courses.length === 0) {
      return [];
    }

    const nextCourse =
      courses.find((c) => c.slug === "nextjs-for-production") ||
      courses.find((c) => c.slug.includes("next"));
    const dockerCourse =
      courses.find((c) => c.slug === "docker-essentials") ||
      courses.find((c) => c.slug.includes("docker"));
    const tsCourse =
      courses.find((c) => c.slug === "typescript-deep-dive") ||
      courses.find((c) => c.slug.includes("typescript"));

    const ordered: CourseCardData[] = [];
    if (nextCourse) ordered.push(nextCourse);
    if (dockerCourse) ordered.push(dockerCourse);
    if (tsCourse) ordered.push(tsCourse);

    // If any are missing, fill from remaining courses
    for (const c of courses) {
      if (ordered.length >= 3) break;
      if (!ordered.some((o) => o._id === c._id)) {
        ordered.push(c);
      }
    }

    return ordered;
  }, [courses]);

  return (
    <section id="courses" className="w-full pt-4 pb-12 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
            All Courses
          </h2>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course) => (
            <Link
              key={course._id || course.slug}
              href={`/courses/${course.slug}`}
              className="group relative flex flex-col justify-between bg-white border border-[#E2E8F0] rounded-[16px] p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 cursor-pointer"
            >
              <div>
                {/* Course Icon */}
                <div className="mb-6">{getCourseIcon(course.slug, course.title)}</div>

                {/* Course Title */}
                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors mb-3 leading-snug">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-sm text-[#64748B] leading-relaxed mb-8">
                  {course.summary}
                </p>
              </div>

              {/* Card Footer Metadata */}
              <div className="flex items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#F1F5F9] font-normal">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 stroke-[1.8] shrink-0 text-[#94A3B8]" />
                  <span>{capitalize(course.level)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 stroke-[1.8] shrink-0 text-[#94A3B8]" />
                  <span>{formatDuration(course.totalDurationSeconds)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 stroke-[1.8] shrink-0 text-[#94A3B8]" />
                  <span>{course.moduleCount || 0} modules</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
