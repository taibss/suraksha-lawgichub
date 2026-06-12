import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <img src="/src/assets/lawgichub-logo.jpeg" alt="LawgicHub" className="h-14 w-auto object-contain" />
          <span className="flex items-center gap-1.5">
            Suraksha
            <span className="size-2 rounded-full bg-primary" aria-hidden />
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/scams" className="text-sm font-medium text-foreground/80 hover:text-foreground">Scam radar</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground">How it works</Link>
          <Link
            to="/help"
            className="rounded-full border-2 border-red-700 bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-[3px_3px_0_0_#7f1d1d] transition-transform hover:-translate-y-0.5 hover:bg-red-700"
          >
            Get help
          </Link>
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 md:hidden"
        >
          <Menu className="size-6" />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            <Link to="/help" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Get help</Link>
            <Link to="/scams" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Scam radar</Link>
            <Link to="/how-it-works" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">How it works</Link>
          </div>
        </div>
      )}
    </header>
  );
}