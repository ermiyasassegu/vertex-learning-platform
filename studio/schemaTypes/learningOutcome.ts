import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning Outcome',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Outcome heading, e.g. "Master Server Components"',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Detailed explanation of what the learner will be able to do.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g. CheckCircle, Code, Shield, Zap, Sparkles, Rocket, Cpu, Layers)',
      initialValue: 'CheckCircle',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: title || 'Untitled Outcome',
        subtitle: subtitle || (icon ? `Icon: ${icon}` : 'Learning outcome'),
      }
    },
  },
})
