import { type SchemaTypeDefinition } from 'sanity'

import { blockContent } from './blockContent'
import { learningOutcome } from './learningOutcome'
import { resource } from './resource'
import { module } from './module'
import { category } from './category'
import { instructor } from './instructor'
import { lesson } from './lesson'
import { course } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    course,
    lesson,
    instructor,
    category,

    // Objects
    module,
    learningOutcome,
    resource,
    blockContent,
  ],
}
