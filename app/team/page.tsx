// import TeamPageClient from '../../components/TeamPageClient';
// import { sanityClient as mockSanityClient } from '../../lib/sanity';
// import { fetchSanityTeam } from '../../sanity/lib/team';

// export default async function TeamPage() {
//   const fallbackTeam = await mockSanityClient.getTeam();
//   const team = await fetchSanityTeam(fallbackTeam);

//   return <TeamPageClient team={team} />;
// }


import TeamPageClient from '../../components/TeamPageClient';
import { sanityClient } from '../../lib/sanity';

export const revalidate = 60;

export default async function TeamPage() {
  const team = await sanityClient.getTeam();

  return <TeamPageClient team={team} />;
}
