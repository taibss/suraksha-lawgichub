import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/lawgichub-logo.jpeg";

const DOORS = [
  { id: "money", emoji: "💸", label: "I lost money" },
  { id: "threats", emoji: "⚠️", label: "Someone is threatening me" },
  { id: "process", emoji: "🏛", label: "Police / Bank problem" },
  { id: "other", emoji: "🏠", label: "Work, Home, Family" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <img src={logo} alt="LawgicHub" className="h-14 w-auto object-contain" />
          <span className="flex items-center gap-1.5">
            Suraksha
            <span className="size-2 rounded-full bg-primary" aria-hidden />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="rounded-full border-2 border-red-700 bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-[3px_3px_0_0_#7f1d1d] transition-transform hover:-translate-y-0.5 hover:bg-red-700"
            >
              Get help
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 top-12 z-20 w-64 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  {DOORS.map((d) => (
                    <Link
                      key={d.id}
                      to="/help/$door"
                      params={{ door: d.id }}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted border-b border-border last:border-0"
                    >
                      <span>{d.emoji}</span>
                      {d.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile: Get help button + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="rounded-full border-2 border-red-700 bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0_0_#7f1d1d]"
            >
              Get help
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 top-10 z-20 w-64 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  {DOORS.map((d) => (
                    <Link
                      key={d.id}
                      to="/help/$door"
                      params={{ door: d.id }}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted border-b border-border last:border-0"
                    >
                      <span>{d.emoji}</span>
                      {d.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            <Link to="/scams" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              Scam radar
            </Link>
            <Link to="/how-it-works" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              How it works
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}