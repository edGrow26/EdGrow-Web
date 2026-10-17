'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Server,
  Zap,
  ShieldCheck,
  Globe2,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Clock,
  Gauge
} from 'lucide-react';

type TabKey = 'architecture' | 'vitals' | 'stack';

export default function HeroEngineeringConsole() {
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [selectedNode, setSelectedNode] = useState<string>('dual-region');

  const nodes = [
    {
      id: 'edge',
      name: 'Global Anycast Edge',
      type: 'Networking',
      latency: '8ms',
      status: 'Nominal',
      desc: 'Cloudflare enterprise edge routing with DDoS armor, SSL termination, and localized caching.',
      icon: Globe2,
      metrics: '300+ Edge POPs · <10ms TTFB'
    },
    {
      id: 'dual-region',
      name: 'Dual-Region Core Hubs',
      type: 'Execution',
      latency: '18ms / 24ms',
      status: 'Synchronized',
      desc: 'Colombo Technical Operations Cluster paired with London Strategy & Delivery Architecture.',
      icon: Server,
      metrics: 'Active-Active Failover · Zero Downtime'
    },
    {
      id: 'nextjs',
      name: 'Next.js 16 Turbo Engine',
      type: 'App Router',
      latency: '22ms',
      status: 'Optimized',
      desc: 'React 19 Server Components, streaming SSR, and automated static generation with Turbopack.',
      icon: Cpu,
      metrics: 'Sub-second Hydration · 100/100 CWV'
    },
    {
      id: 'sanity',
      name: 'Sanity Content Lake',
      type: 'Data Layer',
      latency: '14ms',
      status: 'Live Sync',
      desc: 'Decoupled headless content graph delivering instant real-time GROQ queries across all endpoints.',
      icon: Database,
      metrics: 'Instant Webhooks · Real-time Caching'
    }
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[1];

  return (
    <div className="hero-console hero-console-dark-hud w-full max-w-5xl mx-auto mt-14 sm:mt-20">
      {/* Doppelrand (Double-Bezel) Outer Shell */}
      <div className="relative rounded-[2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/15 via-white/[0.04] to-transparent ring-1 ring-white/10 shadow-[0_30px_100px_rgba(0,102,214,0.18)] backdrop-blur-xl">
        {/* Glow backdrop illumination */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-primary/30 via-accent/30 to-mint/30 blur-3xl pointer-events-none opacity-40" aria-hidden="true" />

        {/* Inner Core Card */}
        <div className="relative rounded-[calc(2rem-6px)] sm:rounded-[calc(2rem-8px)] bg-[#040812]/95 border border-white/10 overflow-hidden shadow-2xl text-left">
          
          {/* Top System Bar */}
          <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
            {/* macOS Window Controls + Terminal Monogram */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span className="text-slate-200 font-semibold">edgrow-telemetry.sys</span>
                <span className="text-slate-500">v2.6.4</span>
              </div>
            </div>

            {/* Live Dual-Region Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
              </span>
              <span className="text-white font-bold">LK-CMB: 18ms</span>
              <span className="text-slate-600">|</span>
              <span className="text-accent font-bold">UK-LON: 24ms</span>
              <span className="hidden md:inline text-emerald-400 font-bold ml-1">· 99.99% Uptime</span>
            </div>

            {/* Tab Navigation Buttons */}
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vitals')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'vitals'
                    ? 'bg-accent text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Web Vitals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'stack'
                    ? 'bg-mint text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Tech Stack
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'architecture' && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent block mb-1">
                        Live Topology Map · Dual-Region Fabric
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        Global Distribution with Sub-Second Edge Rehydration
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        All Nodes Healthy
                      </span>
                    </div>
                  </div>

                  {/* Node Cards Horizontal Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {nodes.map((node) => {
                      const Icon = node.icon;
                      const isSelected = selectedNode === node.id;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedNode(node.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                            isSelected
                              ? 'bg-gradient-to-b from-white/10 to-white/[0.03] border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30'
                              : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                              isSelected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-slate-300'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">
                              {node.latency}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                            {node.type}
                          </div>
                          <div className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                            {node.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Node Inspector Detail Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-transparent border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-sm font-bold">{activeNodeData.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Status: {activeNodeData.status}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
                          {activeNodeData.desc}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right font-mono text-[11px] text-accent bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                      {activeNodeData.metrics}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vitals' && (
                <motion.div
                  key="vitals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mint block mb-1">
                        Google Core Web Vitals · Field Telemetry
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        Measured Velocity That Drives High Conversion
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>Audited Realtime: 99.8th Percentile</span>
                    </div>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>LCP (Speed)</span>
                        <span className="text-emerald-400 font-bold">Good</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white mb-1">
                        0.58<span className="text-accent text-xl">s</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Largest Contentful Paint (P95)
                      </div>
                      <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[95%] h-full bg-gradient-to-r from-accent to-mint rounded-full" />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>Lighthouse</span>
                        <span className="text-emerald-400 font-bold">Perfect</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white mb-1">
                        100<span className="text-mint text-xl">/100</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Global Performance Score
                      </div>
                      <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-full h-full bg-mint rounded-full" />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>INP (Latency)</span>
                        <span className="text-emerald-400 font-bold">&lt;15ms</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white mb-1">
                        12<span className="text-primary text-xl">ms</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Interaction to Next Paint
                      </div>
                      <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[98%] h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>SLA Uptime</span>
                        <span className="text-emerald-400 font-bold">Guaranteed</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white mb-1">
                        99.99<span className="text-emerald-400 text-xl">%</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Zero-Unplanned Downtime
                      </div>
                      <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[99.9%] h-full bg-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stack' && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary block mb-1">
                        Modern Production Stack · 2026 Ready
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        Built with the World&apos;s Leading Frameworks
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      Standardized Architecture
                    </span>
                  </div>

                  {/* Tech Stack Pills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: 'Next.js 16 Turbo', tag: 'App Router & SSR', color: 'from-blue-500/20 to-primary/20 text-primary' },
                      { name: 'React 19', tag: 'Server Actions & Concurrency', color: 'from-cyan-500/20 to-accent/20 text-accent' },
                      { name: 'TypeScript 5.8', tag: 'Strict Enterprise Typing', color: 'from-indigo-500/20 to-blue-500/20 text-indigo-400' },
                      { name: 'Tailwind CSS v4', tag: 'High-Speed Oxide Engine', color: 'from-teal-500/20 to-emerald-500/20 text-mint' },
                      { name: 'Motion & GSAP', tag: '60fps Spring Motion', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400' },
                      { name: 'Sanity Headless CMS', tag: 'Realtime Content Lake', color: 'from-amber-500/20 to-rose-500/20 text-amber-300' },
                      { name: 'Cloudflare Edge CDN', tag: 'Sub-50ms Global Routing', color: 'from-orange-500/20 to-amber-500/20 text-orange-400' },
                      { name: 'ISO / SOC-2 Aligned', tag: 'Enterprise Security Guard', color: 'from-emerald-500/20 to-mint/20 text-mint' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-between"
                      >
                        <div className="text-sm font-bold text-white mb-1">{item.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{item.tag}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Terminal Status Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Security Protocols: ISO 27001 Aligned</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Colombo Node: 99.99%</span>
              <span className="text-slate-600">|</span>
              <span>London Node: 100.0%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
