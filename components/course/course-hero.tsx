"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart2, Clock, FileText, Users, ArrowRight, Bookmark } from "lucide-react";
import { CourseCoverPoster } from "./course-cover-poster";
import { formatDuration } from "@/sanity/lib/helpers";
import type { CourseDetailData } from "@/sanity/types";
import posthog from "posthog-js";

interface CourseHeroProps {
  course: CourseDetailData;
}

function formatStudentCount(count?: number): string {
  if (!count) return "0 students";
  if (count >= 1000) {
    const k = (count / 1000).toFixed(1);
    return `${k.endsWith(".0") ? k.slice(0, -2) : k}k students`;
  }
  return `${count} students`;
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CourseHero({ course }: CourseHeroProps) {
  const isNextJs =
    course.slug.includes("nextjs") ||
    course.slug.includes("next-js") ||
    course.title.toLowerCase().includes("next.js");

  // First lesson link if available
  const firstLessonSlug =
    course.modules?.[0]?.lessons?.[0]?.slug || "";
  const continueLink = firstLessonSlug
    ? `/courses/${course.slug}/lessons/${firstLessonSlug}`
    : "#modules";

  return (
    <section className="w-full pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
        {/* Left Column: Course Cover Poster */}
        <div className="w-full flex justify-center lg:justify-start">
          <CourseCoverPoster
            coverImage={course.coverImage}
            title={course.title}
            isNextJsCourse={isNextJs}
          />
        </div>

        {/* Right Column: Course Info & Actions */}
        <div className="flex flex-col items-start space-y-5 lg:pt-1">
          {/* Popular Badge */}
          {course.isPopular && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] text-xs font-semibold tracking-wider uppercase bg-[#FFF1EB] text-[#EA580C]">
              POPULAR
            </span>
          )}

          {/* Course Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0F172A] tracking-tight leading-[1.15]">
            {course.title}
          </h1>

          {/* Course Summary */}
          <p className="text-base sm:text-[17px] text-[#64748B] leading-relaxed max-w-2xl">
            {course.summary}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-7 text-xs sm:text-sm text-[#64748B] pt-1 pb-2 font-normal">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
              <span>{capitalize(course.level || "Intermediate")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
              <span>{formatDuration(course.totalDurationSeconds) || "18h 24m"}</span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
              <span>{course.moduleCount || course.modules?.length || 12} modules</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
              <span>{formatStudentCount(course.studentCount || 2100)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href={continueLink}
              onClick={() =>
                posthog.capture("course_continue_learning_clicked", {
                  course_slug: course.slug,
                  course_title: course.title,
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D96338] hover:bg-[#C2542D] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99]"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>

            <button
              type="button"
              onClick={() =>
                posthog.capture("course_bookmarked", {
                  course_slug: course.slug,
                  course_title: course.title,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0F172A] font-medium text-sm sm:text-base shadow-2xs transition-all duration-150 cursor-pointer"
            >
              <Bookmark className="w-4 h-4 stroke-[1.8] text-[#64748B]" />
              <span>Bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
