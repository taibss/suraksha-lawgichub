"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/fade-up";
import splashLogo from "@/assets/lawgichub-logo.png";
import nyayOwl from "@/assets/suraksha-owl.png";

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

const BOT_OPTIONS = [
  { label: "I've been scammed", to: "/help" },
  { label: "Today's scams", to: "/scams" },
  { label: "My rights", to: "/#rights" },
];

function MessageText({ text }: { text: string }) {
  const router = useRouter();
  const linkRegex = /\/(help|scams|how-it-works|rights|blog|advocate)(?:\/\S*)?/g;
  const parts: (string | { path: string })[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push({ path: match[0] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <button
            key={i}
            onClick={() => router.push(p.path)}
            className="underline font-semibold hover:text-primary cursor-pointer bg-transparent border-none p-0 inline"
          >
            {p.path}
          </button>
        )
      )}
    </>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; parts: Array<{ text: string }> }>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("nyay-chat");
        if (saved) return JSON.parse(saved);
      } catch { }
    }
    return [
      {
        role: "model",
        parts: [{ text: "Hey! I'm Nyay, Suraksha's legal guide. I'm sorry you're going through this — whatever happened, you're not alone. Tell me what happened and I'll help you figure out the next steps. Suraksha is here for you." }],
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      sessionStorage.setItem("nyay-chat", JSON.stringify(messages));
    } catch { }
  }, [messages]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setShowBubble(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowBubble(false);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function redirectFromInput(text: string) {
    const t = text.toLowerCase();

    const leafMatches: [string[], string][] = [
      [["digital arrest", "fake police video call", "video call police"], "digital_arrest"],
      [["parcel threat", "fake parcel", "parcel crime"], "fake_parcel_threat"],
      [["identity misuse", "aadhaar misuse", "sim misuse threat"], "identity_misuse_threat"],
      [["police fine", "security deposit police"], "fake_police_payment"],
      [["sextortion", "intimate", "naked video", "nude video"], "sextortion_real"],
      [["morphed photo", "morphed video", "fake photo", "fake nude"], "sextortion_morphed"],
      [["send to contacts", "send to family", "share with contacts"], "sextortion_contact_threat"],
      [["already shared", "photo leaked", "video leaked"], "sextortion_shared"],
      [["private information", "personal info blackmail"], "private_info_blackmail"],
      [["business extortion", "reputation extortion"], "business_extortion"],
      [["false case", "false allegation"], "false_case_threat"],
      [["repeat extortion", "repeated extortion"], "repeat_extortion"],
      [["whatsapp harassment", "phone harassment", "call harassment"], "whatsapp_harassment"],
      [["social media harassment", "impersonation", "fake account"], "social_harassment"],
      [["stalking", "following me", "offline stalking"], "offline_stalking"],
      [["ex threatening", "known person", "neighbour threat"], "known_person_threat"],
      [["upi paid", "upi blocked", "gpay blocked", "phonepe blocked", "paytm blocked"], "upi_paid_blocked"],
      [["qr code", "scan qr", "qr receive", "receive money qr"], "qr_receive_scam"],
      [["shared otp", "otp scam", "upi pin scam", "card detail scam"], "otp_pin_scam"],
      [["remote access", "anydesk", "teamviewer", "bank drain"], "remote_access_scam"],
      [["fake customer care", "customer care scam"], "fake_customer_care"],
      [["unauthorised transaction", "unauthorized transaction"], "unauthorised_transaction"],
      [["telegram investment", "whatsapp investment", "telegram group scam"], "telegram_investment"],
      [["crypto scam", "bitcoin scam", "fake exchange", "crypto trading"], "crypto_scam"],
      [["sebi", "rbi regulated", "regulated investment"], "fake_regulated_investment"],
      [["task investment", "recharge scam", "investment task"], "task_investment"],
      [["job fee", "registration fee", "training fee scam"], "job_fee_scam"],
      [["task job", "likes scam", "reviews scam", "youtube like"], "task_job_scam"],
      [["visa scam", "overseas job", "foreign job"], "visa_job_scam"],
      [["equipment deposit", "security deposit job"], "equipment_deposit_job"],
      [["loan app harassment", "loan app threatening", "abusive loan"], "loan_app_harassment"],
      [["loan app contacts", "loan app family", "loan app friends"], "loan_app_contacts"],
      [["morphed image loan", "loan app photo"], "loan_app_morphed"],
      [["fake loan demand", "loan without borrowing"], "fake_loan_extortion"],
      [["kyc scam", "kyc update", "account block scam"], "kyc_scam"],
      [["credit card reward", "credit card limit", "reward points scam"], "credit_card_reward"],
      [["trai scam", "sim misuse", "sim blocked", "sim card scam"], "sim_trai_scam"],
      [["account frozen", "cyber lien", "bank freeze"], "account_lien"],
      [["atm misuse", "debit card misuse", "card cloned"], "atm_misuse"],
      [["instagram scam", "instagram shop", "social media shop"], "instagram_shop"],
      [["olx scam", "facebook marketplace", "marketplace scam"], "marketplace_scam"],
      [["courier scam", "customs scam", "parcel scam", "courier parcel"], "courier_customs"],
      [["refund scam", "ecommerce refund", "replacement fraud", "order refund"], "ecommerce_refund"],
      [["matrimonial scam", "matrimony scam", "shaadi scam"], "matrimonial_scam"],
      [["romance scam", "dating app scam", "online dating"], "romance_scam"],
      [["honey trap", "honey trap scam"], "honey_trap"],
      [["report online fraud", "file cyber complaint", "report cybercrime"], "cyber_report_needed"],
      [["1930 not reachable", "1930 not working", "1930 busy"], "1930_issue"],
      [["complaint delay", "portal update delay", "site not working"], "portal_delay"],
      [["bank asking fir", "bank needs complaint", "bank asking cyber report"], "bank_needs_cyber"],
      [["fir refused", "police refused fir", "police not registering"], "fir_refused"],
      [["civil matter", "police says civil"], "civil_matter_pushback"],
      [["police not acting", "police inaction", "threat police no action"], "threat_police_inaction"],
      [["bank reversal", "bank freeze fraud", "transaction reversal"], "bank_reversal"],
      [["bank rejected", "bank not helping", "bank complaint rejected"], "bank_rejected"],
      [["consumer refund", "seller refund", "product refund"], "consumer_refund"],
      [["telecom issue", "sim issue", "mobile network complaint", "jio airtel"], "telecom_issue"],
      [["travel scam", "booking scam", "flight refund", "train refund"], "travel_booking_scam"],
      [["course scam", "coaching scam", "education scam", "training scam"], "course_scam"],
      [["salary not paid", "unpaid salary", "employer not paying"], "salary_not_paid"],
      [["freelance unpaid", "client not paying", "freelancer payment"], "freelance_unpaid"],
      [["security deposit", "deposit not returned", "rent deposit"], "deposit_not_returned"],
      [["illegal eviction", "landlord eviction", "forced eviction"], "illegal_eviction"],
      [["rental scam", "broker scam", "rental listing", "rent agreement"], "rental_listing"],
      [["domestic violence", "domestic abuse"], "domestic_violence"],
      [["family threatening", "relationship threat", "family problem"], "family_relationship_threat"],
    ];

    for (const [keywords, leafId] of leafMatches) {
      if (keywords.some((k) => t.includes(k))) {
        return { to: `/help/leaf/${leafId}` };
      }
    }

    const doorKeywords: [string[], string][] = [
      [["today's scams", "today scams", "show me scams", "what are today scams", "scam list", "scam radar"], "/scams"],
      [["lawyer", "advocate", "talk to lawyer", "legal help", "legal advice"], "/advocate"],
      [["blog", "read blog", "articles", "guides"], "/blog"],
      [["rights", "my rights", "know your rights", "legal rights"], "/rights"],
      [["threat", "blackmail", "extortion", "scared", "afraid"], "/help/threats"],
      [["money", "upi", "investment", "job", "loan", "bank", "shopping", "fraud", "paid", "transfer", "scam", "lost", "gift", "task", "commission", "stock", "crypto", "trading"], "/help/money"],
      [["police", "fir", "complaint", "station", "report", "cyber cafe", "cyber crime"], "/help/process"],
      [["work", "home", "family", "divorce", "tenant", "landlord", "rent"], "/help/other"],
    ];

    for (const [keywords, door] of doorKeywords) {
      if (keywords.some((k) => t.includes(k))) {
        return { to: door };
      }
    }

    return null;
  }

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = {
      role: "user",
      parts: [{ text: input }],
    };

    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput("");
    setLoading(true);

    const redirectPath = redirectFromInput(input);

    if (redirectPath) {
      const isDistress = ["/help", "/help/money", "/help/threats", "/help/process", "/help/other", "/advocate"].some(p => redirectPath.to.startsWith(p));
      setTimeout(() => {
        const redirectMsg = {
          role: "model",
          parts: [{
            text: isDistress
              ? "I'm sorry you're dealing with this. Let me take you somewhere that can help. Suraksha has your back."
              : "Sure! Let me take you there. Suraksha has got you covered."
          }],
        };
        setMessages([...updated, redirectMsg]);
        setLoading(false);
        setTimeout(() => {
          router.push(redirectPath.to);
        }, 800);
      }, 1500);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();

      setTimeout(() => {
        setMessages([
          ...updated,
          {
            role: "model",
            parts: [{ text: data.reply }],
          },
        ]);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("CHAT ERROR: ", err);
      setTimeout(() => {
        setMessages([
          ...updated,
          {
            role: "model",
            parts: [{ text: "I'm sorry, something went wrong on my end. Please call 1930 — they can help you right now. You're not alone in this. Suraksha is always here." }],
          },
        ]);
        setLoading(false);
      }, 1500);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Speech bubble - appears after 3s when chat is closed */}
        {!open && showBubble && (
          <div className="absolute bottom-full right-0 mb-3 opacity-0 animate-[fadeInBubble_0.4s_ease_forwards] pointer-events-none">
            <div className="relative rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink whitespace-nowrap shadow-lg border-2 border-[#7C3AED]">
              Hi! I'm Nyay
              <div className="absolute top-full right-6 -mt-px">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#7C3AED]" />
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex size-20 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105"
          style={!open ? { animation: "owlBounce 2s ease-in-out infinite, owlGlow 2s ease-in-out infinite" } : undefined}
          aria-label="Ask Nyay"
        >
          {open ? (
            <div className="flex size-20 items-center justify-center rounded-full bg-ink border-2 border-[#7C3AED]">
              <X className="size-6 text-[#7C3AED]" />
            </div>
          ) : (
            <img
              src={nyayOwl.src}
              alt="Nyay assistant"
              className="size-20 rounded-full object-cover"
            />
          )}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-80 h-[420px] rounded-2xl border-2 border-[#7C3AED] bg-background shadow-[4px_4px_0_0_#7C3AED] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
            <div className="relative shrink-0">
              <img src={nyayOwl.src} alt="" className="size-9 rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#7C3AED] border-2 border-background animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-bold">Nyay</span>
              <span className="block text-[10px] text-muted-foreground">Suraksha's legal guide</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                {m.role === "model" && (
                  <img src={nyayOwl.src} alt="" className="size-7 rounded-full object-cover shrink-0" />
                )}
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-foreground text-background" : "bg-muted text-foreground"}`}>
                  <MessageText text={m.parts[0].text} />
                </div>
              </div>
            ))}

            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 px-1">
                {BOT_OPTIONS.map((opt) => (
                  <Link
                    key={opt.to}
                    href={opt.to}
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors text-center"
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            )}

            {loading && <div className="text-sm text-muted-foreground">Nyay is thinking...</div>}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="What happened?"
              className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-bold text-white hover:bg-[#6D28D9] transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

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
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.82 }}
              className="mt-6"
            >
              <Link
                href="/scams"
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[5px_5px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5"
              >
                Show me the scams
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-white text-xs font-bold">
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

        <FadeUp delay={0}>
          <SiteFooter />
        </FadeUp>
        <Chatbot />
      </div>
    </>
  );
}
