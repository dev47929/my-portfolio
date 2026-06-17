import React, { useState } from "react";
import { Send, Check } from "lucide-react";
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
    "px-4 py-3 bg-[#030508] border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/35 transition-colors";

  return (
    <section
      className="bg-[#0c1017]/90 border border-[#1e293b]/70 hover:border-sky-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden"
      id="let-talk-section"
    >
      {/* Decorative neon glow */}
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left: info panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest block">
            // GET_IN_TOUCH
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Let's Talk
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
            What led you here? What are you looking for? I would love to hear from you over a
            virtual coffee chat!
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Quick Connection
            </span>
            <a href={`mailto:${PORTFOLIO_BIO.email}`} className="text-xs font-mono text-sky-400 hover:underline">
              {PORTFOLIO_BIO.email}
            </a>
          </div>
        </div>

        {/* Right: contact form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name field */}
            <div className="flex flex-col gap-1.5">
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
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Email Address *
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
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Your Message *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Let's build something fantastic..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading" || !email || !message}
            className="mt-2 py-3 px-6 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-mono text-xs font-bold text-black rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10 active:scale-98 transition-all"
          >
            {status === "loading" ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>SENDING...</span>
              </>
            ) : status === "success" ? (
              <>
                <Check className="w-4 h-4" />
                <span>SENT!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Let's get in touch ↗</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
