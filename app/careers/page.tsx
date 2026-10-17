'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, CheckCircle2, User, Mail, Upload, Briefcase, GraduationCap, ArrowUpRight, ArrowRight, Shield, Zap } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient, Job } from '../../lib/sanity';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<'positions' | 'internship'>('positions');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [applicationRoleId, setApplicationRoleId] = useState('internship');

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCover, setFormCover] = useState('');
  const [formResume, setFormResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const resumeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await sanityClient.getJobs();
      const activeJobs = data.filter(j => !j.status || j.status === 'active');
      setJobs(activeJobs);
    };
    fetchJobs();
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formResume) {
      setSubmitError('Please complete your name, email address, and attach your PDF resume.');
      return;
    }

    const applicationJob = jobs.find((job) => job.id === applicationRoleId);
    const roleTitle = applicationJob?.title || 'Internship Program';

    setIsSubmitting(true);
    setSubmitError('');
    const success = await sanityClient.submitApplication({
      roleId: applicationRoleId,
      roleTitle,
      name: formName,
      email: formEmail,
      coverLetter: formCover,
      resume: formResume,
    });

    if (success) {
      setSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormCover('');
      setFormResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } else {
      setSubmitError('Your application could not be delivered. Please try again or email your resume to edgrowproduct@gmail.com.');
    }
    setIsSubmitting(false);
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSubmitError('');

    if (!file) {
      setFormResume(null);
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      event.target.value = '';
      setFormResume(null);
      setSubmitError('Resume must be uploaded as a PDF file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = '';
      setFormResume(null);
      setSubmitError('Resume file must be 5 MB or smaller.');
      return;
    }

    setFormResume(file);
  };

  const handleApplyClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setApplicationRoleId(jobId);
    setSubmitted(false);
    const formSection = document.getElementById('application-flow-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — CAREERS COMMAND CENTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 font-medium tracking-wide mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>Join Edgrow Academy & Global Engineering Teams</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Build Your Career with{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Edgrow Technologies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            We compile world-class distributed applications and build lifelong careers. Discover open positions or submit an academy internship inquiry below.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: '90%+', label: 'Intern-to-FTE Conversion' },
              { val: '1:1', label: 'Senior Architect Mentorship' },
              { val: 'Remote / Hybrid', label: 'Flexible Work Culture' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{s.val}</span>
                <span className="block text-[11px] text-white/40 font-medium uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          JOB LISTINGS & APPLICATION PORTAL — DOPPELRAND
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Switcher Segmented Control */}
          <div className="flex justify-center mb-16">
            <div className="p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] flex gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md" role="tablist">
              <button
                onClick={() => { setActiveTab('positions'); setSelectedJobId(null); setSubmitted(false); }}
                role="tab"
                aria-selected={activeTab === 'positions'}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === 'positions'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Open Positions ({jobs.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('internship');
                  setSelectedJobId(null);
                  setApplicationRoleId('internship');
                  setSubmitted(false);
                }}
                role="tab"
                aria-selected={activeTab === 'internship'}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === 'internship'
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Internship Program (Always Open)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Positions or Internship Info */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <AnimatePresence mode="wait">
                {activeTab === 'positions' ? (
                  <motion.div
                    key="positions"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    {jobs.length === 0 ? (
                      <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]">
                        <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-12 text-center">
                          <p className="text-white/50 text-sm">No currently listed positions. Consider submitting an inquiry to our Internship Program!</p>
                        </div>
                      </div>
                    ) : (
                      jobs.map((job, idx) => {
                        const isSelected = selectedJobId === job.id;
                        return (
                          <ScrollAnimate key={job.id} variant="slideRight" delay={idx * 0.08}>
                            {/* Doppelrand outer shell */}
                            <div className={`rounded-[2rem] p-[1px] transition-all duration-500 ring-1 ${
                              isSelected
                                ? 'bg-gradient-to-b from-accent/50 via-accent/20 to-transparent ring-accent/30'
                                : 'bg-gradient-to-b from-white/[0.14] via-white/[0.03] to-transparent ring-white/[0.06] hover:from-white/[0.22]'
                            }`}>
                              {/* Inner card core */}
                              <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-7 sm:p-9 relative overflow-hidden backdrop-blur-xl">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                  <div>
                                    <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-bold tracking-widest text-accent uppercase block w-fit mb-3">
                                      {job.department}
                                    </span>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{job.title}</h3>
                                    <p className="text-white/40 text-xs font-mono mt-1.5">{job.location} • {job.type}</p>
                                  </div>

                                  <button
                                    onClick={() => handleApplyClick(job.id)}
                                    className="btn-premium-pill !px-5 !py-2.5 !text-xs cursor-pointer"
                                  >
                                    Apply For Role
                                    <span className="btn-icon-wrapper">
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                  </button>
                                </div>

                                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                                  {job.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/[0.06]">
                                  <div>
                                    <strong className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-3">
                                      Requirements
                                    </strong>
                                    <ul className="flex flex-col gap-2 text-xs text-white/60">
                                      {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-accent mt-0.5">•</span>
                                          <span>{req}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <strong className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-3">
                                      Key Benefits
                                    </strong>
                                    <ul className="flex flex-col gap-2 text-xs text-white/60">
                                      {job.benefits.map((ben, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-emerald-400 mt-0.5">•</span>
                                          <span>{ben}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </ScrollAnimate>
                        );
                      })
                    )}
                  </motion.div>
                ) : (
                  <ScrollAnimate variant="slideRight">
                    <motion.div
                      key="internship"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="rounded-[2rem] p-[1px] bg-gradient-to-b from-accent/25 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]"
                    >
                      <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-12 relative overflow-hidden flex flex-col gap-8 backdrop-blur-xl">
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent">
                          <GraduationCap className="w-7 h-7" aria-hidden="true" />
                        </div>

                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-3">
                            <span>Open All Year Round</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                            Edgrow Tech Academy Internship
                          </h3>
                          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                            Our Internship Program is an immersive, always-open recruitment stream aimed at promising university students and coding graduates in Sri Lanka and globally. Over 90% of our interns secure full-time engineering contracts inside Edgrow upon program completion.
                          </p>
                        </div>

                        <div className="flex flex-col gap-5 py-6 border-y border-white/[0.06]">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent shrink-0 mt-0.5">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <strong className="text-sm text-white block font-bold mb-1">One-on-One Technical Mentorship</strong>
                              <span className="text-white/50 text-xs leading-relaxed block">Work directly alongside Kasun and our senior lead architects in Colombo and London.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent shrink-0 mt-0.5">
                              <Shield className="w-4 h-4" />
                            </div>
                            <div>
                              <strong className="text-sm text-white block font-bold mb-1">Real Production Project Deliveries</strong>
                              <span className="text-white/50 text-xs leading-relaxed block">No dummy sandbox apps. You will contribute code directly to live, high-traffic client platforms.</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/40 text-xs font-mono leading-relaxed">
                          Interested? Submit your resume, cover letter, and role preferences in the right-hand portal to launch your technical review.
                        </p>
                      </div>
                    </motion.div>
                  </ScrollAnimate>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Unified Application Form in Doppelrand Card */}
            <ScrollAnimate variant="slideLeft" delay={0.15} className="lg:col-span-5 scroll-mt-28">
              <div id="application-flow-section" className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-9 relative overflow-hidden backdrop-blur-xl">
                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[80px] pointer-events-none" />

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {activeTab === 'internship' ? 'Academy Application Portal' : 'Candidate Application Form'}
                  </h3>
                  <p className="text-xs font-mono text-white/40 mb-8">
                    Role: {jobs.find((job) => job.id === applicationRoleId)?.title || 'Internship Program'}
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 px-6 text-center bg-white/[0.02] border border-white/[0.08] rounded-2xl flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h4 className="text-base font-bold text-white">Application Recorded Successfully</h4>
                      <p className="text-white/50 text-xs leading-relaxed max-w-xs">
                        Thank you for applying. Our talent recruitment team in Colombo or London will review your portfolio files and connect via email within 48 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-secondary-pill !px-5 !py-2 !text-xs mt-2"
                      >
                        File Another Form
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="career-name" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3 h-3 text-accent" aria-hidden="true" /> Full Name
                        </label>
                        <input
                          id="career-name"
                          name="name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Dilshan Silva"
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="career-email" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-accent" aria-hidden="true" /> Email Address
                        </label>
                        <input
                          id="career-email"
                          name="email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="dilshan@mail.com"
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Role Selector */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="career-role" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block">
                          Role of Interest
                        </label>
                        <select
                          id="career-role"
                          name="role"
                          required
                          value={applicationRoleId}
                          onChange={(event) => {
                            const roleId = event.target.value;
                            setApplicationRoleId(roleId);
                            setSelectedJobId(roleId === 'internship' ? null : roleId);
                            setActiveTab(roleId === 'internship' ? 'internship' : 'positions');
                          }}
                          className="w-full bg-[#040812] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="internship">Internship Program</option>
                          {jobs.map((job) => (
                            <option key={job.id} value={job.id}>{job.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Cover Note */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="career-cover" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block">
                          Brief Cover Note / Pitch
                        </label>
                        <textarea
                          id="career-cover"
                          name="coverLetter"
                          rows={3}
                          value={formCover}
                          onChange={(e) => setFormCover(e.target.value)}
                          placeholder="Explain why you are excited to join Edgrow Tech..."
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        />
                      </div>

                      {/* Resume Upload */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="career-resume" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block">
                          Resume (PDF)
                        </label>
                        <label htmlFor="career-resume" className="border border-dashed border-white/[0.12] hover:border-white/30 rounded-xl p-5 text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col items-center gap-2">
                          <Upload className="w-5 h-5 text-accent" aria-hidden="true" />
                          <span className="text-xs text-white/80">
                            {formResume ? formResume.name : 'Select your PDF resume'}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">PDF only • Max 5MB</span>

                          <input
                            id="career-resume"
                            name="attachment"
                            type="file"
                            ref={resumeInputRef}
                            required
                            accept="application/pdf,.pdf"
                            onChange={handleResumeChange}
                            className="sr-only"
                          />
                        </label>
                      </div>

                      {submitError && (
                        <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3" role="alert">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-premium-pill w-full text-center mt-2 cursor-pointer"
                      >
                        {isSubmitting ? 'Recording Application...' : 'Submit Application'}
                        <span className="btn-icon-wrapper">
                          <Send className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </ScrollAnimate>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
