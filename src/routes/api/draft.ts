import { createServerFn } from "@tanstack/react-start";

const GROQ_MODEL = "openai/gpt-oss-120b";

export const parseFn = createServerFn({ method: "POST" })
  .handler(async ({ data }: any) => {
    const { text } = data;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: `Extract structured details from the user's scam description. Return ONLY valid JSON with these possible fields (set any to empty string if not mentioned):
amount (number as string), scammerId (string), transactionId (string), date (YYYY-MM-DD string), platform (string), scammerUser (string), demandType (string), callerPhone (string), claimedIdentity (string), bankOrStationName (string), refNumber (string), officerName (string), freeText (string), relationship (string), threatType (string), threatDate (YYYY-MM-DD string), reportedBefore (string).
If the date is relative like "yesterday" or "2 days ago", figure out the actual date. Do not include any other text.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
        }),
      }
    );

    const result = await response.json();
    const raw = result.choices?.[0]?.message?.content ?? "{}";

    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });

export const draftFn = createServerFn({ method: "POST" })
  .handler(async ({ data }: any) => {
    const { leafId, evidenceCount, complaintContext, ...fields } = data;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const fieldLines = Object.entries(fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    let legalSections = "";
    if (/sextortion|blackmail|morphed|private|extortion|false_case/.test(leafId)) {
      legalSections = "Include a paragraph citing Section 66E (violation of privacy) and Section 67 (publishing or transmitting obscene material) of the Information Technology Act, 2000.";
    } else if (/upi|qr|otp|credit_card|atm|transaction|unauthorised/.test(leafId)) {
      legalSections = "Include a paragraph citing Section 66D (cheating by impersonation using computer resource) of the Information Technology Act, 2000 and the RBI circular on limiting customer liability in unauthorised electronic banking transactions.";
    } else if (/digital_arrest|identity/.test(leafId)) {
      legalSections = "Include a paragraph citing Section 66C (punishment for identity theft) and Section 66D (cheating by impersonation using computer resource) of the Information Technology Act, 2000.";
    }

    const evidenceLine = evidenceCount > 0
      ? `\nEvidence Attached: ${evidenceCount} file(s) uploaded including screenshots and proof of incident.`
      : "";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: `Generate a formal Indian police complaint letter. Follow these strict formatting rules:

1. NO markdown, NO asterisks, NO bold, NO bullet points with dashes, NO numbered lists with dots. Plain text only.

2. Format exactly like this:

To,
The Officer In Charge,
Cyber Crime Cell,
[City/Portal]

Subject: [One line subject based on complaint type]

Respected Sir/Madam,

I, [Your Full Name], son/daughter of [Father's Name], residing at [Your Address], Phone: [Your Phone Number], Email: [Your Email ID], wish to lodge a formal complaint against an unknown cyber offender.

[Write 3-4 paragraphs in plain formal English describing what happened, using only the details provided. Each paragraph is a continuous sentence, no numbering, no bullets.]

In light of the above, I humbly request your good office to register this complaint, investigate the matter, identify and apprehend the perpetrator, and take appropriate legal action at the earliest. I am fully prepared to cooperate with the investigation and provide any additional information required.

Yours faithfully,

[Your Full Name]
[Your Address]
[Your Phone Number]
[Your Email ID]
Date: [Date of complaint]

3. Use ONLY details provided by user. Leave unProvided details in square brackets. NEVER invent details. No markdown formatting whatsoever.${legalSections ? "\n\n4. " + legalSections : ""}${evidenceLine}`,
            },
            {
              role: "user",
              content: `Complaint type: ${complaintContext}\n\nDetails provided by victim:\n${fieldLines}\n\nGenerate a formal Indian police complaint letter using ONLY the details above. Do not use markdown. Do not invent any details.`,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    return {
      draft:
        result.choices?.[0]?.message?.content ??
        "Sorry, unable to generate complaint. Please try again.",
    };
  });
