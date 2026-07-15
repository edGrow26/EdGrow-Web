import ServicesPageClient from '../../components/ServicesPageClient';
import { initialServices } from '../../lib/sanity';
import { fetchSanityServices } from '../../sanity/lib/services';

export default async function ServicesPage() {
  const services = await fetchSanityServices(initialServices);

  return <ServicesPageClient services={services} />;
}
