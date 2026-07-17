import { defineQuery } from 'groq';

export const FAQS_QUERY = defineQuery(/* groq */ `
  *[_type == "faq" && status != "inactive"]
  | order(displayOrder asc, category asc) {
    "id": _id,
    question,
    answer,
    category
  }
`);
