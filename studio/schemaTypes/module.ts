import { defineType, defineField, defineArrayMember } from 'sanity'
import { SplitVerticalIcon } from '@sanity/icons'

/**
 * Module is an embedded object inside a course, not its own document.
 * Numbers like "Module 5" or "Lesson 5.1" are derived from order at runtime.
 */
export const module = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Module Title',
      type: 'string',
      description: 'e.g. "Data Fetching & Caching Architecture"',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'Brief overview of what is covered in this module.',
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      description: 'Ordered list of lessons contained in this module.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'lesson' }],
        }),
      ],
      validation: (rule) => rule.required().min(1).error('A module must contain at least one lesson.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lessons: 'lessons',
    },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0
      return {
        title: title || 'Untitled Module',
        subtitle: `${count} ${count === 1 ? 'lesson' : 'lessons'}`,
      }
    },
  },
})
