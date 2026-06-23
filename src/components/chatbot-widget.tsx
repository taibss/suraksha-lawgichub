"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import nyayOwl from "@/assets/suraksha-owl.png";

const WELCOME_TEXT = "Hi, I'm Nyay 👋\n\nTell me what happened and I'll help you understand your options.";

const QUICK_ACTIONS = [
  "I've been scammed",
  "Someone is threatening me",
  "UPI fraud",
  "Today's scams",
];

type Message = { role: string; text: string };

function MessageText({ text }: { text: string }) {
  const router = useRouter();
  if (!text) return null;
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
            className="font-semibold underline underline-offset-2 opacity-80 transition-opacity hover:opacity-100"
          >
            {p.path}
          </button>
        )
      )}
    </>
  );
}

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

const WELCOME_MSG: Message = { role: "model", text: WELCOME_TEXT };

export function ChatbotWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("nyay-chat");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("nyay-chat", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      if (!hasWelcomed && messages.length === 0) {
        setMessages([WELCOME_MSG]);
        setHasWelcomed(true);
      }
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, hasWelcomed, messages.length]);

  const showQuickActions = open && messages.length <= 1 && messages[0]?.role === "model";

  const send = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", text: msg };
    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput("");
    setLoading(true);

    const redirectPath = redirectFromInput(msg);

    if (redirectPath) {
      const isDistress = ["/help", "/help/money", "/help/threats", "/help/process", "/help/other", "/advocate"].some(
        (p) => redirectPath.to.startsWith(p)
      );
      setTimeout(() => {
        const redirectMsg: Message = {
          role: "model",
          text: isDistress
            ? "I'm sorry you're dealing with this. Let me take you somewhere that can help. Suraksha has your back."
            : "Sure! Let me take you there. Suraksha has got you covered.",
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
        body: JSON.stringify({ messages: updated.map((m) => ({ role: m.role, parts: [{ text: m.text }] })) }),
      });
      const data = await res.json();

      setTimeout(() => {
        setMessages([...updated, { role: "model", text: data.reply }]);
        setLoading(false);
      }, 1500);
    } catch {
      setTimeout(() => {
        setMessages([
          ...updated,
          {
            role: "model",
            text: "I'm sorry, something went wrong on my end. Please call 1930 — they can help you right now. You're not alone in this. Suraksha is always here.",
          },
        ]);
        setLoading(false);
      }, 1500);
    }
  }, [input, loading, messages, router]);

  return (
    <>
      {/* Compact Widget */}
      <AnimatePresence>
        {!open && visible && (
          <motion.div
            key="widget"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-5 z-50"
          >
            <div className="group relative transition-all duration-300 hover:-translate-y-1">
              <button
                onClick={() => setOpen(true)}
                className="w-[220px] rounded-2xl border border-border bg-card p-4 pb-3.5 text-left shadow-[0_6px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_6px_32px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Online
                  </span>
                </div>
                <p className="mt-2.5 font-display text-[15px] font-bold leading-tight tracking-tight text-foreground">
                  Ask Nyay
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                  AI Legal Assistant
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  Tell me what happened. I&apos;ll guide you through it.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-bold text-background transition-all duration-200 group-hover:brightness-110">
                  Let&apos;s talk
                  <span className="text-[10px] opacity-60">→</span>
                </div>
              </button>
              <div
                className="absolute -right-2 -bottom-6 cursor-pointer"
                style={{ animation: "nyayBob 4s ease-in-out infinite" }}
                onClick={() => setOpen(true)}
              >
                <img
                  src={nyayOwl.src}
                  alt="Nyay assistant"
                  className="h-[88px] w-[88px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-5 z-50 flex w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.4)]"
            style={{ height: "min(480px, calc(100vh - 48px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img src={nyayOwl.src} alt="" className="size-10 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.15)]" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-tight text-foreground">
                    Nyay
                  </p>
                  <p className="text-[10px] text-muted-foreground">Suraksha&apos;s Legal Guide</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                  >
                    {m.role === "model" && (
                      <img
                        src={nyayOwl.src}
                        alt=""
                        className="size-[26px] rounded-full object-cover shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                      />
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-foreground text-background"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <MessageText text={m.text ?? ""} />
                    </div>
                  </div>
                ))}

                {/* Quick action chips — only after welcome message */}
                {showQuickActions && !loading && (
                  <>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action}
                          onClick={() => send(action)}
                          className="rounded-full border border-border bg-background px-3.5 py-2 text-[12px] font-medium text-foreground transition-all duration-200 hover:border-foreground/25 hover:bg-muted active:scale-95"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground pt-1">
                      Choose an option or describe what happened.
                    </p>
                  </>
                )}

                {/* Typing indicator — only after user sends a message */}
                {loading && (
                  <div className="flex items-end gap-2">
                    <img
                      src={nyayOwl.src}
                      alt=""
                      className="size-[26px] rounded-full object-cover shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                    />
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border px-4 py-3 shrink-0">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 transition-colors focus-within:border-foreground/20">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Describe what happened..."
                  className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="rounded-lg bg-foreground p-2 text-background transition-all duration-200 hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100"
                  aria-label="Send"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
