"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart2, Clock, FileText, Sparkles, Database, Shield, Layers, Cpu } from "lucide-react";
import { formatDuration } from "@/sanity/lib/helpers";
import type { CourseCardData, Category } from "@/sanity/types";
import posthog from "posthog-js";

// Next.js Logo Component
function NextJsIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-black text-white flex items-center justify-center font-serif text-2xl font-black shadow-sm shrink-0 select-none">
      <span className="font-bold tracking-tight">N</span>
    </div>
  );
}

// Docker Whale Logo Component
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
        <g stroke="#0F172A" strokeWidth="1.2" fill="#38BDF8">
          <rect x="23" y="10" width="6" height="5" rx="1" fill="#7DD3FC" />
          <rect x="15" y="16" width="6" height="5" rx="1" fill="#7DD3FC" />
          <rect x="23" y="16" width="6" height="5" rx="1" fill="#38BDF8" />
          <rect x="31" y="16" width="6" height="5" rx="1" fill="#0284C7" />
          <rect x="7" y="22" width="6" height="5" rx="1" fill="#7DD3FC" />
          <rect x="15" y="22" width="6" height="5" rx="1" fill="#38BDF8" />
          <rect x="23" y="22" width="6" height="5" rx="1" fill="#0284C7" />
          <rect x="31" y="22" width="6" height="5" rx="1" fill="#0369A1" />
        </g>
        <path
          d="M3 27C3 27 6 35 18 36C30 37 42 34 46 29C48 26.5 49 24 51 25C52.5 25.8 53 28 50 31C45 36 34 41 18 40C6 39 1 31 1 29C1 27 3 27 3 27Z"
          fill="#0284C7"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="30" r="1.5" fill="#FFFFFF" />
        <circle cx="10" cy="30" r="0.75" fill="#0F172A" />
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

// React Icon Component
function ReactIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-[#00D8FE] flex items-center justify-center shadow-sm shrink-0 select-none">
      <svg className="w-7 h-7" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FE" />
        <g stroke="#00D8FE" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </div>
  );
}

// Python Icon Component
function PythonIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#1E293B] text-white flex items-center justify-center font-mono font-bold text-xl shadow-sm shrink-0 select-none">
      <span className="text-[#38BDF8]">Py</span>
    </div>
  );
}

// PostgreSQL Icon Component
function PostgresIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#336791] text-white flex items-center justify-center shadow-sm shrink-0 select-none">
      <Database className="w-6 h-6 stroke-[2]" />
    </div>
  );
}

// AI Engineering Icon Component
function AiIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white flex items-center justify-center shadow-sm shrink-0 select-none">
      <Sparkles className="w-6 h-6 stroke-[2]" />
    </div>
  );
}

// Security Icon Component
function SecurityIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-[#10B981] flex items-center justify-center shadow-sm shrink-0 select-none">
      <Shield className="w-6 h-6 stroke-[2]" />
    </div>
  );
}

// System Design Icon Component
function SystemDesignIcon() {
  return (
    <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-[#F59E0B] flex items-center justify-center shadow-sm shrink-0 select-none">
      <Cpu className="w-6 h-6 stroke-[2]" />
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

  if (s.includes("next") || t.includes("next.js")) return <NextJsIcon />;
  if (s.includes("docker") || t.includes("docker") || s.includes("devops") || t.includes("kubernetes"))
    return <DockerIcon />;
  if (s.includes("typescript") || t.includes("typescript")) return <TypeScriptIcon />;
  if (s.includes("react") || t.includes("react")) return <ReactIcon />;
  if (s.includes("python") || t.includes("python")) return <PythonIcon />;
  if (s.includes("postgres") || t.includes("sql") || s.includes("database")) return <PostgresIcon />;
  if (s.includes("ai") || t.includes("ai") || s.includes("llm") || s.includes("rag") || t.includes("retrieval"))
    return <AiIcon />;
  if (s.includes("security") || t.includes("security")) return <SecurityIcon />;
  if (s.includes("system-design") || t.includes("system design")) return <SystemDesignIcon />;

  return <DefaultCourseIcon title={title} />;
}

function capitalize(str?: string): string {
  if (!str) return "Intermediate";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface CoursesCatalogProps {
  courses: CourseCardData[];
  categories?: Category[];
}

export function CoursesCatalog({ courses = [], categories = [] }: CoursesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  // Derive unique categories from courses if categories array is empty
  const filterCategories = React.useMemo(() => {
    if (categories && categories.length > 0) {
      return categories;
    }
    const seen = new Set<string>();
    const derived: { _id: string; title: string; slug: { current: string } }[] = [];
    for (const c of courses) {
      if (c.category?.title && !seen.has(c.category.title)) {
        seen.add(c.category.title);
        derived.push({
          _id: c.category._id || c.category.title,
          title: c.category.title,
          slug: { current: c.category.slug || "" },
        });
      }
    }
    return derived;
  }, [categories, courses]);

  // Filter courses based on selected category
  const filteredCourses = React.useMemo(() => {
    if (selectedCategory === "all") {
      return courses;
    }
    return courses.filter((course) => {
      const catTitle = course.category?.title?.toLowerCase();
      const catSlug = course.category?.slug?.toLowerCase();
      const target = selectedCategory.toLowerCase();
      return catTitle === target || catSlug === target;
    });
  }, [courses, selectedCategory]);

  // Product analytics: catalog viewed (top of the funnel), captured once.
  const viewed = React.useRef(false);
  React.useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    posthog.capture("catalog_viewed", {
      course_count: courses.length,
      category_count: filterCategories.length,
    });
  }, [courses.length, filterCategories.length]);

  return (
    <section className="w-full pt-4 pb-16">
      {/* Page Hero Header */}
      <div className="space-y-4 mb-8">
        <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] text-xs font-semibold tracking-wider uppercase bg-[#FFF1EB] text-[#EA580C]">
          EXPLORE CATALOG
        </span>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            All Courses
          </h1>
          <p className="text-sm font-medium text-[#64748B]">
            Showing <span className="text-[#0F172A] font-semibold">{filteredCourses.length}</span> of{" "}
            <span className="text-[#0F172A] font-semibold">{courses.length}</span> courses
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed">
          Explore our production-grade curriculum designed to take you from core concepts to enterprise deployment.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("all");
            posthog.capture("course_category_filtered", { category: "all" });
          }}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-[#0F172A] text-white shadow-sm"
              : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1]"
          }`}
        >
          All ({courses.length})
        </button>

        {filterCategories.map((cat) => {
          const categorySlug = cat.slug?.current || cat.title;
          const isSelected = selectedCategory === categorySlug || selectedCategory === cat.title;
          const count = courses.filter((c) => c.category?.title === cat.title).length;

          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => {
                const nextCategory = isSelected ? "all" : cat.title;
                setSelectedCategory(nextCategory);
                posthog.capture("course_category_filtered", { category: nextCategory });
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#0F172A] text-white shadow-sm"
                  : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              {cat.title} {count > 0 && <span className="opacity-70 text-xs">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredCourses.map((course) => (
            <Link
              key={course._id || course.slug}
              href={`/courses/${course.slug}`}
              onClick={() =>
                posthog.capture("course_catalog_card_clicked", {
                  course_slug: course.slug,
                  course_title: course.title,
                  course_level: course.level,
                  selected_category: selectedCategory,
                })
              }
              className="group relative flex flex-col justify-between bg-white border border-[#E2E8F0] rounded-[16px] p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 cursor-pointer"
            >
              <div>
                {/* Course Icon & Category Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div>{getCourseIcon(course.slug, course.title)}</div>
                  {course.category?.title && (
                    <span className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {course.category.title}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h2 className="font-serif text-xl sm:text-[22px] font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors mb-3 leading-snug">
                  {course.title}
                </h2>

                {/* Course Description */}
                <p className="text-sm text-[#64748B] leading-relaxed mb-8 line-clamp-3">
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
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-12 text-center my-8 shadow-2xs">
          <Layers className="w-12 h-12 text-[#94A3B8] mx-auto mb-4 stroke-[1.5]" />
          <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-2">
            No courses found
          </h3>
          <p className="text-sm text-[#64748B] mb-6 max-w-md mx-auto">
            There are currently no published courses under the selected category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-medium text-sm transition-colors cursor-pointer"
          >
            View all courses
          </button>
        </div>
      )}
    </section>
  );
}
