import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g. "Sarah Chen", "Alex Rivera"',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo / Avatar',
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
      name: 'expertise',
      title: 'Expertise / Skills',
      type: 'array',
      description: 'Key areas of technical expertise and skills (e.g. "React", "TypeScript").',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      description: 'Instructor background, experience, and teaching focus.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      expertise: 'expertise',
      media: 'photo',
    },
    prepare({ title, expertise, media }) {
      const subtitle = Array.isArray(expertise)
        ? expertise.join(' • ')
        : (expertise || 'Instructor')

      return {
        title: title || 'Unnamed Instructor',
        subtitle,
        media,
      }
    },
  },
})
