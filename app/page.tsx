"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/fade-up";
import splashLogo from "@/assets/lawgichub-logo.png";
import { ChatbotWidget } from "@/components/chatbot-widget";

const PULSE = [
  "Senior dodges ₹14L digital arrest call",
  "Fake SEBI WhatsApp groups busted — don't invest",
  "UPI collect fraud rising in Mumbai",
  "4 arrested in fake task job scam",
  "Loan app harassment crackdown underway",
];

const DOOR_STYLES = [
  { bg: "text-foreground border-2 border-border", style: { backgroundColor: "#83E7FF" } },
  { bg: "bg-lime text-lime-foreground", style: {} },
  { bg: "bg-ink text-ink-foreground", style: {} },
  { bg: "bg-card text-foreground border-2 border-border", style: {} },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setContentReady(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={splashLogo.src}
              alt=""
              className="w-full h-full object-contain p-12 md:p-20"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen">
        <SiteHeader />

        {/* Pulse strip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
        >
          <div className="bg-ink text-ink-foreground">
            <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-5 py-2.5">
              <span className="eyebrow shrink-0 text-lime">● Live</span>
              <div className="relative flex-1 overflow-hidden">
                <div className="marquee-track text-sm">
                  {[...PULSE, ...PULSE].map((t, i) => (
                    <span key={i} className="opacity-90">{t} <span className="text-lime/70">·</span></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-5 py-6 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            >
              <span className="inline-flex items-center rounded-full bg-lime px-4 py-1.5 text-xs font-bold tracking-widest text-lime-foreground">
                MUMBAI'S SCAM DEFENCE
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
            >
              <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
                Got scammed?<br></br>
                Start here.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.62 }}
            >
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.72 }}
            >

              <p className="mt-4 max-w-md text-lg font-semibold text-primary-foreground">
                Report it, get help, and talk to a lawyer. All in one place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Four doors */}
        <section style={{ backgroundColor: "#f0f0f0ff" }}>
          <div className="mx-auto max-w-6xl px-5 py-8">
            <FadeUp delay={0}>
              <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight uppercase">
                WHAT ARE WE DEALING WITH?
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-1 text-sm text-muted-foreground">You don't need to know the legal term. Just pick.</p>
            </FadeUp>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2 auto-rows-fr">
              {TREE.doors.map((d, i) => (
                <FadeUp key={d.id} delay={0.1 + i * 0.1} className="h-full">
                  <Link
                    href={"/help/" + d.id}
                    style={DOOR_STYLES[i % 4].style}
                    className={`group relative flex flex-col h-full rounded-2xl p-6 ${i % 4 === 2 ? "shadow-[5px_5px_0_0_white]" : "shadow-[5px_5px_0_0_var(--foreground)]"} transition-transform duration-300 hover:-translate-y-2 ${DOOR_STYLES[i % 4].bg}`}
                  >
                    <div className="text-3xl">{d.emoji}</div>
                    <div className="mt-3 font-display text-xl font-extrabold">{d.title}</div>
                    <p className="mt-1 text-sm opacity-75">{d.subtitle}</p>
                    <div className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Get help <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Alert Card */}
        <FadeUp delay={0}>
          <section style={{ backgroundColor: "#f0f0f0ff" }}>
            <div className="mx-auto max-w-6xl px-5 py-4">
              <div className="rounded-2xl bg-[#B91C1C] px-5 py-4 shadow-[5px_5px_0_0_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-[#FFD6D6] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                    Emergency Alert
                  </span>
                </div>
                <h2 className="font-display text-xl font-extrabold text-white leading-tight">
                  Just got scammed?
                </h2>
                <p className="mt-1 text-sm text-white/85 max-w-lg">
                  Call <span className="font-bold text-[#FFD6D6]" style={{ textShadow: "0 0 12px rgba(255,214,214,0.6)" }}>1930</span> right now —
                  banks can freeze the money if you act within 24 hours.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/20 pt-3 mb-3">
                  {[
                    ["24 hrs", "to act fast"],
                    ["₹3.1Cr", "frozen this week"],
                    ["12k+", "people helped"],
                  ].map(([stat, label], idx) => (
                    <FadeUp key={label} delay={0.1 + idx * 0.1}>
                      <div>
                        <p className="text-lg font-extrabold text-white font-display">
                          {stat}
                        </p>
                        <p className="text-[10px] text-white/60">
                          {label}
                        </p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:1930"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B91C1C] transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="size-3.5" />
                    Call 1930 now
                  </a>
                  <Link
                    href="/help/money"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/70 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-[#B91C1C] transition-colors"
                  >
                    Walk me through it
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* How it works */}
        <section style={{ backgroundColor: "#f0f0f0ff" }}>
          <div className="mx-auto max-w-6xl px-5 py-6">
            <FadeUp delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">How it works</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-4">
                Spot it. Stop it. Report it.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: "01", title: "Spot it", body: "Tell us what happened — takes 2 minutes. We match your situation to the exact scam type." },
                { n: "02", title: "Stop it", body: "Get your action plan instantly. Know exactly what to do, what not to do, and who to call." },
                { n: "03", title: "Report it", body: "File your complaint step by step. Talk to a verified advocate anytime — free first consultation." },
              ].map((s, idx) => (
                <FadeUp key={s.n} delay={0.1 + idx * 0.12}>
                  <div className="flex md:flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-display text-xl font-bold">{s.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.5}>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ink-foreground"
                >
                  Learn more →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Know Your Rights */}
        <section id="rights" style={{ backgroundColor: "#f0f0f0ff" }}>
          <div className="mx-auto max-w-6xl px-5 py-6">
            <FadeUp delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Know your rights</p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-4">
                Things every Indian should know.
              </h2>
            </FadeUp>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-lime flex flex-col md:flex-row">
                <div className="hidden md:flex flex-col justify-center px-5 py-8 gap-1 shrink-0">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} style={{ height: `${[6, 4, 8, 3, 7, 5, 9, 4, 6, 8, 3, 7, 5, 4, 9, 6, 4, 7][i]}px` }} className="w-5 bg-[#1a4a2e] rounded-sm opacity-80" />
                  ))}
                </div>
                <div className="flex-1 px-6 py-8">
                  <div className="flex items-center gap-3 mb-1">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a4a2e" strokeWidth="1.5" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <div>
                      <p className="font-display text-xl font-extrabold text-[#1a4a2e] leading-tight">Know Your Rights.</p>
                      <p className="text-sm font-semibold text-[#1a4a2e]/70">What the law says — in plain English.</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      "Police must register your FIR — refusal is illegal",
                      "Report bank fraud within 3 days for zero liability",
                      "Digital arrest is a scam — hang up immediately",
                      "Screenshots and chats count as evidence in court",
                      "Call 1930 or visit cybercrime.gov.in to report anonymously",
                      "Free legal help is available through District Legal Aid",
                    ].map((right, idx) => (
                      <FadeUp key={right} delay={0.2 + idx * 0.07}>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 size-5 rounded-full bg-[#1a4a2e] flex items-center justify-center shrink-0">
                            <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                              <path d="M1 5l3.5 3.5L11 1" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium text-[#1a4a2e]">{right}</span>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <Link href="/rights" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a4a2e] px-5 py-2.5 text-sm font-bold text-lime">
                    Learn more about your rights →
                  </Link>
                </div>
                <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                  <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#1a4a2e" strokeWidth="0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M12 2v20" />
                    <path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Happens After I Report */}
        <section style={{ backgroundColor: "#f0f0f0ff" }}>
          <div className="mx-auto max-w-6xl px-5 py-6">
            <FadeUp delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">What happens next</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-4">
                Here's exactly what happens after you report.
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", label: "Day 0", title: "You report", body: "Tell us what happened via the chatbot or help flow. Takes 2 minutes." },
                { step: "2", label: "Hour 1", title: "We guide you", body: "You get an instant action plan — what to do, who to call, what evidence to save." },
                { step: "3", label: "24 hours", title: "Lawyer reviews", body: "A verified advocate reviews your case and calls you back if needed." },
                { step: "4", label: "72 hours", title: "Bank or police acts", body: "Funds can be frozen. FIR gets filed. The system starts moving." },
              ].map((s, idx) => (
                <FadeUp key={s.step} delay={0.1 + idx * 0.1}>
                  <div className="rounded-2xl border border-border bg-background p-6 h-full flex flex-col">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                      {s.step}
                    </div>
                    <p className="mt-3 text-xs font-mono text-muted-foreground">{s.label}</p>
                    <p className="mt-1 font-display font-bold text-base">{s.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16" style={{ backgroundColor: "#f0f0f0ff" }} />
        <FadeUp delay={0}>
          <SiteFooter showStatement />
        </FadeUp>
        <ChatbotWidget />
      </div>
    </>
  );
}
