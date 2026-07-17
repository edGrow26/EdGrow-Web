import { defineQuery } from 'groq';

export const TEAM_QUERY = defineQuery(/* groq */ `
  *[_type == "team" && status != "inactive"]
  | order(displayOrder asc, name asc) {
    name,
    role,
    bio,
    skills,
    "photo": photo.asset->url,
    "socials": {
      "linkedin": socialLinks[platform == "linkedin"][0].url,
      "twitter": socialLinks[platform == "twitter"][0].url,
      "github": socialLinks[platform == "github"][0].url
    }
  }
`);
