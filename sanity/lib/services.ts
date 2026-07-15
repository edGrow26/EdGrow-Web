import type { Service } from '../../lib/sanity';
import { sanityClient } from './client';
import { SERVICES_QUERY } from '../queries/services';

function isCompleteService(service: Partial<Service>): service is Service {
  return Boolean(
    service.id &&
      service.title &&
      service.icon &&
      service.shortDescription &&
      service.detailedDescription &&
      Array.isArray(service.features) &&
      service.features.every((feature) => typeof feature === 'string') &&
      Array.isArray(service.technologies) &&
      service.technologies.every((technology) => typeof technology === 'string'),
  );
}

export async function fetchSanityServices(
  fallbackServices: Service[],
): Promise<Service[]> {
  if (!sanityClient) return fallbackServices;

  try {
    const services = await sanityClient.fetch<Service[]>(SERVICES_QUERY);
    const completeServices = services.filter(isCompleteService);

    return completeServices.length > 0 ? completeServices : fallbackServices;
  } catch (error) {
    console.warn('Unable to load services from Sanity; using fallback content.', error);
    return fallbackServices;
  }
}
