// Sanity CMS client + types + GROQ queries for Edgrow Technologies.
// Falls back to mock data when Sanity returns no documents (e.g. empty project).
import { createClient } from '@sanity/client';

// ─── Sanity client ────────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production';
// SANITY_API_READ_TOKEN is server-only. NEXT_PUBLIC_SANITY_API_READ_TOKEN works in the browser too.
const apiToken  = process.env.SANITY_API_READ_TOKEN ?? process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
const formRecipient = process.env.NEXT_PUBLIC_FORM_RECIPIENT || 'edgrowproduct@gmail.com';
const formEndpoint = `https://formsubmit.co/ajax/${formRecipient}`;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,         // Disable CDN cache so Sanity edits show immediately
  token: apiToken,
  perspective: 'published',
});


// ─── Shared types ─────────────────────────────────────────────────────────────

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Category {
  title: string;
  slug: string;
}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // HTML string rendered from portable text
  publishedAt: string;
  author: Author;
  categories: string[];
  readTime: string;
  mainImage: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio?: string;
  skills?: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ClientReview {
  rating: number;
  quote: string;
  author: string;
  avatar: string;
  role: string;
  company: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  industry: string;
  technologies: string[];
  mainImage: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  clientReview?: ClientReview;
  projectLink?: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ─── GROQ queries ─────────────────────────────────────────────────────────────

const SERVICES_QUERY = `
  *[_type == "service" && status == "active"] | order(displayOrder asc) {
    "id": _id,
    title,
    "icon": icon,
    shortDescription,
    detailedDescription,
    features,
    technologies
  }
`;

const PRICING_QUERY = `
  *[_type == "pricingPlan" && status != "inactive"] | order(displayOrder asc, name asc) {
    "id": slug.current,
    name,
    price,
    period,
    description,
    features,
    isPopular
  }
`;

const FAQS_QUERY = `
  *[_type == "faq" && status != "inactive"] | order(displayOrder asc, category asc) {
    "id": _id,
    question,
    answer,
    category
  }
`;

const PROJECTS_QUERY = `
  *[_type == "project"] | order(displayOrder asc) {
    "id": _id,
    title,
    category,
    industry,
    technologies,
    "mainImage": mainImage.asset->url,
    description,
    challenge,
    solution,
    result,
    projectLink,
    "clientReview": clientReview {
      rating,
      quote,
      author,
      role,
      company,
      "avatar": avatar.asset->url
    }
  }
`;

const PROJECT_BY_ID_QUERY = `
  *[_type == "project" && _id == $id][0] {
    "id": _id,
    title,
    category,
    industry,
    technologies,
    "mainImage": mainImage.asset->url,
    description,
    challenge,
    solution,
    result,
    projectLink,
    "clientReview": clientReview {
      rating,
      quote,
      author,
      role,
      company,
      "avatar": avatar.asset->url
    }
  }
`;

const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && (!defined(status) || status == "active")] | order(displayOrder asc) {
    name,
    role,
    company,
    quote,
    rating,
    "avatar": avatar.asset->url
  }
`;

async function submitEmailForm(payload: FormData | Record<string, string>): Promise<boolean> {
  try {
    const isMultipart = payload instanceof FormData;
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: isMultipart
        ? { Accept: 'application/json' }
        : { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: isMultipart ? payload : JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null) as { success?: boolean | string } | null;
    const delivered = result?.success === true || result?.success === 'true';
    return response.ok && delivered;
  } catch (error) {
    console.error('[Forms] Email delivery failed.', error);
    return false;
  }
}

const TEAM_QUERY = `
  *[_type == "team" && status != "inactive"] | order(displayOrder asc, name asc) {
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
`;

const POSTS_QUERY = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    "mainImage": mainImage.asset->url,
    categories,
    "author": author->{
      name,
      role,
      "avatar": avatar.asset->url
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && status == "published"][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    "mainImage": mainImage.asset->url,
    categories,
    "author": author->{
      name,
      role,
      "avatar": avatar.asset->url
    },
    body
  }
`;

const JOBS_QUERY = `
  *[_type == "job"] | order(publishedAt desc) {
    "id": _id,
    title,
    department,
    location,
    type,
    status,
    description,
    requirements,
    benefits
  }
`;

// ─── Portable-text → plain HTML renderer (minimal, no extra deps) ─────────────
function blocksToHtml(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks.map((block: unknown) => {
    const b = block as Record<string, unknown>;
    if (b._type === 'block' && Array.isArray(b.children)) {
      const text = (b.children as Array<{ text: string; marks?: string[] }>)
        .map(child => {
          let t = child.text ?? '';
          if (child.marks?.includes('strong')) t = `<strong>${t}</strong>`;
          if (child.marks?.includes('em'))     t = `<em>${t}</em>`;
          if (child.marks?.includes('code'))   t = `<code>${t}</code>`;
          return t;
        })
        .join('');
      const style = (b.style as string) ?? 'normal';
      if (style === 'h2') return `<h2>${text}</h2>`;
      if (style === 'h3') return `<h3>${text}</h3>`;
      if (style === 'h4') return `<h4>${text}</h4>`;
      if (style === 'blockquote') return `<blockquote>${text}</blockquote>`;
      return `<p>${text}</p>`;
    }
    if (b._type === 'codeBlock') {
      return `<pre><code>${b.code}</code></pre>`;
    }
    if (b._type === 'image' && typeof b.asset === 'object') {
      const asset = b.asset as Record<string, unknown>;
      const url = (asset.url as string) ?? '';
      const alt = (b.alt as string) ?? '';
      return `<img src="${url}" alt="${alt}" loading="lazy" />`;
    }
    return '';
  }).join('\n');
}

// ─── Mock/fallback data ───────────────────────────────────────────────────────

const mockAuthors: Record<string, Author> = {
  kasun: {
    name: 'Kasun Jayawardena',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Co-Founder & Chief Architect',
  },
  sarah: {
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Director of Product Design',
  },
};

export const initialServices: Service[] = [
  {
    id: 'custom-web',
    title: 'Custom Web Development',
    icon: 'code',
    shortDescription: 'Enterprise-grade custom web applications engineered with Next.js, React, Node.js, and cloud ecosystems.',
    detailedDescription: 'We craft high-performance, responsive web portals and SaaS platforms tailored to automate your operations. Our expert web developers in Colombo and London implement modern architectures that guarantee speedy loads, solid security, and frictionless SEO.',
    features: [
      'Next.js 14/15 App Router & React SPA platforms',
      'Microservices API design and implementation',
      'Fully responsive, accessible visual design (WCAG AA)',
      'Highly secure backends (Node.js, Go, Python)',
      'CMS integration (Sanity.io, headless WordPress, Shopify)',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'enterprise-software',
    title: 'Custom Software Development',
    icon: 'cpu',
    shortDescription: 'Scalable cloud-native enterprise business logic, database architectures, and customized ERP/CRM portals.',
    detailedDescription: 'Transform legacy bottlenecks into lightweight, automated web solutions. We specialize in cross-border agile software engineering across e-learning verticals, fintech, healthcare, and retail sectors.',
    features: [
      'Custom ERP & CRM development',
      'Automated workflows and workflow modeling',
      'Cloud database performance engineering',
      'Secure payment gateways & third-party integrations',
    ],
    technologies: ['C#', '.NET', 'Java', 'Python', 'Docker', 'Kubernetes'],
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    icon: 'shopping-bag',
    shortDescription: 'Omnichannel retail stores, payment gateways, complex inventory hubs, and fully optimized conversion funnels.',
    detailedDescription: 'Harness high-converting digital storefronts. We build fully custom e-commerce engines as well as headless Shopify/Magento portals that scale effortlessly on Black Fridays.',
    features: [
      'Headless Commerce architectures',
      'Automated stock levels & shipping carrier APIs',
      'One-click checkouts and loyalty portals',
      'Advanced conversion and cart-recovery metrics',
    ],
    technologies: ['Shopify', 'Next.js', 'PostgreSQL', 'Stripe', 'Redis'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: 'layers',
    shortDescription: 'Figma prototypes, customer journey mapping, custom design systems, and rapid wireframe testing.',
    detailedDescription: 'Design is not just what it looks like, it is how it works. We produce high-fidelity design systems and user journey paths that drive massive customer actions and trust.',
    features: [
      'Interactive Figma prototypes',
      'SaaS usability testing and audits',
      'Multi-platform mobile and web design systems',
      'Customer journey optimization mapping',
    ],
    technologies: ['Figma', 'Adobe Creative Cloud', 'Tailwind CSS'],
  },
  {
    id: 'seo-services',
    title: 'SEO & Growth Services',
    icon: 'trending-up',
    shortDescription: 'Semantic content strategies, technical site health audits, speed optimizations, and localized search rank.',
    detailedDescription: 'Own your digital search visibility. We specialize in technical SEO optimizations, Core Web Vitals remediation, and semantic content engineering that beats major competitors in Google Search results.',
    features: [
      'Core Web Vitals loading speed optimization',
      'Local SEO ranking (Sri Lanka, London, Global targets)',
      'Semantic keyword clustering & copy strategy',
      'Structured schema markup (JSON-LD) placement',
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'Next.js Metadata'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    shortDescription: 'Serverless deployments, continuous integration (CI/CD), scalable SQL/NoSQL databases, and security audits.',
    detailedDescription: 'Secure, reliable cloud environments that scale. We provision optimized infrastructures on AWS, Google Cloud, and Azure with continuous deployment workflows.',
    features: [
      'AWS / GCP Cloud Architecture design',
      'Zero-downtime CI/CD deployment pipelines',
      'Serverless computing & auto-scaling setups',
      'Database replication and automated failovers',
    ],
    technologies: ['AWS', 'Docker', 'GitHub Actions', 'Terraform', 'Kubernetes'],
  },
];

const mockProjects: Project[] = [
  {
    id: 'edu-platform',
    title: 'EdGrow Collaborative Learning Hub',
    category: 'E-learning / EdTech',
    industry: 'Education',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    mainImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    description: 'An interactive, server-side optimized learning ecosystem and curriculum tracking platform supporting hundreds of thousands of concurrent global students.',
    challenge: 'The client needed an interface that visualizes complex dynamic course folders while supporting a live AI tutorial room without loading latency.',
    solution: 'Designed a Next.js App Router solution with high-contrast display typography, lightweight state tracking, and direct API proxying to Google Gemini models.',
    result: 'Reduced dynamic folder lookup times by 80%, increased student weekly streak completions by 45%, and scaled content queries instantly.',
    clientReview: {
      rating: 5,
      quote: 'Edgrow converted our chaotic, fragmented educational system into an elegant, scalable visual platform. Our student metrics skyrocketed within months.',
      author: 'Dr. Aruni Perera',
      role: 'Director of Academic Affairs',
      company: 'Lanka Institute of Science & Technology',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    projectLink: 'https://ais-dev-st6sgt2zsr5lpbbew5l77r-967645069618.asia-southeast1.run.app',
  },
  {
    id: 'fintech-app',
    title: 'Apex Global Wealth CRM',
    category: 'FinTech / SaaS',
    industry: 'Finance',
    technologies: ['C#', '.NET Core', 'Angular', 'AWS', 'PostgreSQL'],
    mainImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
    description: 'A robust cloud-native client relationship manager built for high-net-worth wealth management offices in London and Zurich.',
    challenge: 'Sovereign security laws required high-security data encryption at rest and transit, with sub-millisecond mathematical calculations.',
    solution: 'Engineered clean .NET microservices encapsulated in Docker containers, deployed on secure AWS Elastic Container Services with strict IAM keys.',
    result: 'Fully compliant with GDPR and FINMA guidelines, securely processing over £2.4B in asset portfolio calculations daily.',
    clientReview: {
      rating: 5,
      quote: 'The team at Edgrow understands corporate security. They delivered a highly technical product ahead of deadline with impeccable code compliance.',
      author: 'Edward Thornton',
      role: 'Chief Compliance Officer',
      company: 'Apex Wealth Management UK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    projectLink: '#',
  },
  {
    id: 'logistics-system',
    title: 'Siri Cargo Automated Logistics Engine',
    category: 'Enterprise Software',
    industry: 'Logistics & Supply Chain',
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Google Maps API'],
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    description: 'A custom fleet route optimization and dynamic warehousing manager servicing nationwide logistics hubs in Colombo.',
    challenge: 'Manual port cargo manifest handling led to 14% dispatch latency and route tracking inaccuracies across regional drivers.',
    solution: 'Built an automated dispatch router leveraging real-time traffic coordinates, geographic clustering, and automatic loading sheet parsing.',
    result: 'Slashed vehicle dwell times by 32% and saved the firm over 1,200 metric tons of fuel in annual distribution.',
    clientReview: {
      rating: 5,
      quote: 'Edgrow custom software took the guesswork out of our dispatch lines. Our Colombo terminal has never run this efficiently.',
      author: 'Rohan Wickramasinghe',
      role: 'Operations VP',
      company: 'Siri Logistics Group',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    },
    projectLink: '#',
  },
];

const mockTeam: TeamMember[] = [
  {
    name: 'Kasun Jayawardena',
    role: 'Co-Founder & Chief Technology Officer',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Sarah Jenkins',
    role: 'Co-Founder & Creative Director',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Devinda Perera',
    role: 'Lead Cloud Infrastructure Architect',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Tharushi Alwis',
    role: 'Senior Full-Stack Developer',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
];

const mockJobs: Job[] = [
  {
    id: 'react-dev-colombo',
    title: 'Senior Next.js / React Engineer',
    location: 'Colombo, Sri Lanka (Hybrid / Remote Option)',
    type: 'Full-time',
    department: 'Engineering',
    description: 'We are seeking a brilliant frontend specialist with deep expertise in Next.js 14/15, Tailwind CSS, Framer Motion, and server component performance optimizations.',
    requirements: [
      '4+ years of professional react engineering experience',
      'Exceptional grasp of React Server Components, pre-rendering strategies, and hydration',
      'Solid command of Tailwind CSS and layout designs',
      'Outstanding communication skills matching global team pipelines',
    ],
    benefits: [
      'Highly competitive LKR/USD matched base salaries',
      'Private health insurance coverage for your immediate family',
      'Tech gear allowance (MacBook Pro & 4K monitor setup)',
      'Flexible annual study budget and certification sponsor support',
    ],
  },
  {
    id: 'node-architect-remote',
    title: 'Lead Software Architect (.NET / Node.js)',
    location: 'London, UK or Remote Global',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Lead the design of secure, high-concurrency microservices, managing cloud resource provisions and database schema modeling.',
    requirements: [
      '6+ years of backend architecture experience using C# .NET or TypeScript Node.js',
      'Demonstrated expertise in PostgreSQL performance engineering, query caching, and index optimizations',
      'Proficient in Docker, Kubernetes, and AWS architecture solutions',
      'Comfortable leading agile product pipelines and mentoring juniors',
    ],
    benefits: [
      'Flexible remote working schedules anywhere globally',
      'Performance-linked annual revenue sharing bonuses',
      'Equity options inside Edgrow Technologies',
      'Generous 28-day annual paid holiday cycle',
    ],
  },
];

const mockTestimonials: Testimonial[] = [
  {
    name: 'Emir Everett',
    role: 'Product Author',
    company: 'Publishing Solutions',
    quote: 'The whole process was clear and simple. They answered my questions quickly and helped me publish without confusion.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
  },
  {
    name: 'Amara Wijewardena',
    role: 'Chief Innovation Officer',
    company: 'Ceylon Commerce Bank',
    quote: 'Edgrow rebuilt our public interface and integrated our secure customer signups within record time. They are the best web developers in Colombo, bar none.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 5,
  },
  {
    name: 'Oliver Harrison',
    role: 'Founder & CEO',
    company: 'FitSync Europe',
    quote: 'Working with Edgrows UK-Sri Lanka bridge allowed us to speed up feature testing by 200%. The quality of code is flawless, pristine, and clean.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    rating: 5,
  },
  {
    name: 'Dr. Aruni Perera',
    role: 'Director of Academic Affairs',
    company: 'Lanka Institute of Science & Technology',
    quote: 'Edgrow converted our chaotic, fragmented educational system into an elegant, scalable visual platform. Our student metrics skyrocketed within months.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    rating: 5,
  },
  {
    name: 'Edward Thornton',
    role: 'Chief Compliance Officer',
    company: 'Apex Wealth Management UK',
    quote: 'The team at Edgrow understands corporate security. They delivered a highly technical product ahead of deadline with impeccable code compliance.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5,
  },
];

const mockPricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'SaaS Starter',
    price: '$2,499',
    period: 'one-time starting price',
    description: 'Perfect for startups launching their initial Minimum Viable Product (MVP) or corporate landings.',
    features: [
      'Custom Next.js Web Application Design',
      'Up to 5 Fully Responsive Pages',
      'SEO Keyword Research & On-Page Setup',
      'Sanity.io Headless CMS Integration',
      'Fully Managed Deployment (Vercel/AWS)',
      '1 Month of Free Maintenance & Updates',
    ],
  },
  {
    id: 'growth',
    name: 'Enterprise Growth',
    price: '$5,999',
    period: 'one-time starting price',
    description: 'Our most popular tier. Tailored for fast-scaling brands requiring complex database engines.',
    features: [
      'Up to 12 Responsive Pages & Dynamic Routes',
      'Custom PostgreSQL Schema Design',
      'Full-Stack Node.js/API Security Gateway',
      'Advanced Custom Micro-Interactions & Framer Motion',
      'Google Maps & Stripe Payment Integration',
      '3 Months of Dedicated Production Support',
    ],
    isPopular: true,
  },
  {
    id: 'custom',
    name: 'Custom Corporate Scale',
    price: 'Custom Quote',
    period: 'project-based',
    description: 'For global enterprises requiring cloud clusters, DevOps automation, and robust custom portals.',
    features: [
      'Unlimited Pages & Complex Application Logic',
      'Dedicated AWS / Kubernetes Cloud Orchestration',
      'Complete CRM/ERP Custom Business Workflows',
      'Core Web Vitals Speed Guarantees (Score 95+)',
      'Full SLA Maintenance contracts & Security Audits',
      'Dedicated Tech Architect Support',
    ],
  },
];

const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where is Edgrow Technologies located?',
    answer: 'Edgrow Technologies maintains active operational hubs in Colombo, Sri Lanka and London, United Kingdom. This strategic dual-region model allows us to offer world-class offshore development pricing with secure, local UK project management, accountability, and communication pipelines.',
  },
  {
    id: 'faq-2',
    category: 'Services',
    question: 'How do you guarantee Core Web Vitals loading speeds?',
    answer: 'We architect our frontends exclusively using Next.js Server Components, strict image compression routines, font preloading, and code-splitting. This keeps the bundle size extremely light, allowing us to hit 95+ mobile and desktop speed scores consistently.',
  },
  {
    id: 'faq-3',
    category: 'Pricing',
    question: 'What is your payment model?',
    answer: 'For custom projects, we typically operate on a milestone-based pricing structure (e.g., 25% kickoff, 25% design system approval, 30% development completion, and 20% final signoff after deployment). We also offer dedicated retainer options for ongoing DevOps and security maintenance.',
  },
  {
    id: 'faq-4',
    category: 'Careers',
    question: 'Does Edgrow offer internship opportunities?',
    answer: 'Absolutely! Our internship application program is always open. We are proud of our Edgrow Academy pipeline, mentoring promising engineering students and tech graduates inside real production teams, with full transition opportunities to full-time engineering posts.',
  },
];

const mockBlogPosts: Post[] = [
  {
    title: 'Why Headless Next.js + Sanity.io Beats Traditional WordPress in 2026',
    slug: 'why-nextjs-sanity-beats-wordpress',
    excerpt: 'Traditional WordPress monoliths are slow and insecure. Discover why progressive corporations are migrating to clean Next.js static headless architectures.',
    publishedAt: '2026-06-15T09:00:00Z',
    author: mockAuthors.kasun,
    categories: ['Engineering', 'SEO'],
    readTime: '5 min read',
    mainImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
    content: `
      <h2>The Death of the Monolithic CMS</h2>
      <p>For over two decades, WordPress powered a massive chunk of the web. But in today's landscape, site load times directly dictate sales conversions, and security breaches cost trillions. This is why forward-thinking enterprises are choosing <strong>Headless Next.js and Sanity.io</strong>.</p>
      <h2>1. Loading Speed is a Core Ranking Signal</h2>
      <p>Google Core Web Vitals directly impact your domain's organic ranking. While traditional WordPress requires heavy caching layers, heavy database roundtrips, and bulky plugins, Next.js generates static, highly optimized HTML pages directly during build time.</p>
      <h2>2. Iron-Clad CMS Security</h2>
      <p>WordPress is a massive target for automated hacker exploits. In a headless environment, your Sanity CMS database sits behind a secure, isolated API gateway.</p>
      <h2>Conclusion</h2>
      <p>Investing in custom Next.js and Sanity architectures guarantees a future-proof, robust client experience that converts traffic into enterprise revenue.</p>
    `,
  },
  {
    title: 'The Ultimate Guide to Technical SEO & Core Web Vitals for Modern SaaS',
    slug: 'ultimate-guide-technical-seo-core-web-vitals',
    excerpt: 'Understand Google\'s ranking signals and how to structure your Next.js metadata, images, and layout shifts to achieve perfect search visibility.',
    publishedAt: '2026-07-02T10:30:00Z',
    author: mockAuthors.sarah,
    categories: ['SEO', 'Product Design'],
    readTime: '8 min read',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    content: `
      <h2>Cracking the Page Experience Code</h2>
      <p>Technical SEO is no longer just about filling your meta tags with random keywords. Google's page experience signals actively measure visual stability and user response delays.</p>
      <h2>The Metrics that Matter</h2>
      <p><strong>LCP (Largest Contentful Paint):</strong> Target under 2.5 seconds. <strong>CLS (Cumulative Layout Shift):</strong> Target near 0. <strong>INP:</strong> Target under 200ms.</p>
      <h2>How Edgrow Achieves Perfection</h2>
      <p>We leverage native Next.js NextImage formatting with strict aspect ratios, inline CSS critical paths, and defer large third-party trackers.</p>
    `,
  },
];

// ─── Helper: run a Sanity fetch and fall back to mock data ────────────────────
async function fetchWithFallback<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  // Only attempt live fetch when a project ID is configured
  if (!projectId || projectId === 'your-project-id') {
    console.info('[Sanity] No projectId configured — using mock data');
    return fallback;
  }
  try {
    console.info('[Sanity] Fetching:', query.trim().slice(0, 80));
    const result = await client.fetch<T>(query, params);
    console.info('[Sanity] Result:', Array.isArray(result) ? `${(result as unknown[]).length} items` : result);
    // Only fall back to mock when result is null/undefined (fetch error path)
    // If Sanity returns an empty array, return it — the user has no content yet
    // and showing mock data would hide that fact.
    if (result === null || result === undefined) return fallback;
    return result;
  } catch (err) {
    console.error('[Sanity] ❌ Fetch FAILED — check token & project ID. Falling back to mock data.', err);
    return fallback;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const sanityClient = {
  // ── Services (live Sanity → fallback mock) ──────────────────────────────────
  getServices: (): Promise<Service[]> =>
    fetchWithFallback<Service[]>(SERVICES_QUERY, {}, initialServices),

  // ── Projects (live Sanity → fallback mock) ──────────────────────────────────
  getProjects: (): Promise<Project[]> =>
    fetchWithFallback<Project[]>(PROJECTS_QUERY, {}, mockProjects),

  getProjectById: async (id: string): Promise<Project | undefined> => {
    if (!projectId || projectId === 'your-project-id') {
      return mockProjects.find(p => p.id === id);
    }
    try {
      const result = await client.fetch<Project | null>(PROJECT_BY_ID_QUERY, { id });
      return result ?? mockProjects.find(p => p.id === id);
    } catch {
      return mockProjects.find(p => p.id === id);
    }
  },

  // ── Team (live Sanity → fallback mock) ──────────────────────────────────────
  getTeam: (): Promise<TeamMember[]> =>
    fetchWithFallback<TeamMember[]>(TEAM_QUERY, {}, mockTeam),

  // ── Jobs / Careers (live Sanity → fallback mock) ────────────────────────────
  getJobs: (): Promise<Job[]> =>
    fetchWithFallback<Job[]>(JOBS_QUERY, {}, mockJobs),

  // ── Testimonials (live Sanity → fallback mock) ───────────────────────────────
  getTestimonials: async (): Promise<Testimonial[]> => {
    const reviews = await fetchWithFallback<Testimonial[]>(TESTIMONIALS_QUERY, {}, mockTestimonials);
    return reviews.length > 0 ? reviews : mockTestimonials;
  },

  // ── Pricing (live Sanity → fallback mock) ──────────────────────────────────
  getPricingPlans: async (): Promise<PricingPlan[]> => {
    const plans = await fetchWithFallback<PricingPlan[]>(PRICING_QUERY, {}, mockPricingPlans);
    return plans.length > 0 ? plans : mockPricingPlans;
  },

  // ── FAQs (live Sanity → fallback mock) ──────────────────────────────────────
  getFAQs: async (): Promise<FAQ[]> => {
    const faqs = await fetchWithFallback<FAQ[]>(FAQS_QUERY, {}, mockFAQs);
    return faqs.length > 0 ? faqs : mockFAQs;
  },

  // ── Blog Posts (live Sanity → fallback mock) ────────────────────────────────
  getBlogPosts: (): Promise<Post[]> =>
    fetchWithFallback<Post[]>(POSTS_QUERY, {}, mockBlogPosts),

  getBlogPostBySlug: async (slug: string): Promise<Post | undefined> => {
    if (!projectId || projectId === 'your-project-id') {
      return mockBlogPosts.find(p => p.slug === slug);
    }
    try {
      const result = await client.fetch<{
        title: string;
        slug: string;
        excerpt: string;
        publishedAt: string;
        readTime: string;
        mainImage: string;
        categories: string[];
        author: Author;
        body: unknown[];
      } | null>(POST_BY_SLUG_QUERY, { slug });

      if (!result) return mockBlogPosts.find(p => p.slug === slug);

      return {
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        publishedAt: result.publishedAt,
        readTime: result.readTime,
        mainImage: result.mainImage,
        categories: result.categories,
        author: result.author,
        content: blocksToHtml(result.body ?? []),
      };
    } catch {
      return mockBlogPosts.find(p => p.slug === slug);
    }
  },

  // ── Form submissions (static-site compatible email delivery) ────────────────
  submitContactForm: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> => {
    return submitEmailForm({
      ...data,
      _subject: `New Edgrow contact inquiry: ${data.subject || 'General inquiry'}`,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
      formType: 'Website contact form',
    });
  },

  submitApplication: async (data: {
    roleId: string;
    roleTitle: string;
    name: string;
    email: string;
    coverLetter: string;
    resume: File;
  }): Promise<boolean> => {
    // 1. Primary: Save application document and PDF resume asset directly in Sanity Studio
    try {
      const apiFormData = new FormData();
      apiFormData.append('name', data.name);
      apiFormData.append('email', data.email);
      apiFormData.append('roleId', data.roleId);
      apiFormData.append('roleTitle', data.roleTitle);
      apiFormData.append('coverLetter', data.coverLetter);
      apiFormData.append('resume', data.resume);

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: apiFormData,
      });

      const resData = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && resData?.success) {
        return true;
      }
    } catch (err) {
      console.warn('[Sanity API] /api/applications request error. Falling back to email.', err);
    }

    // 2. Fallback: Send email via FormSubmit if API route is unavailable
    const payload = new FormData();
    payload.append('name', data.name);
    payload.append('email', data.email);

    const fullMessage = `
=== NEW CAREER APPLICATION ===

Role Applied: ${data.roleTitle}
Applicant Name: ${data.name}
Applicant Email: ${data.email}

--- Cover Letter / Pitch ---
${data.coverLetter || '(No cover note provided)'}

--- Important ---
The applicant has attached their resume to this email.
    `.trim();

    payload.append('message', fullMessage);
    payload.append('role', data.roleTitle);

    if (data.resume) {
      payload.append('attachment', data.resume, data.resume.name);
    }

    payload.append('_subject', `New Edgrow career application: ${data.name} for ${data.roleTitle}`);
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    payload.append('_honey', '');

    return submitEmailForm(payload);
  },

};
