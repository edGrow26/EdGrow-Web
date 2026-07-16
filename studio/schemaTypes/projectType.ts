import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Title',       type: 'string',   validation: r => r.required() }),
    defineField({ name: 'category',    title: 'Category',    type: 'string',   description: 'e.g. E-learning / EdTech' }),
    defineField({ name: 'industry',    title: 'Industry',    type: 'string',   description: 'e.g. Education' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
    defineField({ name: 'challenge',   title: 'Challenge',   type: 'text' }),
    defineField({ name: 'solution',    title: 'Solution',    type: 'text' }),
    defineField({ name: 'result',      title: 'Result',      type: 'text' }),
    defineField({ name: 'projectLink', title: 'Project Link (URL)', type: 'url' }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'clientReview',
      title: 'Client Review',
      type: 'object',
      fields: [
        defineField({ name: 'rating',  title: 'Rating (1-5)', type: 'number' }),
        defineField({ name: 'quote',   title: 'Quote',        type: 'text' }),
        defineField({ name: 'author',  title: 'Author Name',  type: 'string' }),
        defineField({ name: 'role',    title: 'Author Role',  type: 'string' }),
        defineField({ name: 'company', title: 'Company',      type: 'string' }),
        defineField({ name: 'avatar',  title: 'Avatar',       type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
});
