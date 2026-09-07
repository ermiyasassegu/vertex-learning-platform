import * as React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug, getCourseSlugs } from "@/sanity/lib/fetch";
import { HomeHeader } from "@/components/home/home-header";
import { CourseBreadcrumb } from "@/components/course/course-breadcrumb";
import { CourseHero } from "@/components/course/course-hero";
import { CourseLearningOutcomes } from "@/components/course/course-learning-outcomes";
import { CourseCurriculum } from "@/components/course/course-curriculum";
import { CourseProgressBar } from "@/components/course/course-progress-bar";
import { TrackCourseView } from "@/components/analytics/track-course-view";
import { DecorativeFooter } from "@/components/home/decorative-footer";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  // Ensure nextjs-for-production is included even before background sitemap rebuilds
  const uniqueSlugs = Array.from(new Set([...slugs, "nextjs-for-production"]));
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Vertex",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.title} | Vertex`,
    description: course.summary,
    openGraph: {
      title: `${course.title} | Vertex`,
      description: course.summary,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Calculate continue link to first lesson if present
  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug || "";
  const continueLink = firstLessonSlug
    ? `/courses/${course.slug}/lessons/${firstLessonSlug}`
    : "#modules";

  return (
    <div className="min-h-screen bg-[#FAFAFC] bg-diagonal-hatch flex flex-col items-center">
      {/* Central content canvas */}
      <div className="w-full max-w-[1440px] bg-[#FAFAFC] min-h-screen flex flex-col justify-between shadow-2xs border-x border-[#F1F5F9]/80 relative">
        
        {/* Top Header */}
        <HomeHeader activeTab="courses" />

        {/* Product analytics: course viewed */}
        <TrackCourseView
          slug={course.slug}
          title={course.title}
          category={course.category?.title}
          level={course.level}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
          <div>
            {/* Breadcrumb: All Courses > Title */}
            <CourseBreadcrumb courseTitle={course.title} />

            {/* Course Hero with Cover Poster, Badges & CTA */}
            <CourseHero course={course} />

            {/* What you'll learn 2x2 section */}
            <CourseLearningOutcomes outcomes={course.learningOutcomes} />

            {/* Course Content 12-module accordion */}
            <CourseCurriculum course={course} />
          </div>

          {/* Decorative Warm Gradient Footer */}
          <div className="pt-6">
            <DecorativeFooter />
          </div>
        </main>

        {/* Floating Learner Progress Bar Dock */}
        <CourseProgressBar
          progressPercentage={35}
          continueLink={continueLink}
        />

      </div>
    </div>
  );
}
