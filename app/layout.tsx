import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import AnimationManager from '../components/AnimationManager';
import ThemeToggle from '../components/ThemeToggle';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full scroll-smooth`}>
      <body className="font-sans h-full bg-black text-white antialiased selection:bg-primary selection:text-white">
        <AnimationManager />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
