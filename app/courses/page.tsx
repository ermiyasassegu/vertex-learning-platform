import * as React from "react";
import type { Metadata } from "next";
import { getCourses, getCategories } from "@/sanity/lib/fetch";
import { HomeHeader } from "@/components/home/home-header";
import { CoursesCatalog } from "@/components/courses/courses-catalog";
import { WeeklyBanner } from "@/components/home/weekly-banner";
import { DecorativeFooter } from "@/components/home/decorative-footer";

export const metadata: Metadata = {
  title: "All Courses | Vertex",
  description:
    "Explore our full catalog of production-ready software engineering, cloud architecture, and AI courses.",
  openGraph: {
    title: "All Courses | Vertex",
    description:
      "Explore our full catalog of production-ready software engineering, cloud architecture, and AI courses.",
    type: "website",
  },
};

export default async function CoursesPage() {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] bg-diagonal-hatch flex flex-col items-center">
      {/* Central content canvas */}
      <div className="w-full max-w-[1440px] bg-[#FAFAFC] min-h-screen flex flex-col justify-between shadow-2xs border-x border-[#F1F5F9]/80">
        
        {/* Top Header */}
        <HomeHeader activeTab="courses" />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
          <CoursesCatalog courses={courses} categories={categories} />

          {/* Bottom Elements */}
          <div className="space-y-2 pt-6">
            <WeeklyBanner />
            <DecorativeFooter />
          </div>
        </main>

      </div>
    </div>
  );
}
