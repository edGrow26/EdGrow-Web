'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Code, Cpu, ShoppingBag, Layers, TrendingUp, Cloud, CheckSquare, Sparkles, ArrowRight } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { sanityClient, Service } from '../../lib/sanity';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await sanityClient.getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span>Scale Your Operations Effortlessly</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Our Products &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Technical Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We deliver state-of-the-art software systems and custom Next.js web solutions designed with modularity, scalability, and absolute security in mind.
          </motion.p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => {
              // Assign icons dynamically
              const IconComponent =
                service.id === 'custom-web' ? Code :
                service.id === 'enterprise-software' ? Cpu :
                service.id === 'ecommerce-solutions' ? ShoppingBag :
                service.id === 'ui-ux-design' ? Layers :
                service.id === 'seo-services' ? TrendingUp : Cloud;

              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`scroll-mt-24 p-8 sm:p-12 rounded-3xl bg-white/[0.01] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-stretch ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Subtle Background Glow per service card */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

                  {/* Icon & General Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                        {service.title}
                      </h2>
                      
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                        {service.detailedDescription}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Core Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden lg:block w-[1px] bg-white/5 self-stretch" />

                  {/* Key Capabilities */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">Key Deliverables</h3>
                      <ul className="flex flex-col gap-4">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3.5 text-sm text-gray-300 leading-normal">
                            <CheckSquare className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                     <div className="mt-10 lg:mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                      <Link
                        href={`/pricing?service=${service.id}`}
                        className="btn-premium-pill w-full sm:w-auto !px-6 !py-3 !text-xs text-center"
                      >
                        Check Estimate Pricing
                      </Link>
                      <Link
                        href={`/contact?subject=Service Inquiry: ${service.title}`}
                        className="btn-secondary-pill w-full sm:w-auto !px-6 !py-3 !text-xs text-center inline-flex items-center justify-center gap-1.5 group"
                      >
                        Contact Technical Consultant <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
