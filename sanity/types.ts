import type { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type?: 'image'
  asset?: {
    _ref?: string
    _type?: 'reference'
    _id?: string
    url?: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels'

export type ResourceType = 'link' | 'github' | 'download' | 'tool' | 'media'

export interface LearningOutcome {
  _key?: string
  title: string
  description?: string
  icon?: string
}

export interface Resource {
  _key?: string
  type: ResourceType
  title: string
  description?: string
  url: string
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
  courseCount?: number
}

export interface Instructor {
  _id: string
  _type: 'instructor'
  name: string
  slug: {
    current: string
  }
  photo?: SanityImage
  expertise?: string[]
  bio?: PortableTextBlock[]
  courses?: CourseCardData[]
}

export interface LessonSummary {
  _id: string
  _type: 'lesson'
  title: string
  slug: {
    current: string
  }
  duration: number
  isFreePreview?: boolean
  studentCount?: number
  thumbnail?: SanityImage
  videoUrl?: string
}

export interface Lesson extends LessonSummary {
  videoUrl: string
  notes?: PortableTextBlock[]
  keyPoints?: string[]
  proTip?: string
  resources?: Resource[]
}

export interface Module {
  _key?: string
  title: string
  summary?: string
  lessons: LessonSummary[]
}

export interface Course {
  _id: string
  _type: 'course'
  title: string
  slug: {
    current: string
  }
  summary: string
  coverImage?: SanityImage
  level: CourseLevel
  price: number
  isPopular?: boolean
  studentCount?: number
  instructor?: Instructor
  category?: Category
  learningOutcomes?: LearningOutcome[]
  modules: Module[]
}

export interface CourseCardData {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage?: SanityImage
  level: CourseLevel
  price: number
  isPopular?: boolean
  studentCount?: number
  instructor?: {
    _id: string
    name: string
    slug: string
    photo?: SanityImage
    expertise?: string[]
  }
  category?: {
    _id: string
    title: string
    slug: string
  }
  moduleCount: number
  lessonCount: number
  totalDurationSeconds: number
}

export interface CourseDetailData {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage?: SanityImage
  level: CourseLevel
  price: number
  isPopular?: boolean
  studentCount?: number
  instructor?: {
    _id: string
    name: string
    slug: string
    photo?: SanityImage
    expertise?: string[]
    bio?: PortableTextBlock[]
  }
  category?: {
    _id: string
    title: string
    slug: string
    description?: string
  }
  learningOutcomes?: LearningOutcome[]
  modules: {
    _key: string
    title: string
    summary?: string
    lessons: {
      _id: string
      title: string
      slug: string
      duration: number
      isFreePreview?: boolean
      studentCount?: number
      thumbnail?: SanityImage
    }[]
  }[]
  moduleCount: number
  lessonCount: number
  totalDurationSeconds: number
}

export interface LessonPageData {
  lesson: {
    _id: string
    title: string
    slug: string
    videoUrl: string
    thumbnail?: SanityImage
    duration: number
    isFreePreview?: boolean
    studentCount?: number
    notes?: PortableTextBlock[]
    keyPoints?: string[]
    proTip?: string
    resources?: Resource[]
  }
  course: {
    _id: string
    title: string
    slug: string
    coverImage?: SanityImage
    instructor?: {
      _id: string
      name: string
      slug: string
      photo?: SanityImage
      expertise?: string[]
    }
    modules: {
      _key: string
      title: string
      moduleIndex: number
      lessons: {
        _id: string
        title: string
        slug: string
        duration: number
        isFreePreview?: boolean
        lessonIndex: number
        lessonLabel: string // e.g. "Lesson 5.1"
      }[]
    }[]
  }
  currentModuleIndex: number
  currentLessonIndex: number
  currentLessonLabel: string // e.g. "Lesson 5.1"
  previousLesson?: {
    title: string
    slug: string
    courseSlug: string
    label: string
  }
  nextLesson?: {
    title: string
    slug: string
    courseSlug: string
    label: string
  }
}
