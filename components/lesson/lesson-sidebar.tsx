import * as React from "react";
import Link from "next/link";
import { PlayCircle, Lock, CheckCircle2 } from "lucide-react";
import { formatDuration, deriveModuleLabel, deriveLessonNumber } from "@/sanity/lib/helpers";
import type { LessonPageData } from "@/sanity/types";

interface LessonSidebarProps {
  courseSlug: string;
  courseTitle: string;
  modules: LessonPageData["course"]["modules"];
  currentLessonSlug: string;
}

export function LessonSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonSlug,
}: LessonSidebarProps) {
  return (
    <nav
      aria-label="Course lessons"
      className="bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xs overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-[#F1F5F9]">
        <p className="text-xs text-[#64748B] font-normal">Course</p>
        <Link
          href={`/courses/${courseSlug}`}
          className="text-sm font-semibold text-[#0F172A] hover:text-[#D96338] transition-colors line-clamp-2"
        >
          {courseTitle}
        </Link>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-3 py-3 space-y-4">
        {modules.map((mod) => (
          <div key={mod._key}>
            <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
              {deriveModuleLabel(mod.moduleIndex)} &bull; {mod.title}
            </p>
            <ul className="space-y-0.5">
              {mod.lessons.map((lesson) => {
                const isActive = lesson.slug === currentLessonSlug;
                return (
                  <li key={lesson._id}>
                    <Link
                      href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-[#FFF1EB] text-[#0F172A] font-medium"
                          : "text-[#475569] hover:bg-slate-50"
                      }`}
                    >
                      {isActive ? (
                        <CheckCircle2 className="w-4 h-4 text-[#D96338] shrink-0" />
                      ) : lesson.isFreePreview ? (
                        <PlayCircle className="w-4 h-4 text-[#94A3B8] shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0" />
                      )}
                      <span className="min-w-0 truncate">
                        <span className="text-[#94A3B8]">
                          {deriveLessonNumber(mod.moduleIndex, lesson.lessonIndex)}{" "}
                        </span>
                        {lesson.title}
                      </span>
                      <span className="ml-auto text-[11px] text-[#94A3B8] shrink-0">
                        {formatDuration(lesson.duration)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
