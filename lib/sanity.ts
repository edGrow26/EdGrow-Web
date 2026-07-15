// Mock Sanity Client with Realistic Schema Definitions & Content for Edgrow Technologies

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
  content: string; // HTML or Markdown formatted content
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
  type: string; // Full-time, Remote, etc.
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
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
  category: string; // General, Services, Pricing, Careers
}

// Initial Data representing CMS state
const initialAuthors: Record<string, Author> = {
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

const initialServices: Service[] = [
  {
    id: 'custom-web',
    title: 'Custom Web Development',
    icon: 'Code',
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
    icon: 'Cpu',
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
    icon: 'ShoppingBag',
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
    icon: 'Layers',
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
    icon: 'TrendingUp',
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
    icon: 'Cloud',
    shortDescription: 'Serverless deployments, continuous integration (CI/CD), scalable SQL/NoSQL databases, and security audits.',
    detailedDescription: 'Secure, reliable cloud environments that scale. We provision optimized infrastructures on AWS, Google Cloud, and Azure with continuous deployment workflows.',
    features: [
      'AWS / GCP Cloud Architecture design',
      'Zero-downtime CI/CD deployment pipelines',
      'Serverless computing & auto-scaling setups',
      'Database replication and automated failovers',
    ],
    technologies: ['AWS', 'Docker', 'GitHub Actions', 'Terraform', 'Kubernetes'],
  }
];

const initialProjects: Project[] = [
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
  }
];

const initialTeam: TeamMember[] = [
  {
    name: 'Kasun Jayawardena',
    role: 'Co-Founder & Chief Technology Officer',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Sarah Jenkins',
    role: 'Co-Founder & Creative Director',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Devinda Perera',
    role: 'Lead Cloud Infrastructure Architect',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Tharushi Alwis',
    role: 'Senior Full-Stack Developer',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  }
];

const initialJobs: Job[] = [
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
    ]
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
    ]
  }
];

const initialTestimonials: Testimonial[] = [
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
  }
];

const initialPricingPlans: PricingPlan[] = [
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
  }
];

const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where is Edgrow Technologies located?',
    answer: 'Edgrow Technologies maintains active operational hubs in Colombo, Sri Lanka and London, United Kingdom. This strategic dual-region model allows us to offer world-class offshore development pricing with secure, local UK project management, accountability, and communication pipelines.'
  },
  {
    id: 'faq-2',
    category: 'Services',
    question: 'How do you guarantee Core Web Vitals loading speeds?',
    answer: 'We architect our frontends exclusively using Next.js Server Components, strict image compression routines, font preloading, and code-splitting. This keeps the bundle size extremely light, allowing us to hit 95+ mobile and desktop speed scores consistently.'
  },
  {
    id: 'faq-3',
    category: 'Pricing',
    question: 'What is your payment model?',
    answer: 'For custom projects, we typically operate on a milestone-based pricing structure (e.g., 25% kickoff, 25% design system approval, 30% development completion, and 20% final signoff after deployment). We also offer dedicated retainer options for ongoing DevOps and security maintenance.'
  },
  {
    id: 'faq-4',
    category: 'Careers',
    question: 'Does Edgrow offer internship opportunities?',
    answer: 'Absolutely! Our internship application program is always open. We are proud of our Edgrow Academy pipeline, mentoring promising engineering students and tech graduates inside real production teams, with full transition opportunities to full-time engineering posts.'
  }
];

const initialBlogPosts: Post[] = [
  {
    title: 'Why Headless Next.js + Sanity.io Beats Traditional WordPress in 2026',
    slug: 'why-nextjs-sanity-beats-wordpress',
    excerpt: 'Traditional WordPress monoliths are slow and insecure. Discover why progressive corporations are migrating to clean Next.js static headless architectures.',
    publishedAt: '2026-06-15T09:00:00Z',
    author: initialAuthors.kasun,
    categories: ['Engineering', 'SEO'],
    readTime: '5 min read',
    mainImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
    content: `
      <h2>The Death of the Monolithic CMS</h2>
      <p>For over two decades, WordPress powered a massive chunk of the web. But in today's landscape, site load times directly dictate sales conversions, and security breaches cost trillions. This is why forward-thinking enterprises are choosing <strong>Headless Next.js and Sanity.io</strong>.</p>
      
      <h2>1. Loading Speed is a Core Ranking Signal</h2>
      <p>Google Core Web Vitals directly impact your domain's organic ranking. While traditional WordPress requires heavy caching layers, heavy database roundtrips, and bulky plugins, Next.js generates static, highly optimized HTML pages directly during build time. This means your corporate pages load instantly, from anywhere in Colombo to London.</p>
      
      <h2>2. Iron-Clad CMS Security</h2>
      <p>WordPress is a massive target for automated hacker exploits due to its public database entry routes and plugin vulnerabilities. In a headless environment, your Sanity CMS database sits behind a secure, isolated API gateway. Since there is no public database route connected to the frontend client, your pages are virtually impossible to hack.</p>
      
      <h2>Conclusion</h2>
      <p>Investing in custom Next.js and Sanity architectures guarantees a future-proof, robust client experience that converts traffic into enterprise revenue.</p>
    `
  },
  {
    title: 'The Ultimate Guide to Technical SEO & Core Web Vitals for Modern SaaS',
    slug: 'ultimate-guide-technical-seo-core-web-vitals',
    excerpt: 'Understand Google’s ranking signals and how to structure your Next.js metadata, images, and layout shifts to achieve perfect search visibility.',
    publishedAt: '2026-07-02T10:30:00Z',
    author: initialAuthors.sarah,
    categories: ['SEO', 'Product Design'],
    readTime: '8 min read',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    content: `
      <h2>Cracking the Page Experience Code</h2>
      <p>Technical SEO is no longer just about filling your meta tags with random keywords. Google's page experience signals actively measure visual stability and user response delays.</p>
      
      <h2>The Metrics that Matter</h2>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> How quickly the main visual elements load. Target: under 2.5 seconds.</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Preventing unrequested movement of buttons or text on load. Target: near 0.</li>
        <li><strong>INP (Interaction to Next Paint):</strong> The delay between customer click and browser paint response. Target: under 200ms.</li>
      </ul>
      
      <h2>How Edgrow Achieves Perfection</h2>
      <p>We leverage native Next.js NextImage formatting with strict aspect ratios, inline CSS critical paths, and defer large third-party trackers. This guarantees your site passes every search index hurdle.</p>
    `
  }
];

// In-Memory Client Service providing clean exports and persistent form mock inputs
export const sanityClient = {
  getServices: async (): Promise<Service[]> => {
    return initialServices;
  },
  
  getProjects: async (): Promise<Project[]> => {
    return initialProjects;
  },
  
  getProjectById: async (id: string): Promise<Project | undefined> => {
    return initialProjects.find(p => p.id === id);
  },
  
  getTeam: async (): Promise<TeamMember[]> => {
    return initialTeam;
  },
  
  getJobs: async (): Promise<Job[]> => {
    return initialJobs;
  },
  
  getTestimonials: async (): Promise<Testimonial[]> => {
    return initialTestimonials;
  },
  
  getPricingPlans: async (): Promise<PricingPlan[]> => {
    return initialPricingPlans;
  },
  
  getFAQs: async (): Promise<FAQ[]> => {
    return initialFAQs;
  },
  
  getBlogPosts: async (): Promise<Post[]> => {
    return initialBlogPosts;
  },
  
  getBlogPostBySlug: async (slug: string): Promise<Post | undefined> => {
    return initialBlogPosts.find(p => p.slug === slug);
  },
  
  submitContactForm: async (data: { name: string; email: string; subject: string; message: string }): Promise<boolean> => {
    console.log('Sending message to Edgrow backend / email stream:', data);
    // Simulating API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  },
  
  submitApplication: async (data: { roleId: string; name: string; email: string; coverLetter: string; resumeName: string }): Promise<boolean> => {
    console.log('Filing career candidate profile in Sanity CMS application database:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
};
