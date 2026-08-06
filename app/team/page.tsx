// import TeamPageClient from '../../components/TeamPageClient';
// import { sanityClient as mockSanityClient } from '../../lib/sanity';
// import { fetchSanityTeam } from '../../sanity/lib/team';

// export default async function TeamPage() {
//   const fallbackTeam = await mockSanityClient.getTeam();
//   const team = await fetchSanityTeam(fallbackTeam);

//   return <TeamPageClient team={team} />;
// }


import TeamPageClient from '../../components/TeamPageClient';
import { sanityClient as mockSanityClient } from '../../lib/sanity';
import { fetchSanityTeam } from '../../sanity/lib/team';

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const fallbackTeam = await mockSanityClient.getTeam();
  const team = await fetchSanityTeam(fallbackTeam);

  return <TeamPageClient team={team} />;
}
