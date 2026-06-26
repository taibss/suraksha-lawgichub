"use client";

import Link from "next/link";
import { Menu, X, Banknote, ShieldAlert, Building2, Users } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/lawgichub-logo.png";

const DOORS = [
  { id: "money", icon: <Banknote className="size-4" />, label: "I lost money" },
  { id: "threats", icon: <ShieldAlert className="size-4" />, label: "Someone is threatening me" },
  { id: "process", icon: <Building2 className="size-4" />, label: "Police / Bank problem" },
  { id: "other", icon: <Users className="size-4" />, label: "Work, Home, Family" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex flex-col text-xl font-bold tracking-tight">
          <div className="flex items-center gap-3">
            <img src={logo.src} alt="Suraksha" className="h-16 w-auto object-contain" />
            <span className="flex items-center gap-1.5">
              Suraksha
              <span className="size-2 rounded-full bg-primary" aria-hidden />
            </span>
          </div>
          <span className="text-xs font-medium text-primary ml-[76px] -mt-1">Powered by LawgicHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/scams" className="text-sm font-semibold transition-colors hover:text-primary">
            Scam radar
          </Link>
          <Link href="/how-it-works" className="text-sm font-semibold transition-colors hover:text-primary">
            How it works
          </Link>
          <Link href="/blog" className="text-sm font-semibold transition-colors hover:text-primary">
            Blog
          </Link>
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
                      href={`/help/${d.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted border-b border-border last:border-0"
                    >
                      <span className="text-primary">{d.icon}</span>
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
                      href={`/help/${d.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted border-b border-border last:border-0"
                    >
                      <span className="text-primary">{d.icon}</span>
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
            <Link href="/scams" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              Scam radar
            </Link>
            <Link href="/how-it-works" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              How it works
            </Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
