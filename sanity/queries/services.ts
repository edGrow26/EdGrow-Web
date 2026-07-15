import { defineQuery } from 'groq';

export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && status != "inactive"]
  | order(displayOrder asc, title asc) {
    "id": slug.current,
    title,
    icon,
    shortDescription,
    detailedDescription,
    features,
    technologies
  }
`);
