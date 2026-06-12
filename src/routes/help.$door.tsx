import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { TREE, type TreeOption } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, ChevronLeft, Home as HomeIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { z } from "zod";

const searchSchema = z.object({
  path: z.array(z.string()).optional(),
});

export const Route = createFileRoute("/help/$door")({
  validateSearch: searchSchema,
  head: ({ params }) => {
    const d = TREE.doors.find((x) => x.id === params.door);
    return {
      meta: [
        { title: `${d?.title ?? "Help"} — Suraksha` },
        { name: "description", content: d?.subtitle ?? "Suraksha triage" },
      ],
    };
  },
  component: DoorView,
});

function DoorView() {
  const { door } = Route.useParams();
  const { path = [] } = Route.useSearch();
  const navigate = useNavigate();

  const doorData = useMemo(() => TREE.doors.find((d) => d.id === door), [door]);
  if (!doorData) throw notFound();

  // Walk the path
  let node: { question?: string; options: TreeOption[]; title?: string } = doorData;
  const crumbs: string[] = [doorData.title];
  for (const idxStr of path) {
    const idx = Number(idxStr);
    const next = node.options?.[idx];
    if (!next) break;
    crumbs.push(next.label);
    if (next.leaf) {
      // Redirect to leaf
      return <LeafRedirect leafId={next.leaf} />;
    }
    node = next as TreeOption & { options: TreeOption[] };
  }

  function choose(i: number) {
    const newPath = [...path, String(i)];
    const chosen = node.options?.[i];
    if (chosen?.leaf) {
      navigate({ to: "/help/leaf/$leafId", params: { leafId: chosen.leaf } });
    } else {
      navigate({ to: "/help/$door", params: { door }, search: { path: newPath } });
    }
  }

  function back() {
    if (path.length === 0) {
      navigate({ to: "/help" });
    } else {
      navigate({ to: "/help/$door", params: { door }, search: { path: path.slice(0, -1) } });
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-5">
            <div className="text-3xl">{doorData.emoji}</div>
            <h1 className="mt-2 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold leading-[1.05] tracking-tight">
              {node.question ?? doorData.question}
            </h1>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3">
            {node.options.map((o, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-foreground bg-card p-5 text-left shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)]"
              >
                <div>
                  <div className="font-display text-lg font-bold">{o.label}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {o.leaf ? "Open the action plan" : "Go deeper"}
                  </p>
                </div>
                <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={back}
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

function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="eyebrow flex flex-wrap items-center gap-1.5 text-muted-foreground">
      <Link to="/help" className="hover:text-foreground">Triage</Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span>›</span>
          <span className={i === crumbs.length - 1 ? "text-foreground" : ""}>{c}</span>
        </span>
      ))}
    </div>
  );
}

function LeafRedirect({ leafId }: { leafId: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/help/leaf/$leafId", params: { leafId }, replace: true });
  }, [leafId, navigate]);
  return null;
}
