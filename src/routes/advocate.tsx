import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/advocate")({
  validateSearch: (search: Record<string, unknown>) => ({
    issue: (search.issue as string) || "",
    leafId: (search.leafId as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Talk to a Verified Advocate — Suraksha" },
      {
        name: "description",
        content: "Free first consultation. No upfront payment. Powered by LawgicHub.",
      },
    ],
  }),
  component: AdvocatePage,
});

const ISSUE_TYPES = [
  "UPI/Money Fraud",
  "Sextortion/Blackmail",
  "Digital Arrest",
  "Loan App Harassment",
  "Police/FIR Issue",
  "Threats",
  "Other",
];

const CALLBACK_TIMES = ["Within 2 hours", "Today evening", "Tomorrow morning", "Anytime"];

const TRUST_INDICATORS = [
  { label: "No upfront payment" },
  { label: "Verified advocates only" },
  { label: "We will never ask for OTP" },
  { label: "We will never ask for payment to a personal number" },
];

function AdvocatePage() {
  const { issue: initialIssue } = Route.useSearch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issueType, setIssueType] = useState(initialIssue || "");
  const [description, setDescription] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function isFormValid() {
    return name.trim() && phone.trim() && issueType && description.trim() && callbackTime;
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Header section */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime">
            Powered by LawgicHub
          </span>
          <h1 className="mt-4 font-display text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold leading-[1.02] tracking-tight">
            Talk to a<br />Verified Advocate
          </h1>
          <p className="mt-3 max-w-xl text-base text-ink-foreground/70">
            Free first consultation. No upfront payment. Connect with a verified legal professional across India.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {TRUST_INDICATORS.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2.5 text-sm text-ink-foreground/85">
                <span className="flex size-5 items-center justify-center rounded-full bg-lime/15">
                  <CheckCircle className="size-3.5 text-lime" />
                </span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-5 py-12">
          <button
            onClick={() => history.back()}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
          >
            <ChevronLeft className="size-4" /> Back
          </button>
          {!submitted ? (
            /* Form card */
            <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[5px_5px_0_0_var(--foreground)]">
              <h2 className="font-display text-xl font-bold">Connect with an advocate</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details and a verified lawyer will call you back.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground/70">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground/70">Phone number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground/70">Issue type</label>
                  {initialIssue ? (
                    <div className="mt-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground">
                      {initialIssue}
                    </div>
                  ) : (
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                      required
                    >
                      <option value="" disabled>
                        Select your issue type
                      </option>
                      {ISSUE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground/70">
                    Brief description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what happened in a few words"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground/70">
                    Preferred callback time
                  </label>
                  <select
                    value={callbackTime}
                    onChange={(e) => setCallbackTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                    required
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {CALLBACK_TIMES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className="mt-2 w-full rounded-full border-2 border-foreground bg-foreground px-5 py-3 text-sm font-bold text-background shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Request Callback
                </button>
              </form>
            </div>
          ) : (
            /* Success state */
            <div className="rounded-2xl border-2 border-foreground bg-card p-8 shadow-[5px_5px_0_0_var(--foreground)] text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-lime">
                <CheckCircle className="size-8 text-lime-foreground" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-extrabold">Request received!</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A verified LawgicHub advocate will call you at <strong>{phone}</strong> within your
                preferred time.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">While you wait —</p>
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-[3px_3px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
                >
                  Generate your complaint
                </Link>
                <a
                  href="/#rights"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--border)] transition-transform hover:-translate-y-0.5"
                >
                  View your rights
                </a>
              </div>
            </div>
          )}

          {/* What happens next */}
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-center">What happens next</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] text-center">
                <div className="mx-auto grid size-10 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">
                  01
                </div>
                <h3 className="mt-3 font-display text-base font-bold">
                  Advocate reviews your case
                </h3>
              </div>
              <div className="rounded-2xl border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] text-center">
                <div className="mx-auto grid size-10 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">
                  02
                </div>
                <h3 className="mt-3 font-display text-base font-bold">
                  Calls you at your preferred time
                </h3>
              </div>
              <div className="rounded-2xl border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] text-center">
                <div className="mx-auto grid size-10 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-lime-foreground">
                  03
                </div>
                <h3 className="mt-3 font-display text-base font-bold">Takes your case forward</h3>
              </div>
            </div>
          </div>

          {/* Powered by */}
          <p className="mt-12 text-center text-xs text-muted-foreground">
            Powered by LawgicHub — verified legal professionals across India
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
