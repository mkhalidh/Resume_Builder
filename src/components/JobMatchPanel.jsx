import { useState } from "react";
import { Check, Plus, Search, Sparkles, Loader2 } from "lucide-react";
import { matchJobToResume } from "../lib/jobMatch";

const RING_RADIUS = 32;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const MatchRing = ({ score }) => {
  const offset = RING_CIRCUMFERENCE * (1 - score / 100);
  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg viewBox="0 0 72 72" className="w-20 h-20 -rotate-90">
        <circle
          cx="36"
          cy="36"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-black/5"
        />
        <circle
          cx="36"
          cy="36"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="text-jade transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-bold text-ink text-lg">
          {score}%
        </span>
      </div>
    </div>
  );
};

const JobMatchPanel = ({ resumeData }) => {
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);
  const [aiStatus, setAiStatus] = useState("idle"); // idle | loading | done | error
  const [aiGuidance, setAiGuidance] = useState("");
  const [aiError, setAiError] = useState("");

  const handleCheck = () => {
    if (!jobText.trim()) return;
    setResult(matchJobToResume(jobText, resumeData));
    setAiStatus("idle");
    setAiGuidance("");
    setAiError("");
  };

  const FALLBACK_AI_ERROR =
    "AI suggestions aren't available right now — try again in a bit.";

  const handleGetAiSuggestions = async () => {
    if (!result) return;
    setAiStatus("loading");
    setAiError("");

    let res;
    try {
      res = await fetch("/api/job-guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobText,
          matched: result.matched,
          missing: result.missing,
        }),
      });
    } catch {
      // Network failure (server unreachable, offline, etc).
      setAiError(FALLBACK_AI_ERROR);
      setAiStatus("error");
      return;
    }

    // Parsed separately: a proxy error page or any other non-JSON response
    // should fall through to the friendly message, not a raw parser error.
    let data = null;
    try {
      data = await res.json();
    } catch {
      // leave data null
    }

    if (!res.ok || !data) {
      // data.error is our own known-safe server copy (e.g. rate limit,
      // missing config) — safe to show as-is. Anything else falls back.
      setAiError(data?.error || FALLBACK_AI_ERROR);
      setAiStatus("error");
      return;
    }

    setAiGuidance(data.guidance);
    setAiStatus("done");
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6">
      <p className="font-body text-jade text-xs font-semibold uppercase tracking-wide mb-1.5">
        Keyword match
      </p>
      <p className="font-display font-semibold text-ink text-lg mb-1">
        Match to a job
      </p>
      <p className="font-body text-ink/60 text-sm mb-4">
        Paste a job description and see which keywords your resume already
        covers, and which ones it&apos;s missing.
      </p>

      <textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        className="w-full font-body text-sm text-ink border border-black/10 rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-jade"
      />

      <button
        type="button"
        onClick={handleCheck}
        disabled={!jobText.trim()}
        className="font-body font-semibold text-sm bg-jade text-white px-5 py-2.5 rounded-full hover:bg-jade/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Check match
      </button>

      {!result && (
        <div className="mt-5 border border-dashed border-black/10 rounded-xl py-8 flex flex-col items-center text-center">
          <Search className="w-5 h-5 text-ink/30 mb-2" />
          <p className="font-body text-ink/40 text-sm max-w-xs">
            Your keyword match will show up here once you check a job
            description.
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          {result.totalFound === 0 ? (
            <p className="font-body text-ink/60 text-sm">
              Couldn&apos;t find any recognizable skill keywords in that text — try
              pasting the full job description.
            </p>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-5">
                <MatchRing score={result.matchScore} />
                <p className="font-body text-sm text-ink/70">
                  <span className="font-semibold text-ink">
                    {result.matched.length} of {result.totalFound}
                  </span>{" "}
                  keywords from this job are already on your resume.
                </p>
              </div>

              {result.matched.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">
                    Already on your resume
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.matched.map((term) => (
                      <span
                        key={term}
                        className="inline-flex items-center gap-1 font-body text-xs text-jade bg-jade-50 px-2.5 py-1 rounded-full"
                      >
                        <Check className="w-3 h-3" strokeWidth={2.5} />
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.missing.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">
                    Consider adding
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map((term) => (
                      <span
                        key={term}
                        className="inline-flex items-center gap-1 font-body text-xs text-ink/80 bg-gold/15 px-2.5 py-1 rounded-full"
                      >
                        <Plus className="w-3 h-3" strokeWidth={2.5} />
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="font-body text-xs text-ink/40 mt-2 mb-4">
                Simple keyword matching, not a guarantee of ATS ranking — use
                it as a guide, not gospel.
              </p>

              {aiStatus === "idle" && (
                <button
                  type="button"
                  onClick={handleGetAiSuggestions}
                  className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-violet border border-violet/30 px-4 py-2 rounded-full hover:bg-violet/5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get AI suggestions
                </button>
              )}

              {aiStatus === "loading" && (
                <p className="inline-flex items-center gap-2 font-body text-sm text-ink/50">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking through your resume...
                </p>
              )}

              {aiStatus === "error" && (
                <div className="bg-black/[0.03] rounded-xl p-4">
                  <p className="font-body text-sm text-ink/60 mb-2">
                    {aiError}
                  </p>
                  <button
                    type="button"
                    onClick={handleGetAiSuggestions}
                    className="font-body font-medium text-sm text-violet hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {aiStatus === "done" && (
                <div className="bg-violet/5 border border-violet/10 rounded-xl p-4">
                  <p className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-violet uppercase tracking-wide mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI suggestions
                  </p>
                  <p className="font-body text-sm text-ink/80 whitespace-pre-line leading-relaxed">
                    {aiGuidance}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatchPanel;
