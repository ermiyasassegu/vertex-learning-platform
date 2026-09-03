import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
      description: 'e.g. "Server Components vs Client Components in Practice"',
      validation: (rule) => rule.required().max(140),
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Embed URL from YouTube, Vimeo, or Bunny (e.g. https://www.youtube.com/watch?v=...)',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https'] })
          .error('Video URL is required and must be a valid HTTP/HTTPS URL'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail / Poster Image',
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
      name: 'duration',
      title: 'Duration (in seconds)',
      type: 'number',
      description: 'Lesson duration in total seconds (e.g., 754 for 12m 34s). Used for time calculation and exact seeking.',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'isFreePreview',
      title: 'Free Preview',
      type: 'boolean',
      description: 'Allow learners to preview this lesson without enrollment.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student Count',
      type: 'number',
      description: 'Learner count for display metrics.',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points ("In this lesson you will")',
      type: 'array',
      description: 'Bullet points highlighting the key takeaways and objectives.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'notes',
      title: 'Lesson Notes (Portable Text)',
      type: 'blockContent',
      description: 'Comprehensive rich text notes, diagrams, code snippets, and explanations.',
    }),
    defineField({
      name: 'proTip',
      title: 'Pro Tip',
      type: 'text',
      rows: 3,
      description: 'Optional pro tip or instructor insight for this lesson.',
    }),
    defineField({
      name: 'resources',
      title: 'Lesson Resources',
      type: 'array',
      description: 'Links to source code, documentation, downloads, and related tools.',
      of: [defineArrayMember({ type: 'resource' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      isFreePreview: 'isFreePreview',
      media: 'thumbnail',
    },
    prepare({ title, duration, isFreePreview, media }) {
      const minutes = duration ? Math.floor(duration / 60) : 0
      const seconds = duration ? duration % 60 : 0
      const timeStr = duration ? `${minutes}m ${seconds.toString().padStart(2, '0')}s` : 'No duration'
      const previewBadge = isFreePreview ? ' [Free Preview]' : ''

      return {
        title: title || 'Untitled Lesson',
        subtitle: `${timeStr}${previewBadge}`,
        media,
      }
    },
  },
})
