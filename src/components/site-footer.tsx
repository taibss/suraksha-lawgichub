import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-2xl font-bold">
              Suraksha<span className="size-2 rounded-full bg-primary" />
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Plain language, real action. We turn scam panic into a clear plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/help" className="hover:underline">Get help</Link>
            <Link href="/scams" className="hover:underline">Scam radar</Link>
            <Link href="/how-it-works" className="hover:underline">How it works</Link>
          </div>
        </div>
        <p className="eyebrow mt-8 text-muted-foreground">© Suraksha · Mumbai · For information, not legal advice.</p>
      </div>
    </footer>
  );
}
