'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, FileText, Send, Sparkles, CheckCircle2, User, Mail, Link as LinkIcon, Upload } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { sanityClient, Job } from '../../lib/sanity';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<'positions' | 'internship'>('positions');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCover, setFormCover] = useState('');
  const [formResume, setFormResume] = useState('');
  const [roleInterest, setRoleInterest] = useState('Full-Stack Web Development');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await sanityClient.getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    const success = await sanityClient.submitApplication({
      roleId: selectedJobId || 'internship',
      name: formName,
      email: formEmail,
      coverLetter: formCover,
      resumeName: formResume || 'Resume.pdf',
    });

    if (success) {
      setSubmitted(true);
      // Reset form states
      setFormName('');
      setFormEmail('');
      setFormCover('');
      setFormResume('');
    }
    setIsSubmitting(false);
  };

  const handleApplyClick = (jobId: string) => {
    setSelectedJobId(jobId);
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
            <Sparkles className="w-3.5 h-3.5 text-mint" />
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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-4 mb-16"
          >
            <div className="p-1 bg-white/5 border border-white/5 rounded-2xl flex">
              <button
                onClick={() => { setActiveTab('positions'); setSelectedJobId(null); setSubmitted(false); }}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'positions'
                    ? 'bg-gradient-to-r from-primary to-accent text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Open Positions ({jobs.length})
              </button>
              <button
                onClick={() => { setActiveTab('internship'); setSelectedJobId(null); setSubmitted(false); }}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'internship'
                    ? 'bg-gradient-to-r from-primary to-accent text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Internship Program (Always Open)
              </button>
            </div>
          </motion.div>

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
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                          selectedJobId === job.id
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
                            <p className="text-gray-400 text-xs font-medium mt-1">{job.location} • {job.type}</p>
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
                                  <span className="text-accent">•</span>
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
                                  <span className="text-mint">•</span>
                                  <span>{ben}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="internship"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-6"
                  >
                    <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center text-mint">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">Edgrow Tech Academy Internship</h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our Internship Program is an immersive, always-open recruitment stream aimed at promising university students and coding graduates in Sri Lanka and globally. Over 90% of our interns secure full-time engineering contracts inside Edgrow upon program completion.
                    </p>

                    <div className="flex flex-col gap-4 py-4 border-y border-white/5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs text-white block">One-on-One Technical Mentorship</strong>
                          <span className="text-gray-400 text-xs">Work directly alongside Kasun and our senior lead architects.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
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
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Unified Application Form */}
            <motion.div
              id="application-flow-section"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 scroll-mt-24"
            >
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl pointer-events-none" />
                
                <h3 className="text-lg font-bold text-white mb-1">
                  {activeTab === 'internship' ? 'Academy Application Portal' : 'Candidate Application Form'}
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  {selectedJobId 
                    ? `Applying for: ${jobs.find(j => j.id === selectedJobId)?.title}`
                    : 'Submit your candidate credentials for review.'}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center bg-accent/5 border border-accent/20 rounded-xl flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-6 h-6" />
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
                  <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <User className="w-3 h-3 text-accent" /> Full Name
                      </label>
                      <input
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Mail className="w-3 h-3 text-accent" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="dilshan@mail.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Role Selection (Only shown for General Internship) */}
                    {!selectedJobId && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                          Role of Interest
                        </label>
                        <select
                          value={roleInterest}
                          onChange={(e) => setRoleInterest(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent text-white"
                        >
                          <option>Full-Stack Web Development</option>
                          <option>Mobile App Engineering (React Native)</option>
                          <option>UI/UX Usability Design</option>
                          <option>SEO & Technical Copywriting</option>
                        </select>
                      </div>
                    )}

                    {/* Cover Note */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Brief Cover Note / Pitch
                      </label>
                      <textarea
                        rows={4}
                        value={formCover}
                        onChange={(e) => setFormCover(e.target.value)}
                        placeholder="Explain why you are excited to join Edgrow Tech..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    {/* Drag-and-Drop Mock Resume Upload (As per Usability Guideline) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Resume File Selection (PDF)
                      </label>
                      <div className="border border-dashed border-white/10 hover:border-accent/40 rounded-xl p-6 text-center cursor-pointer bg-white/[0.005] hover:bg-white/[0.02] transition-all flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-accent" />
                        <span className="text-xs text-gray-300">Drag & drop your CV files here or click to browse</span>
                        <span className="text-[10px] text-gray-500 font-mono">Max size: 5MB</span>
                        
                        {/* Simulation text input for CV filename to allow form completion in dev */}
                        <input
                          type="text"
                          value={formResume}
                          onChange={(e) => setFormResume(e.target.value)}
                          placeholder="Or type file name (e.g. Dilshan_CV.pdf)"
                          className="mt-2 w-full max-w-xs bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-center text-[10px] text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-accent to-mint hover:bg-gradient-to-r hover:from-mint hover:to-accent text-black font-bold text-xs rounded-xl shadow-lg transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Recording application...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Submit Application
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
