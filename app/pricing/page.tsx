'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InteractiveCostCalculator from '../../components/InteractiveCostCalculator';
import { sanityClient, PricingPlan } from '../../lib/sanity';

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await sanityClient.getPricingPlans();
      setPlans(data);
    };
    fetchPlans();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Pricing Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span>Fully Transparent Milestone Cost Models</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Transparent & Scalable{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Project Pricing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Choose a structured kickoff paradigm or utilize our interactive cost calculator below to calculate tailored software budget ranges.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards Grid Section */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-28">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden ${
                  plan.isPopular
                    ? 'bg-primary/5 border-accent shadow-2xl shadow-primary/10'
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                {/* Popular tag overlay */}
                {plan.isPopular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-accent to-mint text-black font-extrabold rounded-md text-[9px] uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">{plan.price}</span>
                    <span className="text-gray-500 text-xs font-semibold">{plan.period}</span>
                  </div>

                  <div className="h-[1px] bg-white/5 my-6" />

                  <ul className="flex flex-col gap-3.5 mb-10">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-gray-300 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`/contact?subject=Plan Inquiry: ${plan.name}&plan=${plan.id}`}
                  className={`w-full py-3.5 text-center text-xs font-bold rounded-xl transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-accent to-mint text-black shadow-[0_0_15px_rgba(0,191,165,0.3)] hover:scale-[1.01]'
                      : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  Initiate Project Milestone
                </a>

              </motion.div>
            ))}
          </div>

          {/* Embedded Interactive Cost Calculator Widget */}
          <div className="border-t border-white/5 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-bold text-mint uppercase tracking-widest block mb-3">Modular Budget Estimation</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Interactive Timeline & Cost Calculator</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3">
                Adjust sliders to customize page outputs, timeline pacing, and integrations to calculate an instantaneous price range.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <InteractiveCostCalculator />
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
