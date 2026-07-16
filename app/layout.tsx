import type { Metadata } from 'next';
import './globals.css';
import AnimationManager from '../components/AnimationManager';
import ThemeToggle from '../components/ThemeToggle';

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
    icon: '/EdGrow%20Logo.png',
    shortcut: '/EdGrow%20Logo.png',
    apple: '/EdGrow%20Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Load Plus Jakarta Sans with display=swap to prevent FOIT (Flash of Invisible Text) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Dancing+Script:wght@600;700&family=Playball&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans h-full bg-black text-white antialiased selection:bg-primary selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[99999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:font-bold focus:text-xs">
          Skip to main content
        </a>
        <AnimationManager />
        <ThemeToggle />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
