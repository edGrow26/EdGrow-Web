import type { TeamMember } from '../../lib/sanity';
import { sanityClient } from './client';
import { TEAM_QUERY } from '../queries/team';

function isCompleteTeamMember(member: Partial<TeamMember>): member is TeamMember {
  return Boolean(
    member.name &&
      member.role &&
      member.photo &&
      member.socials,
  );
}

export async function fetchSanityTeam(
  fallbackTeam: TeamMember[],
): Promise<TeamMember[]> {
  if (!sanityClient) return fallbackTeam;

  try {
    const team = await sanityClient.fetch<TeamMember[]>(TEAM_QUERY);
    const completeTeam = team.filter(isCompleteTeamMember);

    return completeTeam.length > 0 ? completeTeam : fallbackTeam;
  } catch (error) {
    console.warn('Unable to load team from Sanity; using fallback content.', error);
    return fallbackTeam;
  }
}
