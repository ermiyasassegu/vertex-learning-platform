import { sanityFetch } from './live'
import {
  COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
  LESSON_BY_SLUG_QUERY,
  LESSON_SLUGS_QUERY,
  INSTRUCTORS_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
} from './queries'
import { deriveLessonLabel } from './helpers'
import type {
  CourseCardData,
  CourseDetailData,
  LessonPageData,
  Instructor,
  Category,
} from '../types'

/**
 * Fetch all published courses for the catalog listing.
 */
export async function getCourses(): Promise<CourseCardData[]> {
  const { data } = await sanityFetch({
    query: COURSES_QUERY,
  })
  return (data || []) as CourseCardData[]
}

/**
 * Fetch a single course by its slug including all nested modules, lessons, and instructor.
 */
export async function getCourseBySlug(slug: string): Promise<CourseDetailData | null> {
  const { data } = await sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
  })
  return (data || null) as CourseDetailData | null
}

/**
 * Fetch all course slugs for static params or sitemaps.
 */
export async function getCourseSlugs(): Promise<string[]> {
  const { data } = await sanityFetch({
    query: COURSE_SLUGS_QUERY,
    stega: false,
    perspective: 'published',
  })
  const items = (data || []) as { slug: string }[]
  return items.map((item) => item.slug).filter(Boolean)
}

/**
 * Fetch a lesson by slug and resolve its course context, navigation, and module hierarchy.
 */
export async function getLessonBySlug(slug: string): Promise<LessonPageData | null> {
  const { data } = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!data) return null

  const rawLesson = data as any
  const rawCourse = rawLesson.course

  if (!rawCourse) {
    return {
      lesson: {
        _id: rawLesson._id,
        title: rawLesson.title,
        slug: rawLesson.slug,
        videoUrl: rawLesson.videoUrl,
        thumbnail: rawLesson.thumbnail,
        duration: rawLesson.duration || 0,
        isFreePreview: rawLesson.isFreePreview,
        studentCount: rawLesson.studentCount,
        notes: rawLesson.notes,
        keyPoints: rawLesson.keyPoints,
        proTip: rawLesson.proTip,
        resources: rawLesson.resources,
      },
      course: {
        _id: '',
        title: '',
        slug: '',
        modules: [],
      },
      currentModuleIndex: 0,
      currentLessonIndex: 0,
      currentLessonLabel: 'Lesson 1.1',
    }
  }

  // Flatten all lessons across modules to calculate next/prev links and labels
  type FlatLesson = {
    _id: string
    title: string
    slug: string
    duration: number
    isFreePreview?: boolean
    moduleIndex: number
    lessonIndex: number
    lessonLabel: string
    courseSlug: string
  }

  const flatLessons: FlatLesson[] = []
  const formattedModules = (rawCourse.modules || []).map((mod: any, mIdx: number) => {
    const formattedLessons = (mod.lessons || []).map((les: any, lIdx: number) => {
      const lessonLabel = deriveLessonLabel(mIdx, lIdx)
      const item: FlatLesson = {
        _id: les._id,
        title: les.title,
        slug: les.slug,
        duration: les.duration || 0,
        isFreePreview: les.isFreePreview,
        moduleIndex: mIdx,
        lessonIndex: lIdx,
        lessonLabel,
        courseSlug: rawCourse.slug,
      }
      flatLessons.push(item)
      return {
        _id: les._id,
        title: les.title,
        slug: les.slug,
        duration: les.duration || 0,
        isFreePreview: les.isFreePreview,
        lessonIndex: lIdx,
        lessonLabel,
      }
    })

    return {
      _key: mod._key,
      title: mod.title,
      moduleIndex: mIdx,
      lessons: formattedLessons,
    }
  })

  // Find index in flattened list
  const currentFlatIndex = flatLessons.findIndex((item) => item.slug === slug || item._id === rawLesson._id)
  const currentItem = flatLessons[currentFlatIndex]

  const currentModuleIndex = currentItem ? currentItem.moduleIndex : 0
  const currentLessonIndex = currentItem ? currentItem.lessonIndex : 0
  const currentLessonLabel = currentItem ? currentItem.lessonLabel : 'Lesson 1.1'

  const prevItem = currentFlatIndex > 0 ? flatLessons[currentFlatIndex - 1] : undefined
  const nextItem =
    currentFlatIndex >= 0 && currentFlatIndex < flatLessons.length - 1
      ? flatLessons[currentFlatIndex + 1]
      : undefined

  return {
    lesson: {
      _id: rawLesson._id,
      title: rawLesson.title,
      slug: rawLesson.slug,
      videoUrl: rawLesson.videoUrl,
      thumbnail: rawLesson.thumbnail,
      duration: rawLesson.duration || 0,
      isFreePreview: rawLesson.isFreePreview,
      studentCount: rawLesson.studentCount,
      notes: rawLesson.notes,
      keyPoints: rawLesson.keyPoints,
      proTip: rawLesson.proTip,
      resources: rawLesson.resources,
    },
    course: {
      _id: rawCourse._id,
      title: rawCourse.title,
      slug: rawCourse.slug,
      coverImage: rawCourse.coverImage,
      instructor: rawCourse.instructor,
      modules: formattedModules,
    },
    currentModuleIndex,
    currentLessonIndex,
    currentLessonLabel,
    previousLesson: prevItem
      ? {
          title: prevItem.title,
          slug: prevItem.slug,
          courseSlug: prevItem.courseSlug,
          label: prevItem.lessonLabel,
        }
      : undefined,
    nextLesson: nextItem
      ? {
          title: nextItem.title,
          slug: nextItem.slug,
          courseSlug: nextItem.courseSlug,
          label: nextItem.lessonLabel,
        }
      : undefined,
  }
}

/**
 * Fetch all lesson slugs for static params or sitemaps.
 */
export async function getLessonSlugs(): Promise<{ slug: string; courseSlug?: string }[]> {
  const { data } = await sanityFetch({
    query: LESSON_SLUGS_QUERY,
    stega: false,
    perspective: 'published',
  })
  return (data || []) as { slug: string; courseSlug?: string }[]
}

/**
 * Fetch all instructors.
 */
export async function getInstructors(): Promise<Instructor[]> {
  const { data } = await sanityFetch({
    query: INSTRUCTORS_QUERY,
  })
  return (data || []) as Instructor[]
}

/**
 * Fetch a single instructor by slug with their courses.
 */
export async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  const { data } = await sanityFetch({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
  })
  return (data || null) as Instructor | null
}

/**
 * Fetch all categories.
 */
export async function getCategories(): Promise<Category[]> {
  const { data } = await sanityFetch({
    query: CATEGORIES_QUERY,
  })
  return (data || []) as Category[]
}

/**
 * Fetch a single category by slug with its courses.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
  })
  return (data || null) as Category | null
}
