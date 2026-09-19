import {defineField, defineType} from 'sanity'

export const sourceType = defineType({
  name: 'source',
  title: 'Source',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    }),

    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        list: [
          {title: 'Academic', value: 'academic'},
          {title: 'Museum', value: 'museum'},
          {title: 'Institution', value: 'institution'},
          {title: 'Book', value: 'book'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
  ],
})
