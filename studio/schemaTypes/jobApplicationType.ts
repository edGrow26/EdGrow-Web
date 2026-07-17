import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineField, defineType } from 'sanity';

export const jobApplicationType = defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'name', title: 'Applicant Name', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', validation: (rule) => rule.required().email() }),
    defineField({
      name: 'applicationType',
      title: 'Application Type',
      type: 'string',
      options: {
        list: [
          { title: 'Open Position', value: 'position' },
          { title: 'Internship', value: 'internship' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Open Position',
      type: 'reference',
      to: [{ type: 'job' }],
      hidden: ({ parent }) => parent?.applicationType !== 'position',
    }),
    defineField({ name: 'roleTitle', title: 'Role Applied For', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'coverLetter', title: 'Cover Note / Pitch', type: 'text', rows: 8 }),
    defineField({
      name: 'resume',
      title: 'Resume (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewing', value: 'reviewing' },
          { title: 'Shortlisted', value: 'shortlisted' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Hired', value: 'hired' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 5,
      description: 'Visible only to Studio users.',
    }),
  ],
  orderings: [{ title: 'Newest Applications', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', roleTitle: 'roleTitle', status: 'status' },
    prepare({ title, roleTitle, status }) {
      return { title, subtitle: `${status || 'new'} · ${roleTitle || 'Unknown role'}` };
    },
  },
});
