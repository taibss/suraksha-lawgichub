import Link from "next/link";
import { Shield, Scale } from "lucide-react";
import { FadeUp } from "./fade-up";
import logo from "@/assets/lawgichub-logo.png";

const EXPLORE = [
  { label: "Scam radar", href: "/scams" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Your rights", href: "/rights" },
];

const GET_HELP = [
  { label: "I lost money", href: "/help/money" },
  { label: "Someone threatening me", href: "/help/threats" },
  { label: "Police / Bank problem", href: "/help/process" },
];

const ABOUT_US = [
  { label: "lawgichub.com", href: "https://lawgichub.com" },
  { label: "Blog", href: "/blog" },
];

const LEGAL = [
  { label: "Talk to advocate", href: "/advocate" },
  { label: "Know your rights", href: "/rights" },
  { label: "Cyber crime laws", href: "/help/leaf/cyber_report_needed" },
];

export function SiteFooter({ showStatement = false }: { showStatement?: boolean }) {
  return (
    <footer>
      <FadeUp delay={0}>
        {/* Lime statement section — homepage only */}
        {showStatement && (
          <div className="bg-[#bef264] px-8 py-10">
            <div className="mx-auto max-w-6xl flex flex-col gap-8 md:flex-row md:items-center">
              <div className="md:w-3/5">
                <h4
                  className="font-black uppercase leading-[0.9] tracking-tighter"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#0a1228" }}
                >
                  SURAKSHA HAS GOT YOUR BACK.
                </h4>
              </div>
              <div className="flex flex-col gap-3 md:w-2/5">
                <p className="text-sm font-semibold" style={{ color: "#0a1228" }}>
                  Got scammed?
                </p>
                <Link
                  href="/help"
                  className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "#0a1228", color: "#bef264" }}
                >
                  Get help now →
                </Link>
                <p className="text-xs" style={{ color: "#0a1228", opacity: 0.5 }}>
                  Free · No login · Instant
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer links section */}
        <div style={{ backgroundColor: "#0a1228" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
            {/* Mobile: Logo + tagline first */}
            <div className="mb-8 md:mb-0 md:max-w-xs">
              <Link href="/" className="flex items-center gap-1.5 text-2xl font-bold text-white">
                <img src={logo.src} alt="Suraksha" className="h-14 w-auto object-contain md:h-20" />
                Suraksha
                <span className="size-2 rounded-full bg-[#bef264]" />
              </Link>
              <p className="mt-2 text-sm text-white/50">
                Plain language, real action. We turn scam panic into a clear plan.
              </p>
            </div>

            {/* Desktop: flex-row layout */}
            <div className="hidden md:flex md:justify-between">
              <div className="max-w-xs" />
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">Explore</h3>
                <ul className="flex flex-col gap-2">
                  {EXPLORE.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[#bef264]">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">Get Help</h3>
                <ul className="flex flex-col gap-2">
                  {GET_HELP.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[#bef264]">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">Legal</h3>
                <ul className="flex flex-col gap-2">
                  {LEGAL.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[#bef264]">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">About Us</h3>
                <ul className="flex flex-col gap-2">
                  {ABOUT_US.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[#bef264]">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile: Two-column grid for Explore + Get Help */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:hidden">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">
                  Explore
                </h3>
                <ul className="flex flex-col">
                  {EXPLORE.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm text-white/70 transition-colors hover:text-[#bef264]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">
                  Get Help
                </h3>
                <ul className="flex flex-col">
                  {GET_HELP.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm text-white/70 transition-colors hover:text-[#bef264]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile: Legal + About Us — two-column grid below Explore & Get Help */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-8 md:hidden">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">
                  Legal
                </h3>
                <ul className="flex flex-col">
                  {LEGAL.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm text-white/70 transition-colors hover:text-[#bef264]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#bef264]">
                  About Us
                </h3>
                <ul className="flex flex-col">
                  {ABOUT_US.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm text-white/70 transition-colors hover:text-[#bef264]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-5 text-center md:px-8 md:py-6">
              <p className="text-xs text-white/40">
                &copy; Suraksha &middot; Mumbai &middot; For information, not legal advice.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-white/40 md:gap-2">
                <Scale className="size-3 text-[#bef264]" />
                <span>Built with verified advocates</span>
                <span className="hidden sm:inline">&middot;</span>
                <Shield className="size-3 text-[#bef264]" />
                <span>Backed by LawgicHub</span>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}
