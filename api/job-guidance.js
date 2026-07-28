import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const ENDPOINT = "https://models.github.ai/inference";
const MODEL = "openai/gpt-4.1";
const MAX_JOB_DESCRIPTION_LENGTH = 6000;
const MAX_KEYWORDS_PER_LIST = 30;

// Best-effort only: this Map lives in module scope, so it persists across
// warm invocations of the *same* serverless instance, but Vercel can spin up
// multiple instances under load and each gets its own Map. This will not
// stop a determined abuser, only casual repeated hits — a real distributed
// limiter would need an external store (Redis/Upstash), which this project
// doesn't have.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const SYSTEM_PROMPT = `You help people tailor their resume to a specific job description. You will
be given the job description, a list of keywords from that job the resume already covers
("matched"), and a list it's missing ("missing"). Respond with plain, concise, encouraging advice
in under 180 words: which 2-4 missing keywords matter most and why, plus 2-3 concrete example
phrasings the person could add to a resume bullet. Do not invent details about the person's
background you weren't given. Do not use markdown headers.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    res.status(429).json({
      error: "Too many requests — please wait a minute and try again.",
    });
    return;
  }

  const token = process.env.GITHUB_MODELS_TOKEN;
  if (!token) {
    res.status(500).json({
      error: "AI suggestions aren't configured on this server yet.",
    });
    return;
  }

  const { jobDescription, matched, missing } = req.body || {};

  if (typeof jobDescription !== "string" || !jobDescription.trim()) {
    res.status(400).json({ error: "A job description is required." });
    return;
  }
  if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
    res.status(400).json({ error: "That job description is too long." });
    return;
  }

  const safeMatched = Array.isArray(matched)
    ? matched.slice(0, MAX_KEYWORDS_PER_LIST)
    : [];
  const safeMissing = Array.isArray(missing)
    ? missing.slice(0, MAX_KEYWORDS_PER_LIST)
    : [];

  try {
    const client = ModelClient(ENDPOINT, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Job description:\n${jobDescription}\n\nMatched keywords: ${
              safeMatched.join(", ") || "none"
            }\nMissing keywords: ${safeMissing.join(", ") || "none"}`,
          },
        ],
        temperature: 0.4,
        top_p: 1,
        model: MODEL,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const guidance = response.body.choices[0].message.content;
    res.status(200).json({ guidance });
  } catch (err) {
    console.error("job-guidance error:", err);
    res.status(502).json({
      error: "AI suggestions aren't available right now — try again in a bit.",
    });
  }
}
