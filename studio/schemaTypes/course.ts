import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      description: 'e.g. "Next.js for Production", "Docker Essentials"',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Description',
      type: 'text',
      rows: 3,
      description: 'Marketing summary displayed on catalog cards and course overview.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Descriptive text for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'All Levels', value: 'all-levels' },
        ],
        layout: 'radio',
      },
      initialValue: 'intermediate',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price in USD (0 for free course).',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Course',
      type: 'boolean',
      description: 'Flag to feature this course prominently in catalog and recommendation badges.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student Count',
      type: 'number',
      description: 'Number of enrolled learners for display on cards and headers.',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'Learning Outcomes ("What You\'ll Learn")',
      type: 'array',
      description: 'Key skills and competencies learners will acquire upon completing the course.',
      of: [defineArrayMember({ type: 'learningOutcome' })],
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      description: 'Structured course curriculum broken down into ordered modules and lesson references.',
      of: [defineArrayMember({ type: 'module' })],
      validation: (rule) => rule.required().min(1).error('A course must have at least one module.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      instructorName: 'instructor.name',
      categoryTitle: 'category.title',
      level: 'level',
      media: 'coverImage',
    },
    prepare({ title, instructorName, categoryTitle, level, media }) {
      const details = [
        level ? level.charAt(0).toUpperCase() + level.slice(1) : null,
        categoryTitle,
        instructorName ? `By ${instructorName}` : null,
      ]
        .filter(Boolean)
        .join(' • ')

      return {
        title: title || 'Untitled Course',
        subtitle: details,
        media,
      }
    },
  },
})
