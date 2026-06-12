import { createFileRoute, Link } from "@tanstack/react-router";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suraksha — Mumbai's Scam Defence" },
      { name: "description", content: "Scams are getting smarter — so are you. Plain language, real action. Spot it. Block it. Fix it." },
      { property: "og:title", content: "Suraksha — Mumbai's Scam Defence" },
      { property: "og:description", content: "Plain language, real action. Spot it. Block it. Fix it." },
    ],
  }),
  component: Home,
});

const TICKER = [
  "Senior dodges ₹14L",
  "UPI fraud rising",
  "4 arrested in task scam",
  "Fake SEBI WhatsApp groups busted",
  "Digital arrest calls up 230%",
  "Loan-app harassment crackdown",
];

const STEPS = [
  { n: "01", title: "Spot it", body: "Real scams turned into warnings you'll actually read." },
  { n: "02", title: "Block it", body: "Know the red flags — crook walks away empty." },
  { n: "03", title: "Fix it", body: "A Fellow and a verified advocate, one tap. 24×7." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Live ticker */}
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-5 py-2.5">
          <span className="eyebrow shrink-0 text-lime">● Live</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-track text-sm">
              {[...TICKER, ...TICKER].map((t, i) => (
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

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { n: "12k+", l: "citizens warned this week" },
            { n: "₹3.1Cr", l: "helped freeze in time" },
            { n: "100+", l: "verified advocates" },
          ].map((s) => (
            <div key={s.n} className="px-6 py-7">
              <div className="font-display text-3xl font-extrabold">{s.n}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Panic fast path */}
      <section className="bg-red-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400">🚨 Emergency — act now</p>
          <p className="mt-1.5 text-sm text-white/70">Skip the menus. Go straight to your action plan.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

      {/* Quick triage */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <span className="eyebrow text-primary">Quick — what happened?</span>
          <div className="mt-5 inline-block rounded-2xl bg-ink px-5 py-3 text-ink-foreground">
            hey. tell us what's going on 👀
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TREE.doors.map((d, i) => {
              const accent = ["border-t-danger", "border-t-primary", "border-t-lime", "border-t-foreground"][i % 4];
              return (
                <Link
                  key={d.id}
                  to="/help/$door"
                  params={{ door: d.id }}
                  className={`group rounded-2xl border border-border ${accent} border-t-4 bg-card p-5 transition-shadow hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-lg font-bold">{d.title}</div>
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

      {/* How it works (dark) */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <span className="eyebrow text-lime">How it works</span>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05]">
            Three moves.<br />One unbothered you.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">
                  {s.n}
                </div>
                <div>
                  <div className="font-display text-xl font-bold">{s.title}</div>
                  <p className="mt-1 text-sm text-ink-foreground/70">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scam of the week */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <span className="eyebrow text-primary">Scam of the week</span>
          <div className="mt-5 overflow-hidden rounded-2xl border-2 border-foreground shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="bg-primary p-6 text-primary-foreground">
              <div className="eyebrow text-primary-foreground/80">Week 14 · Mumbai</div>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight">
                The "Digital Arrest" call
              </h3>
            </div>
            <div className="space-y-4 bg-card p-6">
              {[
                'Fake cop video-calls — bans you from hanging up or telling family',
                'Demands money to a "safe account" to prove innocence',
                'No real agency ever arrests via video call. Ever.',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-block size-4 shrink-0 rounded-sm bg-danger" />
                  <p className="text-foreground/85">{t}</p>
                </div>
              ))}
              <Link
                to="/help/$door"
                params={{ door: "threats" }}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl border-2 border-foreground bg-background px-5 py-3 text-sm font-semibold shadow-[3px_3px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
              >
                ↗ Forward to family
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-lime text-lime-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight">
            Lost money or being threatened?
          </h2>
          <p className="mt-3 text-lg">A guided plan in under 60 seconds.</p>
          <Link
            to="/help"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-foreground px-7 py-4 text-base font-semibold text-background shadow-[5px_5px_0_0_var(--primary)] transition-transform hover:-translate-y-0.5"
          >
            Start the triage <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}