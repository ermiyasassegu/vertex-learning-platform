import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FolderGit2,
  Download,
  Wrench,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { getLessonBySlug, getLessonSlugs } from "@/sanity/lib/fetch";
import { formatDuration } from "@/sanity/lib/helpers";
import { urlForImage } from "@/sanity/lib/image";
import { getVideoEmbed } from "@/lib/video";
import type { LessonPageData, ResourceType } from "@/sanity/types";
import { HomeHeader } from "@/components/home/home-header";
import { DecorativeFooter } from "@/components/home/decorative-footer";
import { CourseBreadcrumb } from "@/components/course/course-breadcrumb";
import { ResourceCard } from "@/components/ui/resource-card";
import { LessonNotes } from "@/components/lesson/lesson-notes";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { LessonViewTracker } from "@/components/lesson/lesson-view-tracker";

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
  // `t` is the start-second deep link (e.g. from a search result), matching the
  // conventional video timestamp param.
  searchParams: Promise<{ t?: string }>;
}

export async function generateStaticParams() {
  const lessons = await getLessonSlugs();
  return lessons
    .filter((item) => item.courseSlug && item.slug)
    .map((item) => ({ slug: item.courseSlug as string, lessonSlug: item.slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const data = await getLessonBySlug(lessonSlug);

  if (!data) {
    return {
      title: "Lesson Not Found | Vertex",
      description: "The requested lesson could not be found.",
    };
  }

  const title = `${data.lesson.title} | ${data.course.title} | Vertex`;
  return {
    title,
    description: `${data.currentLessonLabel} of ${data.course.title}.`,
    openGraph: { title, type: "video.other" },
  };
}

function resourceIcon(type: ResourceType) {
  const base = "w-5 h-5";
  switch (type) {
    case "github":
      return <FolderGit2 className={base} />;
    case "download":
      return <Download className={base} />;
    case "tool":
      return <Wrench className={base} />;
    case "media":
      return <ImageIcon className={base} />;
    default:
      return <LinkIcon className={base} />;
  }
}

function LessonNavLink({
  direction,
  lesson,
}: {
  direction: "prev" | "next";
  lesson: NonNullable<LessonPageData["previousLesson"]>;
}) {
  const isPrev = direction === "prev";
  const arrow = isPrev ? (
    <ArrowLeft className="w-5 h-5 text-[#94A3B8] group-hover:text-[#D96338] shrink-0" />
  ) : (
    <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#D96338] shrink-0" />
  );
  const text = (
    <div className="min-w-0">
      <p className="text-xs text-[#94A3B8]">
        {isPrev ? "Previous" : "Next"} &bull; {lesson.label}
      </p>
      <p className="text-sm font-medium text-[#0F172A] truncate">{lesson.title}</p>
    </div>
  );
  return (
    <Link
      href={`/courses/${lesson.courseSlug}/lessons/${lesson.slug}`}
      className={`group flex items-center gap-3 rounded-[16px] border border-[#E2E8F0] bg-white p-4 hover:border-[#CBD5E1] hover:shadow-sm transition-all ${
        isPrev ? "" : "sm:justify-end text-right"
      }`}
    >
      {isPrev ? arrow : text}
      {isPrev ? text : arrow}
    </Link>
  );
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { slug, lessonSlug } = await params;
  const { t } = await searchParams;
  const data = await getLessonBySlug(lessonSlug);

  if (!data) {
    notFound();
  }

  const { lesson, course, currentLessonLabel, previousLesson, nextLesson } = data;

  const startSeconds = Number.parseInt(t ?? "", 10);
  const embed = getVideoEmbed(lesson.videoUrl, Number.isNaN(startSeconds) ? undefined : startSeconds);
  const posterSrc = urlForImage(lesson.thumbnail, 1280, 720);

  return (
    <div className="min-h-screen bg-[#FAFAFC] bg-diagonal-hatch flex flex-col items-center">
      <div className="w-full max-w-[1440px] bg-[#FAFAFC] min-h-screen flex flex-col justify-between shadow-2xs border-x border-[#F1F5F9]/80 relative">
        <HomeHeader activeTab="courses" />

        <LessonViewTracker
          courseSlug={slug}
          lessonSlug={lesson.slug}
          lessonTitle={lesson.title}
          lessonLabel={currentLessonLabel}
          isFreePreview={lesson.isFreePreview ?? false}
        />

        <main className="flex-1 px-4 sm:px-8 lg:px-12">
          <CourseBreadcrumb
            courseTitle={course.title}
            courseHref={`/courses/${course.slug}`}
            current={currentLessonLabel}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 pb-16">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-[#D96338]">{currentLessonLabel}</span>
                {lesson.isFreePreview && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1EB] text-[#EA580C] uppercase tracking-wide">
                    Free Preview
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F172A] tracking-tight leading-tight mb-5">
                {lesson.title}
              </h1>

              <div className="relative w-full aspect-video rounded-[16px] overflow-hidden bg-black border border-[#E2E8F0] shadow-sm">
                {embed.src ? (
                  <iframe
                    src={embed.src}
                    title={lesson.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : posterSrc ? (
                  <Image src={posterSrc} alt={lesson.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                    Video unavailable
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#64748B] pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
                  <span>{formatDuration(lesson.duration)}</span>
                </div>
                {lesson.studentCount ? (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 stroke-[1.8] text-[#94A3B8]" />
                    <span>{lesson.studentCount.toLocaleString()} students</span>
                  </div>
                ) : null}
              </div>

              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-4">
                    In this lesson you will
                  </h2>
                  <ul className="space-y-2.5">
                    {lesson.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#D96338] shrink-0 mt-0.5" />
                        <span className="text-[15px] sm:text-base text-[#334155] leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {lesson.notes && lesson.notes.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-4">Lesson Notes</h2>
                  <LessonNotes notes={lesson.notes} />
                </section>
              )}

              {lesson.proTip && (
                <section className="mt-8">
                  <div className="flex items-start gap-3 rounded-[16px] border border-[#FED7AA] bg-[#FFF7ED] p-5">
                    <Sparkles className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#9A3412] mb-1">Pro Tip</p>
                      <p className="text-[15px] text-[#7C2D12] leading-relaxed">{lesson.proTip}</p>
                    </div>
                  </div>
                </section>
              )}

              {lesson.resources && lesson.resources.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-4">Resources</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lesson.resources.map((resource, idx) => (
                      <ResourceCard
                        key={resource._key || idx}
                        title={resource.title}
                        description={resource.description || ""}
                        meta={resource.type}
                        href={resource.url}
                        icon={
                          <div className="w-10 h-10 rounded-[8px] bg-[#F1F5F9] text-[#64748B] flex items-center justify-center">
                            {resourceIcon(resource.type)}
                          </div>
                        }
                      />
                    ))}
                  </div>
                </section>
              )}

              {(previousLesson || nextLesson) && (
                <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {previousLesson ? <LessonNavLink direction="prev" lesson={previousLesson} /> : <span />}
                  {nextLesson && <LessonNavLink direction="next" lesson={nextLesson} />}
                </nav>
              )}
            </div>

            <aside className="lg:sticky lg:top-6 self-start">
              <LessonSidebar
                courseSlug={course.slug}
                courseTitle={course.title}
                modules={course.modules}
                currentLessonSlug={lesson.slug}
              />
            </aside>
          </div>
        </main>

        <div className="pt-6">
          <DecorativeFooter />
        </div>
      </div>
    </div>
  );
}
