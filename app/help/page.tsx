"use client";

import Link from "next/link";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function HelpIndex() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return [];
    return Object.entries(TREE.leaves)
      .filter(([id, l]) =>
        id.includes(term) ||
        l.title.toLowerCase().includes(term) ||
        l.explanation.toLowerCase().includes(term)
      )
      .slice(0, 20);
  }, [q]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
          <span className="eyebrow text-primary">Triage</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            Hey. Tell us what's going on.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Pick the closest door. We'll narrow down to a specific plan — no jargon.
          </p>

          <label className="mt-7 flex items-center gap-3 rounded-2xl border-2 border-foreground bg-card px-4 py-3 shadow-[4px_4px_0_0_var(--foreground)] focus-within:-translate-y-0.5 transition-transform">
            <Search className="size-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: digital arrest, UPI, loan app, sextortion…"
              className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </label>

          {results.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
              {results.map(([id, l]) => (
                <Link
                  key={id}
                  href={`/help/leaf/${id}`}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-muted"
                >
                  <div>
                    <div className="font-semibold">{l.title}</div>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{l.explanation}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <span className="eyebrow text-muted-foreground">Pick a door</span>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TREE.doors.map((d, i) => {
              const accents = [
                { bg: "text-foreground", style: { backgroundColor: "#83E7FF" } },
                { bg: "bg-lime text-lime-foreground", style: {} },
                { bg: "bg-ink text-ink-foreground", style: {} },
                { bg: "bg-card text-foreground", style: {} },
              ];
              const { bg: cls, style } = accents[i % accents.length];
              return (
                <Link
                  key={d.id}
                  href={`/help/${d.id}`}
                  style={style}
                  className={`group block rounded-3xl border-2 border-foreground p-6 shadow-[5px_5px_0_0_var(--foreground)] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--foreground)] ${cls}`}
                >
                  <div className="text-3xl">{d.emoji}</div>
                  <div className="mt-3 font-display text-2xl font-extrabold leading-tight">{d.title}</div>
                  <p className="mt-2 text-sm opacity-85">{d.subtitle}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
