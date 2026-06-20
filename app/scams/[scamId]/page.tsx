import Link from "next/link";
import { notFound } from "next/navigation";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, ChevronLeft, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

const SCAM_INFO: Record<string, {
  tag: string;
  howItWorks: string[];
  redFlags: string[];
  realCase: string;
  leafId: string;
}> = {
  digital_arrest: {
    tag: "Trending",
    howItWorks: [
      "You get a video call from someone in a uniform — police, CBI, ED, or Narcotics officer.",
      "They claim your Aadhaar, SIM, or bank account is linked to a crime — drug trafficking, money laundering, or a parcel with contraband.",
      "They say you are under 'digital arrest' and must stay on the call or face immediate physical arrest.",
      "They demand a 'security deposit' or 'fine' to clear your name — transferred to a private account.",
    ],
    redFlags: [
      "Real police never arrest you over a video call",
      "Government agencies never demand payment to a private UPI or bank account",
      "They pressure you not to hang up or tell anyone",
      "They may show fake ID cards, court orders, or notices on screen",
    ],
    realCase: "In May 2025, a retired school teacher in Mumbai lost ₹14 lakh after a 6-hour 'digital arrest' call from someone posing as a CBI officer. The caller showed a fake arrest warrant on screen and demanded a 'security deposit' to avoid physical arrest.",
    leafId: "digital_arrest",
  },
  telegram_investment: {
    tag: "Up 230%",
    howItWorks: [
      "You are added to a WhatsApp or Telegram group with 'expert' stock tips.",
      "Early tips seem accurate — the group builds your trust over days or weeks.",
      "You are invited to a 'private' trading platform showing huge fake profits.",
      "When you try to withdraw, you are asked to pay taxes, fees, or recharge to unlock funds.",
    ],
    redFlags: [
      "Unsolicited addition to investment groups",
      "Guaranteed returns or 'insider tips'",
      "Profits visible on screen but cannot be withdrawn",
      "Requests to pay fees before withdrawal",
    ],
    realCase: "A software engineer in Pune lost ₹8.5 lakh in 2025 after joining a Telegram group that showed consistent stock gains for 3 weeks before asking him to invest in their 'exclusive platform'.",
    leafId: "telegram_investment",
  },
  loan_app_harassment: {
    tag: "Hot",
    howItWorks: [
      "You download a lending app and take a small loan, giving it access to your contacts and gallery.",
      "The app charges hidden fees making repayment nearly impossible.",
      "When you miss a payment, they spam your entire contact list with abusive messages.",
      "They threaten to share morphed photos of you with your family unless you pay immediately.",
    ],
    redFlags: [
      "App asks for contacts and gallery access just to give a loan",
      "Interest rates not clearly disclosed upfront",
      "Repayment deadlines of 7 days or less",
      "Calls from multiple unknown numbers after missing payment",
    ],
    realCase: "A delivery worker in Delhi was contacted by 47 people in his contact list after a loan app sent messages claiming he was a 'fraudster'. He had borrowed ₹5,000 and already repaid ₹4,200.",
    leafId: "loan_app_harassment",
  },
  kyc_scam: {
    tag: "Watch",
    howItWorks: [
      "You get a call or message claiming your KYC has expired and your account will be blocked.",
      "The caller directs you to a fake bank website or asks you to share OTP over the phone.",
      "Once you share the OTP, they access your account and transfer funds.",
    ],
    redFlags: [
      "Banks never ask for OTP over phone or SMS",
      "Urgency — 'your account will be blocked in 2 hours'",
      "Links that look like bank websites but have slightly different URLs",
      "Caller asks you to install a remote access app",
    ],
    realCase: "A homemaker in Chennai lost ₹1.2 lakh after receiving a WhatsApp message saying her SBI KYC had expired. She clicked the link and entered her OTP, giving the scammer full access.",
    leafId: "kyc_scam",
  },
  qr_receive_scam: {
    tag: "Common",
    howItWorks: [
      "A buyer contacts you for something you listed for sale online.",
      "They say they will send payment via QR code — and share one for you to scan.",
      "Scanning the QR initiates a payment request from your account, not a credit.",
      "Money is deducted from your account instead of being deposited.",
    ],
    redFlags: [
      "You should never scan a QR code to receive money — only to pay",
      "Buyer insists on QR over bank transfer or UPI ID",
      "QR code sent via WhatsApp from an unknown number",
    ],
    realCase: "A college student in Bengaluru selling a laptop on OLX lost ₹18,000 after the 'buyer' asked her to scan a QR to receive the payment. She realised it was a debit request only after the money was gone.",
    leafId: "qr_receive_scam",
  },
  fake_parcel_threat: {
    tag: "New",
    howItWorks: [
      "You get a call from someone claiming to be customs, courier, or police.",
      "They say a parcel in your name contains drugs, counterfeit documents, or illegal items.",
      "They threaten arrest unless you pay a 'clearance fee' or 'security deposit' immediately.",
      "Some calls are followed by a fake video call with uniformed 'officers'.",
    ],
    redFlags: [
      "Real customs or courier companies never call demanding payment to release parcels",
      "Threats of immediate arrest over phone",
      "Requests to pay to a private UPI or account",
      "They ask you to keep the call confidential",
    ],
    realCase: "A homemaker in Mumbai received a call in March 2025 claiming a FedEx parcel with her name had drugs. After a fake 'CBI video call', she transferred ₹3.8 lakh across 3 transactions.",
    leafId: "fake_parcel_threat",
  },
  task_job_scam: {
    tag: "Job",
    howItWorks: [
      "You see an ad or get a WhatsApp message offering easy money for simple tasks — liking YouTube videos, rating hotels, or reviewing products.",
      "First few tasks pay small amounts to build trust.",
      "You are then asked to 'invest' a larger amount to unlock higher-paying tasks.",
      "Once you invest, the platform stops responding or demands more money to 'release' your earnings.",
    ],
    redFlags: [
      "Work from home with no skills required and high pay",
      "Payments only after you invest or recharge",
      "Telegram or WhatsApp groups as the only communication channel",
      "No verifiable company name, address, or registration",
    ],
    realCase: "A fresh graduate in Hyderabad lost ₹2.3 lakh in a task scam in 2025. She earned ₹800 in the first two days before being asked to invest ₹15,000 to 'level up' her account.",
    leafId: "task_job_scam",
  },
  sextortion_real: {
    tag: "Serious",
    howItWorks: [
      "A stranger connects on social media or a dating app and quickly moves to video call.",
      "During the call they record you in a compromising situation, sometimes using pre-recorded videos to manipulate you.",
      "They then threaten to send the recording to your contacts or post it online unless you pay.",
      "Paying does not stop the threats — they demand more each time.",
    ],
    redFlags: [
      "Someone you just met online pushes quickly to video call",
      "Attractive profile with very few posts or followers",
      "Screen recording notification during a call",
      "Immediate demand for money after the call",
    ],
    realCase: "A 28-year-old professional in Mumbai was blackmailed with a recorded video call in 2025. After paying ₹40,000, the demands continued. He eventually reported to cyber police who traced and arrested the accused.",
    leafId: "sextortion_real",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ scamId: string }> }): Promise<Metadata> {
  const { scamId } = await params;
  const info = SCAM_INFO[scamId];
  const leaf = TREE.leaves[scamId];
  return {
    title: `${leaf?.title ?? "Scam"} — Suraksha Radar`,
  };
}

export default async function ScamDetail({ params }: { params: Promise<{ scamId: string }> }) {
  const { scamId } = await params;
  const info = SCAM_INFO[scamId];
  const leaf = TREE.leaves[scamId];
  if (!info || !leaf) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Header */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <span className="eyebrow text-lime">● {info.tag} — Scam Radar</span>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-tight tracking-tight">
            {leaf.title}
          </h1>
          <p className="mt-3 text-base text-ink-foreground/80 max-w-xl">{leaf.explanation}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-10 space-y-8">
          {/* How it works */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">How this scam works</p>
            <ol className="space-y-3">
              {info.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-ink text-ink-foreground font-mono text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Red flags */}
          <div className="rounded-2xl border-2 border-red-600 bg-red-50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-red-700 mb-3">🚩 Red flags</p>
            <ul className="space-y-2">
              {info.redFlags.map((flag, i) => (
                <li key={i} className="flex gap-2 items-start text-sm text-red-800">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5 text-red-600" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          {/* Real case */}
          <div className="rounded-2xl border border-border bg-muted/40 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">📰 Real case</p>
            <p className="text-sm leading-relaxed text-foreground/80 italic">"{info.realCase}"</p>
          </div>

          {/* CTA */}
          <section className="bg-background">
            <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col items-center text-center gap-2">
              <p className="text-sm font-semibold text-foreground">Got caught in this?</p>
              <p className="text-sm text-muted-foreground">Get your personal action plan — what to do right now, who to call, and how to draft your complaint.</p>
              <Link
                href={`/help/leaf/${info.leafId}`}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(26,58,143,0.4)]"
                style={{ backgroundColor: "#1a3a8f" }}
              >
                Get my action plan →
              </Link>
            </div>
          </section>

          <Link href="/scams" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> Back to Scam Radar
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
