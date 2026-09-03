import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Documentation / Link', value: 'link' },
          { title: 'GitHub Repository', value: 'github' },
          { title: 'Download / Asset', value: 'download' },
          { title: 'Tool / Service', value: 'tool' },
          { title: 'Video / Media', value: 'media' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https'] })
          .error('Must be a valid HTTP/HTTPS URL'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      type: 'type',
    },
    prepare({ title, subtitle, type }) {
      return {
        title: title || 'Untitled Resource',
        subtitle: `[${type || 'link'}] ${subtitle || ''}`,
      }
    },
  },
})
