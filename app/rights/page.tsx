import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know Your Rights — Suraksha",
  description: "Laws that protect you — plain language, no jargon.",
};

const CYBER_CRIME_LAWS = [
  {
    section: "Section 66C",
    act: "IT Act",
    title: "Identity Theft",
    description: "Punishment for cheating by personating using computer resource",
    penalty: "Up to 3 years imprisonment and fine up to ₹1 lakh",
  },
  {
    section: "Section 66D",
    act: "IT Act",
    title: "Cheating by Impersonation",
    description: "Punishment for cheating by impersonating using computer resource",
    penalty: "Up to 3 years imprisonment and fine up to ₹1 lakh",
  },
  {
    section: "Section 66E",
    act: "IT Act",
    title: "Violation of Privacy",
    description: "Punishment for capturing, publishing or transmitting private images without consent",
    penalty: "Up to 3 years imprisonment and fine up to ₹2 lakh",
  },
  {
    section: "Section 67",
    act: "IT Act",
    title: "Publishing Obscene Material",
    description: "Punishment for publishing or transmitting obscene material in electronic form",
    penalty: "Up to 3 years imprisonment and fine up to ₹5 lakh",
  },
  {
    section: "Section 67A",
    act: "IT Act",
    title: "Publishing Sexually Explicit Material",
    description: "Punishment for publishing or transmitting sexually explicit material in electronic form",
    penalty: "Up to 5 years imprisonment and fine up to ₹10 lakh",
  },
];

const VICTIM_RIGHTS = [
  {
    section: "Section 154 CrPC / BNSS",
    act: "",
    title: "FIR Cannot Be Refused",
    description: "Any police station must register your FIR. Refusal is illegal and punishable.",
    right: "Mandatory FIR registration",
  },
  {
    section: "RBI Guidelines",
    act: "",
    title: "Zero Liability on Fraud",
    description: "Report within 3 days and your bank must cover 100% of unauthorised transactions",
    right: "100% bank coverage",
  },
  {
    section: "Section 156 CrPC",
    act: "",
    title: "Magistrate Can Order FIR",
    description: "If police refuse, approach a Magistrate who can order them to register it",
    right: "Legal remedy available",
  },
  {
    section: "IT Act Section 43",
    act: "",
    title: "Compensation for Data Theft",
    description: "You can claim compensation if your data was accessed without permission",
    right: "Compensation claimable",
  },
];

export default function RightsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="bg-lime">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <span className="eyebrow text-[#1a4a2e]">● Legal Framework</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight text-[#1a4a2e]">
            Know Your Rights
          </h1>
          <p className="mt-4 max-w-xl text-[#1a4a2e]/70">
            Laws that protect you — plain language, no jargon.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-12">
          <div
            className="relative rounded-xl px-9 pt-10 pb-10"
            style={{ backgroundColor: "#1a4a2e", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          >
            {/* Seal badge */}
            <div
              className="absolute top-5 right-5 flex h-14 w-14 items-center justify-center rounded-full text-center"
              style={{
                border: "2px solid #bef264",
                transform: "rotate(-8deg)",
              }}
            >
              <span
                className="font-bold uppercase leading-tight"
                style={{ color: "#bef264", fontSize: "8px" }}
              >
                Suraksha<br />verified
              </span>
            </div>

            {/* Document header */}
            <div
              className="mb-8 text-center"
              style={{ borderBottom: "2px solid rgba(255,255,255,0.2)", paddingBottom: "20px" }}
            >
              <p
                className="mb-1 text-xs font-bold uppercase tracking-widest"
                style={{ color: "#bef264" }}
              >
                Know your rights
              </p>
              <h2
                className="text-2xl font-bold"
                style={{ color: "#ffffff", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Statute of Citizen Protections
              </h2>
            </div>

            {/* Section I */}
            <p
              className="mb-4 text-sm font-bold"
              style={{
                color: "#bef264",
                fontFamily: "Georgia, 'Times New Roman', serif",
                borderBottom: "1px solid rgba(190,242,100,0.25)",
                paddingBottom: "8px",
              }}
            >
              I. Cyber crime laws
            </p>

            {CYBER_CRIME_LAWS.map((law) => {
              const sectionParts = law.section.replace("Section ", "").split(" ");
              const sectionNum = sectionParts[0] || law.section;
              return (
                <div
                  key={law.section}
                  className="flex items-start gap-5 py-5"
                  style={{ borderBottom: "1px dashed rgba(190,242,100,0.25)" }}
                >
                  <div className="shrink-0 text-center" style={{ minWidth: "56px" }}>
                    <div
                      className="font-bold"
                      style={{
                        color: "#bef264",
                        fontSize: "28px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        lineHeight: 1,
                      }}
                    >
                      {sectionNum}
                    </div>
                    <div
                      className="mt-1 uppercase"
                      style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", letterSpacing: "0.05em" }}
                    >
                      {law.act}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="uppercase"
                      style={{ color: "rgba(190,242,100,0.7)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em" }}
                    >
                      {law.title}
                    </p>
                    <p
                      className="mt-1 font-bold"
                      style={{
                        color: "#ffffff",
                        fontSize: "15px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {law.section}, {law.act}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {law.description}
                    </p>
                    <p
                      className="mt-2 font-bold"
                      style={{
                        color: "#bef264",
                        fontSize: "14px",
                        borderBottom: "1px solid #bef264",
                        paddingBottom: "1px",
                        display: "inline-block",
                      }}
                    >
                      {law.penalty}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Section II */}
            <p
              className="mb-4 mt-8 text-sm font-bold"
              style={{
                color: "#bef264",
                fontFamily: "Georgia, 'Times New Roman', serif",
                borderBottom: "1px solid rgba(190,242,100,0.25)",
                paddingBottom: "8px",
              }}
            >
              II. Your rights as a victim
            </p>

            {VICTIM_RIGHTS.map((right) => {
              const sectionParts = right.section.replace("Section ", "").split(" ");
              const sectionNum = sectionParts[0] || right.section;
              return (
                <div
                  key={right.section}
                  className="flex items-start gap-5 py-5"
                  style={{ borderBottom: "1px dashed rgba(190,242,100,0.25)" }}
                >
                  <div className="shrink-0 text-center" style={{ minWidth: "56px" }}>
                    <div
                      className="font-bold"
                      style={{
                        color: "#bef264",
                        fontSize: "28px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        lineHeight: 1,
                      }}
                    >
                      {sectionNum}
                    </div>
                    <div
                      className="mt-1 uppercase"
                      style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", letterSpacing: "0.05em" }}
                    >
                      {right.section.replace("Section ", "").replace(sectionNum, "").trim() || "CrPC"}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="uppercase"
                      style={{ color: "rgba(190,242,100,0.7)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em" }}
                    >
                      {right.title}
                    </p>
                    <p
                      className="mt-1 font-bold"
                      style={{
                        color: "#ffffff",
                        fontSize: "15px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {right.section}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {right.description}
                    </p>
                    <p
                      className="mt-2 font-bold"
                      style={{
                        color: "#bef264",
                        fontSize: "14px",
                        borderBottom: "1px solid #bef264",
                        paddingBottom: "1px",
                        display: "inline-block",
                      }}
                    >
                      {right.right}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col items-center text-center gap-2">
          <p className="text-sm font-semibold text-foreground">Need help using these rights?</p>
          <p className="text-sm text-muted-foreground">Get your personal action plan — free, instant.</p>
          <Link
            href="/help"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(26,58,143,0.4)]"
            style={{ backgroundColor: "#1a3a8f" }}
          >
            Get my action plan →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
