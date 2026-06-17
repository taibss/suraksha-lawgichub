"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChevronLeft, Home as HomeIcon, AlertTriangle, Shield, FileText, Scale, Phone, Upload, Copy, Check, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { draftFn, parseFn } from "./api/draft"

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

function portalUrl(leafId: string): string {
  if (/upi|qr|otp|crypto|investment|job|task|sextortion|blackmail|digital_arrest|fake_parcel|threat/.test(leafId)) {
    return "https://cybercrime.gov.in";
  }
  if (/bank|loan_app/.test(leafId)) {
    return "https://sachet.rbi.org.in";
  }
  if (/consumer|shopping|courier/.test(leafId)) {
    return "https://consumerhelpline.gov.in";
  }
  if (/fir|police/.test(leafId)) {
    return "https://www.mha.gov.in";
  }
  return "https://cybercrime.gov.in";
}

function extractPhone(text: string): string | null {
  const match = text.match(/\b(1930|112|100|1091|1098|181|1800\d*)\b/);
  return match ? match[1] : null;
}

function ActionItem({ text, index, badge }: { text: string; index: number; badge: "lime" | "red" }) {
  const phone = extractPhone(text);

  if (phone) {
    return (
      <li className="flex items-center gap-3">
        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-red-600 font-mono text-xs font-bold text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-red-600 bg-red-50 px-2.5 py-1 text-sm font-bold text-red-700 shadow-[2px_2px_0_0_#b91c1c] transition-transform hover:-translate-y-0.5"
        >
          {text}
          <Phone className="size-3.5 shrink-0 text-red-600" />
        </a>
      </li>
    );
  }

  return (
    <li className="flex gap-3 items-start">
      <span className={`grid size-6 shrink-0 place-items-center rounded-md font-mono text-xs font-bold ${badge === "lime" ? "bg-lime text-lime-foreground" : "text-primary"}`}>
        {badge === "lime" ? String(index + 1).padStart(2, "0") : "→"}
      </span>
      <span className="text-sm pt-0.5">{text}</span>
    </li>
  );
}

function EvidenceChecklist({ items, onFilesChange }: { items: string[]; onFilesChange?: (count: number) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []).map(f => f.name);
    const updated = [...files, ...selected];
    setFiles(updated);
    onFilesChange?.(updated.length);
  }

  return (
    <div>
      <ul className="space-y-2 text-sm">
        {items.map((e, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" className="size-4 accent-primary" /> {e}
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-border pt-4">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFiles}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors w-full justify-center"
        >
          <Upload className="size-4" /> Upload screenshots or proof
        </button>
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary">✓</span> {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const COMPLAINT_CONTEXTS: Record<string, string> = {
  upi_paid_blocked: "UPI fraud — paid and got blocked",
  qr_receive_scam: "QR code fraud — scanned to receive but money was deducted",
  otp_pin_scam: "OTP/PIN fraud — shared credentials and lost money",
  remote_access_scam: "Remote access fraud — installed app and lost money",
  fake_customer_care: "Fake customer care fraud",
  unauthorised_transaction: "Unauthorised bank transaction",
  telegram_investment: "Fake investment fraud via Telegram/WhatsApp",
  crypto_scam: "Cryptocurrency investment fraud",
  fake_regulated_investment: "Fake SEBI/RBI regulated investment fraud",
  task_investment: "Fake task investment recharge scam",
  job_fee_scam: "Fake job registration/training fee scam",
  task_job_scam: "Fake task/work from home job scam",
  visa_job_scam: "Overseas job/visa scam",
  equipment_deposit_job: "Fake equipment/security deposit job scam",
  loan_app_harassment: "Loan app harassment and threats",
  loan_app_contacts: "Loan app contacting family/contacts",
  loan_app_morphed: "Loan app morphed image extortion",
  fake_loan_extortion: "Fake loan demand without borrowing",
  kyc_scam: "Fake KYC/account block scam",
  credit_card_reward: "Credit card reward/limit scam",
  sim_trai_scam: "TRAI/SIM misuse threat scam",
  account_lien: "Bank account frozen / cyber lien",
  atm_misuse: "ATM/debit card misuse",
  instagram_shop: "Instagram/social shopping scam",
  marketplace_scam: "OLX/Facebook Marketplace scam",
  courier_customs: "Courier/customs parcel scam",
  ecommerce_refund: "E-commerce refund/replacement fraud",
  matrimonial_scam: "Matrimonial profile money scam",
  romance_scam: "Romance/dating app money scam",
  honey_trap: "Honey trap scam",
  sextortion_real: "Sextortion with real intimate content",
  sextortion_morphed: "Sextortion with morphed/fake photos",
  sextortion_contact_threat: "Sextortion — threat to send content to contacts",
  sextortion_shared: "Private/morphed content already shared online",
  private_info_blackmail: "Private information blackmail",
  business_extortion: "Business/reputation extortion",
  false_case_threat: "False case / false allegation threat",
  repeat_extortion: "Repeated extortion demands",
  digital_arrest: "Fake digital arrest call",
  fake_parcel_threat: "Fake parcel/customs threat call",
  identity_misuse_threat: "Aadhaar/SIM/bank identity misuse threat",
  fake_police_payment: "Fake police fine/security deposit demand",
  whatsapp_harassment: "Phone/WhatsApp harassment",
  social_harassment: "Social media harassment/impersonation",
  offline_stalking: "Offline stalking/following",
  known_person_threat: "Threats from known person",
  cyber_report_needed: "Need to report online fraud",
  "1930_issue": "1930 not reachable / not answered",
  portal_delay: "Cyber portal complaint delay",
  bank_needs_cyber: "Bank asking for cyber complaint",
  fir_refused: "Police refused to file FIR",
  civil_matter_pushback: "Police says it is civil matter",
  threat_police_inaction: "Threat case but police not acting",
  bank_reversal: "Bank freeze/reversal request after fraud",
  bank_rejected: "Bank rejected fraud complaint",
  consumer_refund: "E-commerce/seller refund problem",
  telecom_issue: "Telecom/SIM complaint issue",
  travel_booking_scam: "Travel booking/refund scam",
  course_scam: "Course/coaching/education scam",
  salary_not_paid: "Salary not paid by employer",
  freelance_unpaid: "Freelance/client not paying",
  deposit_not_returned: "Security deposit not returned by landlord",
  illegal_eviction: "Illegal eviction/threat by landlord",
  rental_listing: "Rental listing/broker scam",
  domestic_violence: "Domestic violence",
  family_relationship_threat: "Family threatening adult relationship",
};

export default function LeafPage() {
  const { leafId } = useParams<{ leafId: string }>();
  const leaf = TREE.leaves[leafId!];
  if (!leaf) notFound();

  const urgent = /high|urgent/i.test(leaf.urgency);
  const complaintContext = COMPLAINT_CONTEXTS[leafId!] ?? "General scam complaint";

  const [amount, setAmount] = useState("");
  const [scammerId, setScammerId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [scammerUser, setScammerUser] = useState("");
  const [firstContactDate, setFirstContactDate] = useState("");
  const [demandType, setDemandType] = useState("");
  const [callerPhone, setCallerPhone] = useState("");
  const [callDate, setCallDate] = useState("");
  const [claimedIdentity, setClaimedIdentity] = useState("");
  const [bankOrStationName, setBankOrStationName] = useState("");
  const [complaintDate, setComplaintDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [threatType, setThreatType] = useState("");
  const [threatDate, setThreatDate] = useState("");
  const [reportedBefore, setReportedBefore] = useState("");
  const [freeText, setFreeText] = useState("");
  const [complaint, setComplaint] = useState("");
  const [drafting, setDrafting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [rawInput, setRawInput] = useState("");
  const [parsing, setParsing] = useState(false);
  const [evidenceCount, setEvidenceCount] = useState(0);

  async function autoFill() {
    if (!rawInput.trim() || parsing) return;
    setParsing(true);
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "parse", text: rawInput }),
      });
      const data = await res.json();
      if (data.amount) setAmount(data.amount);
      if (data.scammerId) setScammerId(data.scammerId);
      if (data.transactionId) setTransactionId(data.transactionId);
      if (data.date) {
        setIncidentDate(data.date);
        setFirstContactDate(data.date);
        setCallDate(data.date);
        setComplaintDate(data.date);
        setThreatDate(data.date);
      }
      if (data.platform) setPlatform(data.platform);
      if (data.scammerUser) setScammerUser(data.scammerUser);
      if (data.demandType) setDemandType(data.demandType);
      if (data.callerPhone) setCallerPhone(data.callerPhone);
      if (data.claimedIdentity) setClaimedIdentity(data.claimedIdentity);
      if (data.bankOrStationName) setBankOrStationName(data.bankOrStationName);
      if (data.refNumber) setRefNumber(data.refNumber);
      if (data.officerName) setOfficerName(data.officerName);
      if (data.freeText) setFreeText(data.freeText);
      if (data.relationship) setRelationship(data.relationship);
      if (data.threatType) setThreatType(data.threatType);
      if (data.reportedBefore) setReportedBefore(data.reportedBefore);
      if (data.threatDate) setThreatDate(data.threatDate);
    } catch {
      // silently fail, user can fill fields manually
    } finally {
      setParsing(false);
    }
  }

  function fieldCategory() {
    const id = leafId!;
    if (/upi|qr|otp|transaction|crypto|investment|loan|card|job|task|romance|matrimonial|kyc|atm|shopping|courier|equipment|visa/.test(id)) return "financial";
    if (/sextortion|blackmail|morphed|private|extortion|false_case|repeat_extortion/.test(id)) return "sextortion";
    if (/arrest|parcel|identity|fake_police|digital/.test(id)) return "police_scam";
    if (/fir|police|bank|cyber|process|inaction|portal|1930/.test(id)) return "process";
    if (/harassment|stalking|known_person|offline/.test(id)) return "threat";
    return "default";
  }

  function buildPayload() {
    const cat = fieldCategory();
    const base = { leafId, complaintContext, evidenceCount };
    switch (cat) {
      case "financial":
        return { ...base, amount, scammerId, transactionId, date: incidentDate };
      case "sextortion":
        return { ...base, platform, scammerUser, date: firstContactDate, demandType };
      case "police_scam":
        return { ...base, callerPhone, platform, date: callDate, claimedIdentity };
      case "process":
        return { ...base, bankOrStationName, date: complaintDate, refNumber, officerName };
      case "threat":
        return { ...base, relationship, threatType, date: threatDate, reportedBefore };
      default:
        return { ...base, date: incidentDate, freeText };
    }
  }

  async function generateComplaint() {
    setDrafting(true);
    setComplaint("");
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "draft", ...buildPayload() }),
      });
      const data = await res.json();
      setComplaint(data.draft);
    } catch {
      setComplaint("Something went wrong. Please try again.");
    } finally {
      setDrafting(false);
    }
  }

  async function copyComplaint() {
    await navigator.clipboard.writeText(complaint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const portalUrl = (() => {
    if (/upi|qr|otp|crypto|investment|job|task|sextortion|blackmail|digital_arrest|fake_parcel|threat/.test(leafId!)) return "https://cybercrime.gov.in";
    if (/bank|loan_app/.test(leafId!)) return "https://sachet.rbi.org.in";
    if (/consumer|shopping|courier/.test(leafId!)) return "https://consumerhelpline.gov.in";
    if (/fir|police/.test(leafId!)) return "https://www.mha.gov.in";
    return "https://cybercrime.gov.in";
  })();

  return (
    <>
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

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <PlanCard icon={<AlertTriangle className="size-5" />} eyebrow="Do this now" tint="lime">
                <ol className="space-y-2.5">
                  {leaf.actions.map((a, i) => (
                    <ActionItem key={i} text={a} index={i} badge="lime" />
                  ))}
                </ol>
              </PlanCard>

              <PlanCard icon={<Scale className="size-5" />} eyebrow="Authorities & routes" tint="primary">
                <ol className="space-y-2.5">
                  {leaf.authorities.map((a, i) => (
                    <ActionItem key={i} text={a} index={i} badge="red" />
                  ))}
                </ol>
              </PlanCard>

              <PlanCard icon={<Shield className="size-5" />} eyebrow="Evidence checklist" tint="ink">
                <EvidenceChecklist items={leaf.evidence} onFilesChange={setEvidenceCount} />
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

            {/* Generate complaint */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="eyebrow text-primary">Generate your complaint</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details and we'll draft a formal complaint for cybercrime.gov.in.
              </p>
              <p className="mt-3 text-xs italic text-muted-foreground">
                Not sure what to fill? Just describe what happened in the box below and we'll figure it out.
              </p>
              <div className="mt-2 flex gap-2">
                <textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="e.g. I paid ₹15,000 via GPay to buy a phone, the seller blocked me after payment"
                  rows={4}
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground resize-none"
                />
                <button
                  onClick={autoFill}
                  disabled={parsing || !rawInput.trim()}
                  className="shrink-0 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background disabled:opacity-50"
                >
                  {parsing ? "Parsing..." : "Auto-fill"}
                </button>
              </div>
              {fieldCategory() === "financial" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Amount lost</label>
                    <div className="mt-1 flex items-center rounded-xl border border-border bg-background px-3">
                      <span className="text-sm text-muted-foreground">₹</span>
                      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full bg-transparent px-2 py-2.5 text-sm outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Scammer's UPI ID / phone</label>
                    <input type="text" value={scammerId} onChange={(e) => setScammerId(e.target.value)} placeholder="e.g. scammer@upi or 98xxxxxxxx" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Transaction ID</label>
                    <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="e.g. TXN123456789" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date of incident</label>
                    <input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              {fieldCategory() === "sextortion" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Platform where it happened</label>
                    <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="WhatsApp / Instagram / Telegram / other" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Scammer phone or username</label>
                    <input type="text" value={scammerUser} onChange={(e) => setScammerUser(e.target.value)} placeholder="Phone number or @username" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date first contacted</label>
                    <input type="date" value={firstContactDate} onChange={(e) => setFirstContactDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">What they demanded</label>
                    <input type="text" value={demandType} onChange={(e) => setDemandType(e.target.value)} placeholder="Money / silence / other" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              {fieldCategory() === "police_scam" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Caller phone number</label>
                    <input type="text" value={callerPhone} onChange={(e) => setCallerPhone(e.target.value)} placeholder="e.g. 9876543210" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Platform</label>
                    <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Call / Video call / WhatsApp" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date of call</label>
                    <input type="date" value={callDate} onChange={(e) => setCallDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">What they claimed</label>
                    <input type="text" value={claimedIdentity} onChange={(e) => setClaimedIdentity(e.target.value)} placeholder="CBI / Police / Customs / TRAI" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              {fieldCategory() === "process" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Bank or police station name</label>
                    <input type="text" value={bankOrStationName} onChange={(e) => setBankOrStationName(e.target.value)} placeholder="Name of bank / police station" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date of complaint</label>
                    <input type="date" value={complaintDate} onChange={(e) => setComplaintDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Reference number if any</label>
                    <input type="text" value={refNumber} onChange={(e) => setRefNumber(e.target.value)} placeholder="e.g. Complaint / FIR / ticket no." className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Officer name if known</label>
                    <input type="text" value={officerName} onChange={(e) => setOfficerName(e.target.value)} placeholder="Name of officer in charge" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              {fieldCategory() === "threat" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Relationship to person</label>
                    <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Ex / neighbour / colleague / stranger" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Type of threat</label>
                    <input type="text" value={threatType} onChange={(e) => setThreatType(e.target.value)} placeholder="e.g. physical harm / defamation / false case" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date started</label>
                    <input type="date" value={threatDate} onChange={(e) => setThreatDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Have you reported before?</label>
                    <input type="text" value={reportedBefore} onChange={(e) => setReportedBefore(e.target.value)} placeholder="Yes / No — if yes, where?" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              {fieldCategory() === "default" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70">Date of incident</label>
                    <input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                </div>
              )}

              <button
                onClick={generateComplaint}
                disabled={drafting}
                className="mt-4 rounded-full border-2 border-red-700 bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#7f1d1d] transition-transform hover:-translate-y-0.5 hover:bg-red-700 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {drafting ? "Drafting your complaint..." : "Generate Complaint"}
              </button>
              {complaint && (
                <div className="mt-4">
                  <textarea
                    readOnly
                    value={complaint}
                    rows={10}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none font-mono"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={copyComplaint}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
                    >
                      {copied ? <Check className="size-4 text-lime" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy complaint"}
                    </button>
                    <a
                      href={portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
                    >
                      Go to portal <ExternalLink className="size-4" />
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Your complaint is copied — just paste it on the portal.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => history.back()}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                <HomeIcon className="size-4" /> Start over
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      <AdvocateFloatingCard leafId={leafId} />
    </>
  );
}

function AdvocateFloatingCard({ leafId }: { leafId: string }) {
  const [showBrief, setShowBrief] = useState(false);

  if (!showBrief) {
    return (
      <button
        onClick={() => setShowBrief(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full border-2 border-foreground bg-foreground px-6 py-4 text-base font-bold text-background shadow-[5px_5px_0_0_#ffb703] transition-transform hover:-translate-y-0.5 bg-gradient-to-b from-white/15 to-transparent"
      >
        ⚖ Talk to an Advocate
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-64 rounded-2xl border-2 border-lime bg-ink p-4 shadow-[4px_4px_0_0_var(--foreground)]">
      <p className="text-sm font-bold text-lime">Talk to a Verified Advocate</p>
      <p className="mt-1 text-xs text-lime/70">
        Free first consultation. No upfront payment. A LawgicHub advocate will call you back.
      </p>
      <div className="mt-3 flex gap-2">
        <Link
          to="/advocate"
          search={{ issue: leafId, leafId: "" }}
          className="flex-1 rounded-full bg-lime px-4 py-2 text-center text-xs font-bold text-ink"
        >
          Connect →
        </Link>
        <button
          onClick={() => setShowBrief(false)}
          className="rounded-full border border-lime/30 px-3 py-2 text-xs text-lime/70"
        >
          ✕
        </button>
      </div>
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
