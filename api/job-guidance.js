import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const ENDPOINT = "https://models.github.ai/inference";
const MODEL = "openai/gpt-4.1";
const MAX_JOB_DESCRIPTION_LENGTH = 6000;
const MAX_KEYWORDS_PER_LIST = 30;
const MAX_RESUME_CONTENT_LENGTH = 4000;

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
be given the job description, the person's actual resume content (their experience and project
descriptions and their listed skills), a list of keywords from the job the resume already covers
("matched"), and a list it's missing ("missing").

A keyword being "matched" only means it appears somewhere in the resume text — it does NOT mean
the person's real experience or projects actually demonstrate it. Judge genuine fit by reading the
experience/project descriptions themselves, not just the keyword lists. If the job asks for one
technology or stack (e.g. Java) but the person's actual projects/experience are built in a
different one (e.g. .NET or MERN), say so plainly — a "matched" keyword sitting only in a skills
list is not the same as demonstrated, relevant work, and hiding that is not helpful to them.

Respond with ONLY a JSON object (no markdown, no code fences) with exactly these fields:
{
  "fitSummary": "1-2 full sentences giving an honest overall read on how well this person's actual
    experience/projects fit this job, not just keyword overlap.",
  "strengths": ["1-3 full sentences, each describing a genuine, specific overlap between their
    real experience/projects and what the job asks for. Omit if there are none."],
  "gaps": ["1-3 full sentences, each an honest gap — missing keywords that matter, or a mismatch
    between the job's core requirement and what their projects/experience actually show."],
  "suggestions": ["2-3 full sentences, each a concrete example phrasing they could add to a resume
    bullet to address a gap above."]
}

Every array item must be a complete, well-formed sentence — never a sentence fragment, never
prefixed with a dash or bullet character. Do not invent details about the person's background you
weren't given. Keep the whole response concise.`;

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

  const { jobDescription, matched, missing, resumeContent } = req.body || {};

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
  const safeResumeContent =
    typeof resumeContent === "string"
      ? resumeContent.slice(0, MAX_RESUME_CONTENT_LENGTH)
      : "";

  try {
    const client = ModelClient(ENDPOINT, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Job description:\n${jobDescription}\n\nResume content (actual experience/project descriptions and skills):\n${
              safeResumeContent || "none provided"
            }\n\nMatched keywords: ${
              safeMatched.join(", ") || "none"
            }\nMissing keywords: ${safeMissing.join(", ") || "none"}`,
          },
        ],
        temperature: 0.4,
        top_p: 1,
        model: MODEL,
        response_format: { type: "json_object" },
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const raw = response.body.choices[0].message.content;
    let guidance;
    try {
      guidance = JSON.parse(raw);
    } catch (parseErr) {
      console.error("job-guidance: model returned non-JSON output:", raw);
      throw parseErr;
    }

    res.status(200).json({ guidance });
  } catch (err) {
    console.error("job-guidance error:", err);
    res.status(502).json({
      error: "AI suggestions aren't available right now — try again in a bit.",
    });
  }
}
