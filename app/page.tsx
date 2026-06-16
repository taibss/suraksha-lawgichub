"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Phone, ChevronDown, ChevronUp, X, MessageCircle } from "lucide-react";

const PULSE = [
  "Senior dodges ₹14L digital arrest call",
  "Fake SEBI WhatsApp groups busted — don't invest",
  "UPI collect fraud rising in Mumbai",
  "4 arrested in fake task job scam",
  "Loan app harassment crackdown underway",
];

const DOOR_STYLES = [
  { bg: "bg-[#15dbdb] text-foreground border-2 border-border" },
  { bg: "bg-lime text-lime-foreground" },
  { bg: "bg-ink text-ink-foreground" },
  { bg: "bg-card text-foreground border-2 border-border" },
];

const RIGHTS = [
  {
    tag: "FIR",
    stat: "0",
    statLabel: "valid reasons to refuse",
    title: "No police station can refuse your complaint",
    body: "Under Section 154 CrPC, any police station must register your FIR. If they refuse, you can send it by post to the SP, file online on the state portal, or approach a Magistrate directly. Refusal is itself an offence.",
  },
  {
    tag: "MONEY",
    stat: "3",
    statLabel: "working days to get zero liability",
    title: "Banks must cap your liability if you report fast",
    body: "RBI's customer-protection rules give you zero liability for unauthorised electronic transactions caused by bank negligence or third-party fraud — if you report within 3 working days. Even up to 7 days, your liability is capped.",
  },
  {
    tag: "ARREST",
    stat: "∞",
    statLabel: "fake — digital arrest doesn't exist",
    title: "There is no such thing as a 'digital arrest'",
    body: "No law in India permits 'digital arrest'. Police, CBI, ED, or Narcotics cannot arrest you over a video call. If someone claims this, hang up immediately — it is always a scam.",
  },
  {
    tag: "EVIDENCE",
    stat: "100%",
    statLabel: "valid in Indian courts",
    title: "Screenshots and chats are valid legal evidence",
    body: "Under the IT Act and Indian Evidence Act, electronic records including WhatsApp chats, emails, screenshots, and call recordings are admissible as evidence in court.",
  },
  {
    tag: "CYBER",
    stat: "1930",
    statLabel: "national helpline, free 24/7",
    title: "You can report cybercrime anonymously",
    body: "cybercrime.gov.in allows you to report crimes without disclosing your identity. You can also call 1930, the national cyber financial fraud helpline, anytime.",
  },
];

const BOT_OPTIONS = [
  { label: "I've been scammed", to: "/help" },
  { label: "Today's scams", to: "/scams" },
  { label: "My rights", to: "/#rights" },
];

function RightsSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-border">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-foreground leading-none">{r.stat}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-foreground leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-border flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-foreground" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-background" />
                : <ChevronDown className="size-3.5 text-muted-foreground" />}
            </div>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function RightsSectionOrange() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#1a4a2e]/30">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-[#1a4a2e] leading-none">{r.stat}</p>
                <p className="text-[10px] text-[#f5f0e8]/70 leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a4a2e] mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-[#f5f0e8] leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-[#1a4a2e]/40 flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-[#1a4a2e] border-[#1a4a2e]" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-[#f5f0e8]" />
                : <ChevronDown className="size-3.5 text-[#1a4a2e]" />}
            </div>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-[#f5f0e8]/80 pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function RightsSectionDark() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-white/10">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-lime leading-none">{r.stat}</p>
                <p className="text-[10px] text-white/40 leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-lime/70 mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-white leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-white/20 flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-lime border-lime" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-lime-foreground" />
                : <ChevronDown className="size-3.5 text-white/40" />}
            </div>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-white/60 pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function MessageText({ text }: { text: string }) {
  const router = useRouter();
  const linkRegex = /\/(help|scams|how-it-works)(?:\/\S*)?/g;
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
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{ text: "Hey! I'm Suraksha 👋 What happened?" }],
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();

      setMessages([
        ...updated,
        {
          role: "model",
          parts: [{ text: data.reply }],
        },
      ]);
    } catch (err) {
      console.error("CHAT ERROR: ", err);
      setMessages([
        ...updated,
        {
          role: "model",
          parts: [{ text: "Something went wrong. Please call 1930 directly." }],
        },
      ]);
    } finally {
      setLoading(false);
    }

    if (redirectPath) {
      router.push(redirectPath.to);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-ink border-2 border-lime shadow-xl transition-transform hover:scale-105"
        aria-label="Ask Suraksha"
      >
        {open ? (
          <X className="size-5 text-lime" />
        ) : (
          <MessageCircle className="size-6 text-lime" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[420px] rounded-2xl border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)] flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
            <span className="size-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm font-bold">Suraksha · your safety guide</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-foreground text-background" : "bg-muted text-foreground"}`}>
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

            {loading && <div className="text-sm text-muted-foreground">Suraksha is thinking...</div>}

            <div ref={bottomRef} />
          </div>

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
              className="rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background"
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
  useEffect(() => {
    if (window.location.hash === "#rights") {
      setTimeout(() => {
        document.getElementById("rights")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Pulse strip */}
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

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
          <span className="inline-flex items-center rounded-full bg-lime px-4 py-1.5 text-xs font-bold tracking-widest text-lime-foreground">
            MUMBAI'S SCAM DEFENCE
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Got scammed?<br />We fix that.
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/85">
            Lawyer on call. Complaint drafted. No cap, no wait.
          </p>
          <div className="mt-6">
            <Link
              href="/scams"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[5px_5px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5"
            >
              Show me the scams
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Four doors */}
      <section className="bg-[#f0f0f0]">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="mb-4">
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight uppercase">
              WHAT ARE WE DEALING WITH?
            </p>
            <h4><p className="mt-1 text-sm text-muted-foreground">give us the lore</p></h4>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TREE.doors.map((d, i) => (
              <Link
                key={d.id}
                href={`/help/${d.id}`}
                className={`group relative rounded-2xl p-6 transition-transform hover:-translate-y-1 ${DOOR_STYLES[i % 4].bg}`}
              >
                <div className="text-3xl">{d.emoji}</div>
                <div className="mt-3 font-display text-xl font-extrabold">{d.title}</div>
                <p className="mt-1 text-sm opacity-75">{d.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Get help <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Alert Card */}
      <section className="bg-[#f0f0f0]">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="rounded-2xl bg-[#B91C1C] px-5 py-4 shadow-[5px_5px_0_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-[#FFD6D6] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Emergency Alert</span>
            </div>
            <h2 className="font-display text-xl font-extrabold text-white leading-tight">
              Scammed in the last 24 hours?
            </h2>
            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Call <span className="font-bold text-[#FFD6D6]">1930</span> immediately — banks can still freeze funds if you act fast.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/20 pt-3 mb-3">
              {[
                ["24 hrs", "golden window"],
                ["₹3.1Cr", "frozen this week"],
                ["12k+", "citizens helped"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p className="text-lg font-extrabold text-white font-display">{stat}</p>
                  <p className="text-[10px] text-white/60">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="tel:1930" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B91C1C] transition-all hover:-translate-y-0.5">
                <Phone className="size-3.5" /> Call 1930 now
              </a>
              <Link href="/help/money" className="inline-flex items-center gap-1.5 rounded-full border border-white/70 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-[#B91C1C] transition-colors">
                Walk me through it <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Rights */}
      <section id="rights" className="bg-[#f0f0f0]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Know your rights</p>
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-8">
            Things every Indian should know.
          </h2>
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
                  <p className="text-sm font-semibold text-[#1a4a2e]/70">Globally protected. Locally enforced.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "No police station can legally refuse to register your FIR",
                  "Banks must give zero liability if fraud is reported within 3 days",
                  "Digital arrest does not exist — hang up immediately",
                  "Screenshots and WhatsApp chats are valid evidence in court",
                  "You can report cybercrime anonymously via 1930 or cybercrime.gov.in",
                  "First legal consultation is free via District Legal Aid",
                ].map((right) => (
                  <div key={right} className="flex items-start gap-3">
                    <span className="mt-0.5 size-5 rounded-full bg-[#1a4a2e] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3.5 3.5L11 1" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-[#1a4a2e]">{right}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a4a2e] px-5 py-2.5 text-sm font-bold text-lime">
                Learn more about your rights →
              </button>
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
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f0f0f0]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">How it works</p>
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-8">
            Three moves. One unbothered you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Spot it", body: "Real scams turned into warnings you'll actually read. We translate every FIR into a one-line red flag." },
              { n: "02", title: "Block it", body: "Know the red flags before the crook calls. A 60-second checklist for every common scam pattern." },
              { n: "03", title: "Fix it", body: "A Fellow walks you through the report. A verified advocate is one tap away. 24×7." },
            ].map((s) => (
              <div key={s.n} className="flex md:flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">{s.n}</div>
                <div>
                  <div className="font-display text-xl font-bold">{s.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/how-it-works" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ink-foreground">
            Learn more →
          </Link>
        </div>
      </section>

      <SiteFooter />
      <Chatbot />
    </div>
  );
}
