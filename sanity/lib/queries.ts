import { defineQuery } from 'next-sanity'

// -----------------------------------------------------------------------------
// Courses Queries
// -----------------------------------------------------------------------------

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(isPopular desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    studentCount,
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "totalDurationSeconds": math::sum(modules[].lessons[]->duration)
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    studentCount,
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise,
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    learningOutcomes[]{
      _key,
      title,
      description,
      icon
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        isFreePreview,
        studentCount,
        thumbnail
      }
    },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "totalDurationSeconds": math::sum(modules[].lessons[]->duration)
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// -----------------------------------------------------------------------------
// Lessons Queries
// -----------------------------------------------------------------------------

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    isFreePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      coverImage,
      instructor->{
        _id,
        name,
        "slug": slug.current,
        photo,
        expertise
      },
      modules[]{
        _key,
        title,
        summary,
        lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          isFreePreview
        }
      }
    }
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(`
  *[_type == "lesson" && defined(slug.current)]{
    "slug": slug.current,
    "courseSlug": *[_type == "course" && references(^._id)][0].slug.current
  }
`)

// -----------------------------------------------------------------------------
// Instructors Queries
// -----------------------------------------------------------------------------

export const INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      price,
      isPopular,
      studentCount,
      category->{
        _id,
        title,
        "slug": slug.current
      },
      "moduleCount": count(modules),
      "lessonCount": count(modules[].lessons[]),
      "totalDurationSeconds": math::sum(modules[].lessons[]->duration)
    }
  }
`)

export const INSTRUCTOR_SLUGS_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// -----------------------------------------------------------------------------
// Categories Queries
// -----------------------------------------------------------------------------

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "courses": *[_type == "course" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      price,
      isPopular,
      studentCount,
      instructor->{
        _id,
        name,
        "slug": slug.current,
        photo,
        expertise
      },
      "moduleCount": count(modules),
      "lessonCount": count(modules[].lessons[]),
      "totalDurationSeconds": math::sum(modules[].lessons[]->duration)
    }
  }
`)

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current
  }
`)
