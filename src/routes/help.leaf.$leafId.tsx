import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChevronLeft, Home as HomeIcon, AlertTriangle, Shield, FileText, Scale } from "lucide-react";

export const Route = createFileRoute("/help/leaf/$leafId")({
  head: ({ params }) => {
    const leaf = TREE.leaves[params.leafId];
    return {
      meta: [
        { title: `${leaf?.title ?? "Action plan"} — Suraksha` },
        { name: "description", content: leaf?.explanation ?? "Suraksha action plan" },
      ],
    };
  },
  component: LeafPage,
});

function LeafPage() {
  const { leafId } = Route.useParams();
  const leaf = TREE.leaves[leafId];
  if (!leaf) throw notFound();

  const urgent = /high|urgent/i.test(leaf.urgency);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Header band */}
      <section className={urgent ? "bg-danger text-primary-foreground" : "bg-primary text-primary-foreground"}>
        <div className="mx-auto max-w-4xl px-5 py-10">
          <div className="eyebrow opacity-80">Action plan</div>
          <h1 className="mt-2 font-display text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
            {leaf.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-foreground/15 px-3 py-1">Urgency: {leaf.urgency}</span>
            <span className="rounded-full bg-foreground/15 px-3 py-1">#{leafId}</span>
            {leaf.lawyer && <span className="rounded-full bg-foreground/15 px-3 py-1">Lawyer: {leaf.lawyer}</span>}
          </div>
        </div>
      </section>

      {/* What happened */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-5 py-10">
          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[5px_5px_0_0_var(--foreground)]">
            <div className="eyebrow text-primary">What likely happened</div>
            <p className="mt-2 text-lg text-foreground/90">{leaf.explanation}</p>
          </div>

          {/* Action grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <PlanCard
              icon={<AlertTriangle className="size-5" />}
              eyebrow="Do this now"
              tint="lime"
            >
              <ol className="space-y-2.5 text-sm">
                {leaf.actions.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-lime font-mono text-xs font-bold text-lime-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </PlanCard>

            <PlanCard icon={<Shield className="size-5" />} eyebrow="Evidence checklist" tint="ink">
              <ul className="space-y-2 text-sm">
                {leaf.evidence.map((e, i) => (
                  <li key={i}>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="checkbox" className="size-4 accent-primary" /> {e}
                    </label>
                  </li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard icon={<Scale className="size-5" />} eyebrow="Authorities & routes" tint="primary">
              <ul className="space-y-2 text-sm">
                {leaf.authorities.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">→</span> {a}
                  </li>
                ))}
              </ul>
            </PlanCard>

            <PlanCard icon={<FileText className="size-5" />} eyebrow="Drafts we can prep" tint="card">
              <ul className="space-y-2 text-sm">
                {leaf.drafts.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">✎</span> {d}
                  </li>
                ))}
              </ul>
              {leaf.lawyer && (
                <p className="mt-4 text-sm text-muted-foreground">
                  <b className="text-foreground">Lawyer:</b> {leaf.lawyer}
                </p>
              )}
            </PlanCard>
          </div>

          {/* AI follow-up */}
          <div className="mt-6 rounded-2xl border border-border bg-ink p-6 text-ink-foreground">
            <div className="eyebrow text-lime">Ask a follow-up</div>
            <p className="mt-2 text-sm text-ink-foreground/80">
              Stuck on a step? Ask for help drafting your cyber complaint, FIR, or what to say next.
            </p>
            <textarea
              placeholder="e.g. What should I write in my cyber complaint?"
              className="mt-4 min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-ink-foreground placeholder:text-ink-foreground/40 focus:border-lime focus:outline-none"
            />
            <button className="mt-3 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-lime-foreground">
              Get drafting help
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => history.back()}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
            <Link
              to="/help"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <HomeIcon className="size-4" /> Start over
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PlanCard({
  children,
  eyebrow,
  icon,
  tint,
}: {
  children: React.ReactNode;
  eyebrow: string;
  icon: React.ReactNode;
  tint: "lime" | "ink" | "primary" | "card";
}) {
  const tints = {
    lime: "bg-card border-foreground",
    ink: "bg-card border-foreground",
    primary: "bg-card border-foreground",
    card: "bg-card border-foreground",
  } as const;
  return (
    <div className={`rounded-2xl border-2 ${tints[tint]} p-5 shadow-[4px_4px_0_0_var(--foreground)]`}>
      <div className="flex items-center gap-2 text-foreground/70">
        {icon}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
