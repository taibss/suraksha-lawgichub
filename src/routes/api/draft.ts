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
    const { leafId, ...fields } = data;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const fieldLines = Object.entries(fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

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
              content: `You are a legal assistant helping Indian scam victims. Generate a formal complaint letter for cybercrime.gov.in. Use the details provided. The complaint type is described in "complaintContext". Format it with: To (Cyber Crime Cell), Subject, Body with all incident details filled in, and closing. Keep it formal, factual, and under 300 words.`,
            },
            {
              role: "user",
              content: `${fieldLines}\n\nGenerate a formal complaint letter.`,
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
