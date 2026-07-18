import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { defineField, defineType } from 'sanity';

/**
 * hireInquiry — persists every "Dispatch Message" submission from the
 * "Hire Us" / Contact page directly into Sanity Studio.
 */
export const hireInquiryType = defineType({
  name: 'hireInquiry',
  title: 'Hire Us Inquiry',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // ── Sender identity ────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),

    // ── Inquiry details ────────────────────────────────────────────────────────
    defineField({
      name: 'subject',
      title: 'Subject of Inquiry',
      type: 'string',
      description: 'Brief headline for what the client needs.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'message',
      title: 'Project Description / Message',
      type: 'text',
      rows: 8,
      description: 'The full message submitted by the prospect.',
      validation: (rule) => rule.required().min(10),
    }),

    // ── Pipeline management (editable by Studio users only) ────────────────────
    defineField({
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: '🆕 New', value: 'new' },
          { title: '👀 Reviewing', value: 'reviewing' },
          { title: '📞 Contacted', value: 'contacted' },
          { title: '🤝 Proposal Sent', value: 'proposal_sent' },
          { title: '✅ Won', value: 'won' },
          { title: '❌ Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 5,
      description: 'Visible only to Studio users. Use for call notes, follow-up reminders, etc.',
    }),

    // ── Metadata ───────────────────────────────────────────────────────────────
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      description: 'Auto-populated on creation — do not edit.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'hire-us-form',
      readOnly: true,
      description: 'Which form / page this inquiry originated from.',
    }),
  ],

  // ── Studio ordering ────────────────────────────────────────────────────────
  orderings: [
    {
      title: 'Newest Inquiries',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],

  // ── Studio card preview ────────────────────────────────────────────────────
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      subject: 'subject',
    },
    prepare({ title, subtitle, status, subject }) {
      const statusEmoji: Record<string, string> = {
        new: '🆕',
        reviewing: '👀',
        contacted: '📞',
        proposal_sent: '🤝',
        won: '✅',
        closed: '❌',
      };
      const emoji = statusEmoji[status as string] ?? '📩';
      return {
        title: `${emoji} ${title}`,
        subtitle: `${subtitle}${subject ? ` · ${subject}` : ''}`,
      };
    },
  },
});
