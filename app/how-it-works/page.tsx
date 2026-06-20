import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works — Suraksha",
  description: "Three moves. One unbothered you. Spot it. Block it. Fix it.",
  openGraph: {
    title: "How it works — Suraksha",
    description: "Spot it. Block it. Fix it.",
  },
};

const STEPS = [
  { n: "01", title: "Spot it", body: "Real scams turned into warnings you'll actually read. We translate every FIR into a one-line red flag." },
  { n: "02", title: "Block it", body: "Know the red flags before the crook calls. A 60-second checklist for every common scam pattern." },
  { n: "03", title: "Fix it", body: "A Fellow walks you through the report. A verified advocate is one tap away. 24×7." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <span className="eyebrow text-lime">How it works</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Three moves.<br />One unbothered you.
          </h1>
        </div>
      </section>
      <section className="bg-lime">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="grid grid-cols-1 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#1a4a2e] font-mono text-sm font-bold text-lime">
                  {s.n}
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#1a4a2e]">{s.title}</div>
                  <p className="mt-1 text-[#1a4a2e]/75">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/help"
            className="mt-10 inline-flex items-center rounded-full border-2 border-[#1a4a2e] bg-[#1a4a2e] px-6 py-3 text-base font-semibold text-lime shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5"
          >
            Start the triage →
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
