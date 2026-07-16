import { EditIcon } from '@sanity/icons/Edit';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const jobType = defineType({
  name: 'job',
  title: 'Job / Career Opening',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Design', value: 'Design' },
          { title: 'Marketing & SEO', value: 'Marketing & SEO' },
          { title: 'Operations', value: 'Operations' },
          { title: 'Business Development', value: 'Business Development' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. Colombo, Sri Lanka (Hybrid)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Remote', value: 'Remote' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Internship', value: 'Internship' },
        ],
        layout: 'radio',
      },
      initialValue: 'Full-time',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Role Description',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range (optional)',
      type: 'string',
      placeholder: 'e.g. £45,000 – £65,000 per year',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active (Accepting Applications)', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Posted Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const badge = status === 'active' ? '🟢' : status === 'paused' ? '🟡' : '🔴';
      return { title: `${badge} ${title}`, subtitle };
    },
  },
});
