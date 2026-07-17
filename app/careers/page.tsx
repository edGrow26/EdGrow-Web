'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, CheckCircle2, User, Mail, Upload } from 'lucide-react';

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
      // Show all jobs, or if status field is present, only show active ones
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
      // Reset form states
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
    // Smooth scroll to application form
    const formSection = document.getElementById('application-flow-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Careers Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Join Edgrow Academy & Global Engineering Teams</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Build Your Career with{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Edgrow Tech
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We compile world-class applications and build lifelong career foundations. Discover open roles or submit an internship inquiry below.
          </motion.p>
        </div>
      </section>

      {/* Job listings & Tabs Section */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Toggle Tabs */}
          <ScrollAnimate variant="fadeDown">
            <div className="flex justify-center gap-4 mb-16">
              <div className="p-1 bg-white/5 border border-white/5 rounded-2xl flex" role="tablist" aria-label="Career sections">
                <button
                  onClick={() => { setActiveTab('positions'); setSelectedJobId(null); setSubmitted(false); }}
                  role="tab"
                  aria-selected={activeTab === 'positions'}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'positions'
                      ? 'bg-gradient-to-r from-primary to-accent text-black shadow'
                      : 'text-gray-400 hover:text-white'
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
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'internship'
                      ? 'bg-gradient-to-r from-primary to-accent text-black shadow'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Internship Program (Always Open)
                </button>
              </div>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Positions or Internship Info */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <AnimatePresence mode="wait">
                {activeTab === 'positions' ? (
                  <motion.div
                    key="positions"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    {jobs.map((job, idx) => (
                      <ScrollAnimate key={job.id} variant="slideRight" delay={idx * 0.1}>
                        <div
                          className={`p-6 sm:p-8 rounded-2xl border transition-all ${selectedJobId === job.id
                              ? 'bg-primary/5 border-accent'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                            }`}
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <span className="text-[10px] bg-accent/10 text-accent font-bold px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit mb-2">
                                {job.department}
                              </span>
                              <h3 className="text-lg font-bold text-white">{job.title}</h3>
                              <p className="text-gray-400 text-xs font-medium mt-1">{job.location} &bull; {job.type}</p>
                            </div>

                            <button
                              onClick={() => handleApplyClick(job.id)}
                              className="px-4 py-2 bg-white/5 hover:bg-accent hover:text-black border border-white/10 rounded-xl text-xs font-bold transition-all"
                            >
                              Apply Now
                            </button>
                          </div>

                          <p className="text-gray-300 text-xs leading-relaxed mb-6">
                            {job.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                            <div>
                              <strong className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">Requirements:</strong>
                              <ul className="flex flex-col gap-1 text-[11px] text-gray-300">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="text-accent" aria-hidden="true">&bull;</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">Key Benefits:</strong>
                              <ul className="flex flex-col gap-1 text-[11px] text-gray-300">
                                {job.benefits.map((ben, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="text-mint" aria-hidden="true">&bull;</span>
                                    <span>{ben}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                        </div>
                      </ScrollAnimate>
                    ))}
                  </motion.div>
                ) : (
                  <ScrollAnimate variant="slideRight">
                    <motion.div
                      key="internship"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-6"
                    >
                      <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center text-mint">
                        <Sparkles className="w-6 h-6" aria-hidden="true" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">Edgrow Tech Academy Internship</h3>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        Our Internship Program is an immersive, always-open recruitment stream aimed at promising university students and coding graduates in Sri Lanka and globally. Over 90% of our interns secure full-time engineering contracts inside Edgrow upon program completion.
                      </p>

                      <div className="flex flex-col gap-4 py-4 border-y border-white/5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <strong className="text-xs text-white block">One-on-One Technical Mentorship</strong>
                            <span className="text-gray-400 text-xs">Work directly alongside Kasun and our senior lead architects.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <strong className="text-xs text-white block">Real Production Project Deliveries</strong>
                            <span className="text-gray-400 text-xs">No dummy sandbox apps. You will contribute to live, high-traffic client platforms.</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs italic">
                        Interested? Submit your resume, cover letter, and role preferences in the right-hand application portal to launch your review pipeline.
                      </p>
                    </motion.div>
                  </ScrollAnimate>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Unified Application Form */}
            <ScrollAnimate variant="slideLeft" delay={0.15} className="lg:col-span-5 scroll-mt-24">
              <div id="application-flow-section" className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl pointer-events-none" aria-hidden="true" />

                <h3 className="text-lg font-bold text-white mb-1">
                  {activeTab === 'internship' ? 'Academy Application Portal' : 'Candidate Application Form'}
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Applying for: {jobs.find((job) => job.id === applicationRoleId)?.title || 'Internship Program'}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center bg-accent/5 border border-accent/20 rounded-xl flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h4 className="text-base font-extrabold text-white">Application Recorded Successfully</h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Thank you for applying. Our talent recruitment team in Colombo or London will review your portfolio files and connect via email within 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                      File Another Form
                    </button>
                  </motion.div>
                ) : (
                  <form
                    action="https://formsubmit.co/edgrowproduct@gmail.com"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleApplySubmit}
                    className="flex flex-col gap-4"
                  >

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="career-name" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="career-email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Active Sanity positions plus the always-open internship. */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="career-role" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
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
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent text-white"
                      >
                        <option value="internship">Internship Program</option>
                        {jobs.map((job) => (
                          <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Cover Note */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="career-cover" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Brief Cover Note / Pitch
                      </label>
                      <textarea
                        id="career-cover"
                        name="coverLetter"
                        rows={4}
                        value={formCover}
                        onChange={(e) => setFormCover(e.target.value)}
                        placeholder="Explain why you are excited to join Edgrow Tech..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="career-resume" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Resume File Selection (PDF)
                      </label>
                      <label htmlFor="career-resume" className="border border-dashed border-white/10 hover:border-accent/40 rounded-xl p-6 text-center cursor-pointer bg-white/[0.005] hover:bg-white/[0.02] transition-all flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-accent" aria-hidden="true" />
                        <span className="text-xs text-gray-300">
                          {formResume ? formResume.name : 'Click to select your PDF resume'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">Max size: 5MB</span>

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

                    {/* Submit Button */}
                    {submitError && (
                      <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3" role="alert">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-accent to-mint hover:bg-gradient-to-r hover:from-mint hover:to-accent text-black font-bold text-xs rounded-xl shadow-lg transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" aria-hidden="true" /> Recording application...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" /> Submit Application
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </ScrollAnimate>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
