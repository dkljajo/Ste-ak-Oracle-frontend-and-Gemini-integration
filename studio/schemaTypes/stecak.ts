import {defineField, defineType} from 'sanity'

export const stecakType = defineType({
  name: 'stecak',
  title: 'Stećak',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
    }),

    defineField({
      name: 'period',
      title: 'Historical Period',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'inscription',
      title: 'Inscription',
      type: 'text',
    }),

    defineField({
      name: 'motifs',
      title: 'Motifs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'motif'}],
        },
      ],
    }),

    defineField({
      name: 'historicalContext',
      title: 'Historical Context',
      type: 'text',
    }),

    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'source'}],
        },
      ],
    }),
  ],
})
