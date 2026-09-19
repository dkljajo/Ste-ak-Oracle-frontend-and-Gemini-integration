import {defineField, defineType} from 'sanity'

export const motifType = defineType({
  name: 'motif',
  title: 'Motif',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'interpretations',
      title: 'Interpretations',
      type: 'array',
      of: [{type: 'text'}],
    }),

    defineField({
      name: 'caution',
      title: 'Interpretation Caution',
      type: 'text',
    }),
  ],
})
