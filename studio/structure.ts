import type { StructureResolver } from 'sanity/structure'
import { BookIcon, PlayIcon, UserIcon, TagIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Vertex Content Studio')
    .items([
      S.listItem()
        .title('Courses')
        .icon(BookIcon)
        .schemaType('course')
        .child(
          S.documentTypeList('course')
            .title('Courses')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('course')
            )
        ),
      S.listItem()
        .title('Lessons')
        .icon(PlayIcon)
        .schemaType('lesson')
        .child(
          S.documentTypeList('lesson')
            .title('Lessons')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('lesson')
            )
        ),
      S.divider(),
      S.listItem()
        .title('Instructors')
        .icon(UserIcon)
        .schemaType('instructor')
        .child(
          S.documentTypeList('instructor')
            .title('Instructors')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('instructor')
            )
        ),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('category')
            )
        ),
      S.divider(),
      // Catch-all for any other document types added in the future
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['course', 'lesson', 'instructor', 'category'].includes(
            listItem.getId() || ''
          )
      ),
    ])
