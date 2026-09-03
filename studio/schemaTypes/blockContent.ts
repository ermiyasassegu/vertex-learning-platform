import { defineType, defineArrayMember, defineField } from 'sanity'
import { ImageIcon, CodeIcon, LinkIcon } from '@sanity/icons'

/**
 * Portable Text rich text schema definition for lesson notes and content.
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule
                    .uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                      allowRelative: true,
                    })
                    .required(),
              }),
              defineField({
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code Block',
      type: 'object',
      icon: CodeIcon,
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TSX / React', value: 'tsx' },
              { title: 'JSX / React', value: 'jsx' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash / Shell', value: 'bash' },
              { title: 'GROQ', value: 'groq' },
            ],
          },
          initialValue: 'typescript',
        }),
        defineField({
          name: 'filename',
          title: 'Filename / Path',
          type: 'string',
          description: 'e.g. app/layout.tsx',
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 8,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          title: 'filename',
          subtitle: 'language',
        },
        prepare({ title, subtitle }) {
          return {
            title: title || 'Code Snippet',
            subtitle: subtitle ? `Language: ${subtitle}` : 'Code block',
          }
        },
      },
    }),
  ],
})
