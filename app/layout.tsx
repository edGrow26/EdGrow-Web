import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import AnimationManager from '../components/AnimationManager';
import PageTransitionLoader from '../components/PageTransitionLoader';
import ThemeToggle from '../components/ThemeToggle';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: 'Web & Software Development Company in Sri Lanka | Edgrow Technologies',
    template: '%s | Edgrow Technologies',
  },

  description:
    'Edgrow Technologies is a web and software development company providing custom software, high-performance websites, web applications, and SEO services in Sri Lanka, the UK, and worldwide.',

  keywords: [
    'Edgrow Technologies',
    'web development company Sri Lanka',
    'software development company Sri Lanka',
    'custom software development Sri Lanka',
    'web application development',
    'website development Sri Lanka',
    'Next.js development',
    'SEO services Sri Lanka',
    'web development UK',
  ],

  metadataBase: new URL('https://edgrowtech.com'),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edgrowtech.com',
    title:
      'Web & Software Development Company in Sri Lanka | Edgrow Technologies',
    description:
      'Custom software, high-performance websites, web applications, and SEO services for businesses in Sri Lanka, the UK, and worldwide.',
    siteName: 'Edgrow Technologies',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Web & Software Development Company in Sri Lanka | Edgrow Technologies',
    description:
      'Custom software, high-performance websites, web applications, and SEO services for businesses in Sri Lanka, the UK, and worldwide.',
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '512x512',
    },
    shortcut: '/favicon.png',
    apple: {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '512x512',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.remove('light')}else{document.documentElement.classList.add('light')}}catch(e){}",
          }}
        />
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="google-site-verification" content="1UicDHCBng8e-ubNnSeRUFEKKi9IW2uDP1SNRkQ0W48" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans h-full bg-black text-white antialiased selection:bg-primary selection:text-white`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[99999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:font-bold focus:text-xs">
          Skip to main content
        </a>
        <AnimationManager />
        <PageTransitionLoader />
        <ThemeToggle />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
