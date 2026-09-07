"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";
import { formatDuration } from "@/sanity/lib/helpers";
import type { CourseDetailData } from "@/sanity/types";

interface CourseCurriculumProps {
  course: CourseDetailData;
}

export function CourseCurriculum({ course }: CourseCurriculumProps) {
  const [showAll, setShowAll] = React.useState(false);
  const [openModules, setOpenModules] = React.useState<Record<number, boolean>>({});

  const modules = course.modules || [];
  const initialLimit = 6;
  const hasMore = modules.length > initialLimit;
  const visibleModules = showAll ? modules : modules.slice(0, initialLimit);

  const toggleModule = (index: number) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="modules" className="w-full pb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6">
        <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#0F172A]">
          Course Content
        </h2>
        <span className="text-sm text-[#64748B] font-normal">
          {modules.length} modules &bull;{" "}
          {formatDuration(course.totalDurationSeconds) || "18h 24m"}
        </span>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {visibleModules.map((mod, mIdx) => {
          const isOpen = !!openModules[mIdx];
          const moduleDurationSeconds = (mod.lessons || []).reduce(
            (sum, l) => sum + (l.duration || 0),
            0
          );
          const formattedDuration = formatDuration(moduleDurationSeconds);

          return (
            <div
              key={mod._key || mIdx}
              className="border border-[#E2E8F0] rounded-[16px] bg-white overflow-hidden shadow-2xs transition-all duration-150"
            >
              {/* Module Header Bar */}
              <button
                type="button"
                onClick={() => toggleModule(mIdx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                {/* Left: Circle index & Title/Summary */}
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  {/* Numbered Circle Badge */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center font-medium text-sm text-[#0F172A] shrink-0 select-none">
                    {mIdx + 1}
                  </div>

                  {/* Title & Summary */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] truncate sm:whitespace-normal">
                      {mod.title}
                    </h3>
                    {mod.summary && (
                      <p className="text-xs sm:text-sm text-[#64748B] line-clamp-1 sm:line-clamp-none mt-0.5">
                        {mod.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Duration & Chevron */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <span className="text-xs sm:text-sm text-[#64748B] font-normal">
                    {formattedDuration}
                  </span>
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-[#94A3B8] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0F172A]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </button>

              {/* Collapsible Lessons Accordion Content */}
              {isOpen && (
                <div className="border-t border-[#F1F5F9] bg-[#FAFAFC] px-4 py-3 sm:px-6 sm:py-4 space-y-2.5">
                  {(mod.lessons || []).map((lesson, lIdx) => {
                    const lessonLink = `/courses/${course.slug}/lessons/${lesson.slug}`;

                    return (
                      <div
                        key={lesson._id || lIdx}
                        className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg hover:bg-white transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {lesson.isFreePreview ? (
                            <PlayCircle className="w-4 h-4 text-[#D96338] shrink-0" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                          )}
                          <Link
                            href={lessonLink}
                            className="text-xs sm:text-sm font-medium text-[#0F172A] hover:text-[#D96338] transition-colors truncate"
                          >
                            <span>{`${mIdx + 1}.${lIdx + 1} `}</span>
                            <span>{lesson.title}</span>
                          </Link>
                          {lesson.isFreePreview && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1EB] text-[#EA580C] uppercase tracking-wide shrink-0">
                              Preview
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-[#64748B] shrink-0">
                          {formatDuration(lesson.duration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show All / Show Less Modules Button */}
      {hasMore && (
        <div className="flex justify-center pt-5">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-sm font-medium text-[#0F172A] shadow-2xs transition-all duration-150 cursor-pointer"
          >
            <span>
              {showAll ? "Show fewer modules" : `Show all ${modules.length} modules`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
