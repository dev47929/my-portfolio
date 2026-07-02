import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Check, Mail, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";

/**
 * ContactSection
 * "Let's Talk" section with contact info on the left and a submit form on the right.
 * Owns its own form state. Calls setToastMessage on success.
 * @param {Function} setToastMessage - Shows a floating toast notification.
 */
export default function ContactSection({ setToastMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setToastMessage("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  const inputClass =
    "px-4 py-3 bg-[#030508] border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all duration-300";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#0c1017]/90 border border-[#1e293b]/70 hover:border-sky-500/40 rounded-2xl p-6 md:p-10 relative overflow-hidden transition-all duration-500 group"
      id="let-talk-section"
    >
      {/* Animated Decorative Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none opacity-50" />
      
      {/* Pulsing neon glows */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:0.5s]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:1.5s]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left: info panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
              Available for new projects
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest">
              // GET_IN_TOUCH
            </span>
            <div className="h-px w-12 bg-sky-500/50"></div>
          </div>
          
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight relative w-fit">
            Let's Talk
            <div className="absolute -bottom-2 left-0 h-[3px] w-1/3 bg-sky-500 rounded-full blur-[1px] transition-all duration-500 group-hover:w-2/3"></div>
          </h2>
          
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-md">
            What led you here? What are you looking for? I would love to hear from you over a
            virtual coffee chat!
          </p>

          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Direct Line
            </span>
            <a 
              href={`mailto:${PORTFOLIO_BIO.email}`} 
              className="group/link flex items-center justify-between p-4 rounded-xl border border-slate-800 hover:border-sky-500/40 bg-[#030508] hover:bg-[#0a0e14] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 group-hover/link:bg-sky-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover/link:text-white transition-colors">
                  {PORTFOLIO_BIO.email}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover/link:text-sky-400 group-hover/link:rotate-45 transition-all duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Right: contact form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          onSubmit={handleSubmit}
          className="lg:col-span-7 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dev Sharma"
                className={inputClass}
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Email Address <span className="text-sky-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="visitor@domain.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Message field */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Your Message <span className="text-sky-400">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Let's build something fantastic..."
              className={`${inputClass} resize-none h-full min-h-[120px]`}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading" || !email || !message}
            className="relative mt-2 py-4 px-6 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-mono text-xs font-bold text-black rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 active:scale-[0.98] transition-all duration-200 overflow-hidden group/btn"
          >
            {/* Sliding shine effect */}
            <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover/btn:w-full"></span>
            
            <span className="relative z-10 flex items-center gap-2">
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : status === "success" ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>MESSAGE SENT!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  <span>SEND MESSAGE ↗</span>
                </>
              )}
            </span>
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
}