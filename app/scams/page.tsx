import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scam Radar — Suraksha",
  description: "What's circulating right now in India. Red flags and what to do.",
  openGraph: {
    title: "Scam Radar — Suraksha",
    description: "What's circulating in India right now.",
  },
};

const RADAR = [
  { tag: "Trending", title: 'The "Digital Arrest" call', body: "Fake cop video call, bans you from hanging up.", leaf: "digital_arrest" },
  { tag: "Up 230%", title: "Telegram investment groups", body: "Stock tips, fake profits, recharge to withdraw.", leaf: "telegram_investment" },
  { tag: "Hot", title: "Loan-app harassment", body: "Morphed photos, contact spam, shame threats.", leaf: "loan_app_harassment" },
  { tag: "Watch", title: "WhatsApp KYC scam", body: "Bank impostor asks for OTP under threat of block.", leaf: "kyc_scam" },
  { tag: "Common", title: "QR receive-money scam", body: "You scan to 'receive' — money goes the other way.", leaf: "qr_receive_scam" },
  { tag: "New", title: "Courier / customs parcel", body: "Suspicious parcel, drugs found, pay to clear.", leaf: "fake_parcel_threat" },
  { tag: "Job", title: "Task / like-and-review job", body: "Small payouts, then 'recharge' to keep going.", leaf: "task_job_scam" },
  { tag: "Serious", title: "Sextortion", body: "Recorded video call, threats to leak.", leaf: "sextortion_real" },
];

export default function Scams() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <span className="eyebrow text-lime">● Scam radar</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            What's circulating<br />right now.
          </h1>
          <p className="mt-4 max-w-xl text-ink-foreground/80">
            Updated weekly from FIRs, RBI bulletins, and reader reports.
          </p>
        </div>
      </section>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RADAR.map((r) => (
              <Link
                key={r.title}
                href={`/scams/${r.leaf}`}
                className="group block rounded-2xl border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
              >
                <span className="eyebrow text-primary">{r.tag}</span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  See how it works <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
