import { createFileRoute, Link } from "@tanstack/react-router";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suraksha — Mumbai's Scam Defence" },
      { name: "description", content: "Scams are getting smarter — so are you. Plain language, real action." },
    ],
  }),
  component: Home,
});

const PULSE = [
  "Senior dodges ₹14L digital arrest call",
  "Fake SEBI WhatsApp groups busted — don't invest",
  "UPI collect fraud rising in Mumbai",
  "4 arrested in fake task job scam",
  "Loan app harassment crackdown underway",
];

function Home() {
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
        <div className="mx-auto max-w-6xl px-5 py-4 md:py10">
          <span className="inline-flex items-center rounded-full bg-lime px-4 py-1.5 text-xs font-bold tracking-widest text-lime-foreground">
            MUMBAI'S SCAM DEFENCE
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight">
            The system<br />feels old.<br />
            <span className="inline-block bg-lime px-3 py-1 text-lime-foreground">We don't.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/85">
            Scams are getting smarter — so are you. Plain language, real action.
          </p>
          <div className="mt-6 flex max-w-md flex-col gap-3">
            <Link
              to="/help"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[5px_5px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--foreground)]"
            >
              Show me the scams
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/help"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground/40 bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              I've been scammed
            </Link>
          </div>
        </div>
      </section>


      {/* Panic fast path */}
      <section className="bg-red-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400">🚨 Emergency — act now</p>
          <p className="mt-1.5 text-sm text-white/70">Skip the menus. Go straight to your action plan.</p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/help/leaf/$leafId"
              params={{ leafId: "upi_paid_blocked" }}
              className="flex items-center justify-between gap-3 rounded-2xl border-2 border-red-500 bg-red-600 px-6 py-5 font-bold text-white shadow-[4px_4px_0_0_#7f1d1d] transition-transform hover:-translate-y-0.5"
            >
              <span className="text-base leading-tight">💸 Money just left my account</span>
              <ArrowRight className="size-5 shrink-0" />
            </Link>
            <Link
              to="/help/leaf/$leafId"
              params={{ leafId: "known_person_threat" }}
              className="flex items-center justify-between gap-3 rounded-2xl border-2 border-red-500 bg-red-600 px-6 py-5 font-bold text-white shadow-[4px_4px_0_0_#7f1d1d] transition-transform hover:-translate-y-0.5"
            >
              <span className="text-base leading-tight">⚠️ Someone is threatening me right now</span>
              <ArrowRight className="size-5 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Four doors */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-sm text-muted-foreground">What happened?</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TREE.doors.map((d, i) => {
              const accents = ["border-t-danger", "border-t-primary", "border-t-lime", "border-t-foreground"];
              return (
                <Link
                  key={d.id}
                  to="/help/$door"
                  params={{ door: d.id }}
                  className={`group rounded-2xl border border-border ${accents[i % 4]} border-t-4 bg-card p-5 transition-shadow hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xl">{d.emoji}</div>
                      <div className="mt-2 font-display text-lg font-bold">{d.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
                    </div>
                    <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI entry */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm text-ink-foreground/60">Can't find it?</p>
          <p className="mt-1 font-display text-2xl font-extrabold">Talk to me.</p>
          <p className="mt-2 text-sm text-ink-foreground/70">Tell me what happened and I'll take it from here.</p>
          <button className="mt-5 rounded-full bg-lime px-6 py-3 text-sm font-bold text-lime-foreground">
            Ask Suraksha
          </button>
        </div>
      </section>

      {/* Advocate access */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)]">
            <p className="font-display text-xl font-bold">Talk to an advocate</p>
            <p className="mt-1 text-sm text-muted-foreground">Verified advocates. No upfront payment. One tap away.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>✓ No upfront payment</span>
              <span>✓ Verified advocates only</span>
              <span>✓ We will never ask for OTP</span>
            </div>
            <button className="mt-5 rounded-full border-2 border-foreground bg-foreground px-6 py-3 text-sm font-bold text-background">
              Talk to an advocate
            </button>
          </div>
        </div>
      </section>

      {/* Check before you trust */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm font-bold">Check before you trust</p>
          <p className="mt-1 text-sm text-muted-foreground">Has this number, UPI ID, or link been reported?</p>
          <div className="mt-4 flex gap-2">
            <input
              placeholder="Phone number, UPI ID, or website"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
            <button className="rounded-xl border-2 border-foreground bg-foreground px-5 py-3 text-sm font-bold text-background">
              Check
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">v1 — community reported data</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}