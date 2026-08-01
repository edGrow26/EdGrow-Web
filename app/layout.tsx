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
    default: 'Edgrow Technologies | Leading Web & Software Development Company',
    template: '%s | Edgrow Technologies'
  },
  description: 'Edgrow Technologies delivers world-class custom software development, web applications, and SEO services for Sri Lanka, the UK, and global enterprises.',
  keywords: [
    'Edgrow', 'Edgrow Tech', 'Edgrow Technologies', 'web development Sri Lanka',
    'software development Sri Lanka', 'web development UK', 'Colombo web development',
    'custom software development', 'e-commerce solutions', 'SEO services Sri Lanka'
  ],
  metadataBase: new URL('https://edgrow.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edgrow.co',
    title: 'Edgrow Technologies | Premium Software & Web Solutions',
    description: 'Empowering global brands with custom software development, high-performance web applications, and UI/UX design. Based in Sri Lanka & UK.',
    siteName: 'Edgrow Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edgrow Technologies | Web & Software Innovation',
    description: 'World-class offshore software development and web applications serving UK, Sri Lanka, and global markets.',
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
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
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
