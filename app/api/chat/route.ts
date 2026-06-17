const GROQ_MODEL = "openai/gpt-oss-120b";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const apiKey = process.env.GROQ_API_KEY;

  const groqMessages = [
    {
      role: "system",
      content: `You are Suraksha, a navigation guide for the Suraksha website. Your job is to understand their situation and redirect them to the right page on the site. Always include the page path (like /help/money or /scams) so they can click it.

Available pages:
- /help — triage hub with 4 doors: Money, Threats, Process, Other
- /help/money — for UPI, investment, job, loan, bank, shopping, relationship scams
- /help/threats — for digital arrest, sextortion, blackmail, harassment
- /help/process — for police, bank, reporting process issues
- /help/other — for work, home, family issues
- /scams — scam radar with 8 trending scams
- /how-it-works — explains the spot-block-fix method

How to respond:
1. First ask a short 1-line question to narrow down their situation
2. Then say: "Go to /help/money and pick your situation"

Keep VERY short — max 2 lines. Plain text only. Always include the page path starting with /.`,
    },
    ...messages.map((m: any) => ({
      role: m.role === "model" ? "assistant" : m.role,
      content: m.parts?.[0]?.text ?? "",
    })),
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: groqMessages,
    }),
  });

  const result = await response.json();

  return Response.json({
    reply:
      result.choices?.[0]?.message?.content ??
      "Sorry, please call 1930 directly.",
  });
}
