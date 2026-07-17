import { defineQuery } from 'groq';

export const PRICING_QUERY = defineQuery(/* groq */ `
  *[_type == "pricingPlan" && status != "inactive"]
  | order(displayOrder asc, name asc) {
    "id": slug.current,
    name,
    price,
    period,
    description,
    features,
    isPopular
  }
`);
