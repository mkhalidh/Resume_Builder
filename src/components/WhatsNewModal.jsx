import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import Modal from "./Modal";
import { changelog } from "../data/changelog";

const latestRelease = changelog[0].releases[0];

const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const findRelease = (version) => {
  for (const group of changelog) {
    const release = group.releases.find((r) => r.version === version);
    if (release) return release;
  }
  return latestRelease;
};

const WhatsNewModal = ({ open, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState(
    latestRelease.version
  );
  const [expandedMajors, setExpandedMajors] = useState(
    () => new Set([changelog[0].major])
  );

  const selected = findRelease(selectedVersion);

  const toggleExpanded = (major) => {
    setExpandedMajors((prev) => {
      const next = new Set(prev);
      if (next.has(major)) next.delete(major);
      else next.add(major);
      return next;
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="What's New" maxWidth="max-w-2xl">
      <div className="flex h-full">
        {/* Version list */}
        <div className="w-40 shrink-0 border-r border-black/5 overflow-y-auto py-3 px-2">
          {changelog.map((group) => {
            const [headRelease, ...otherReleases] = group.releases;
            const isExpanded = expandedMajors.has(group.major);
            const hasSubVersions = otherReleases.length > 0;

            return (
              <div key={group.major} className="mb-1">
                <div
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 cursor-pointer transition-colors ${
                    selectedVersion === headRelease.version
                      ? "bg-jade-50 text-jade"
                      : "text-ink/70 hover:bg-black/5"
                  }`}
                  onClick={() => {
                    setSelectedVersion(headRelease.version);
                    if (hasSubVersions && !isExpanded) toggleExpanded(group.major);
                  }}
                >
                  <span className="font-body text-sm font-semibold">
                    v{headRelease.version}
                  </span>
                  {hasSubVersions && (
                    <button
                      type="button"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(group.major);
                      }}
                      className="text-current"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasSubVersions && isExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    {otherReleases.map((release) => (
                      <button
                        key={release.version}
                        type="button"
                        onClick={() => setSelectedVersion(release.version)}
                        className={`w-full text-left rounded-lg pl-5 pr-2.5 py-1.5 font-body text-xs transition-colors ${
                          selectedVersion === release.version
                            ? "bg-jade-50 text-jade font-semibold"
                            : "text-ink/50 hover:bg-black/5"
                        }`}
                      >
                        v{release.version}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected release details */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-display font-semibold text-ink text-base">
              v{selected.version}
            </p>
            {selected.version === latestRelease.version && (
              <span className="font-body text-[10px] font-semibold uppercase tracking-wide text-jade bg-jade-50 px-2 py-0.5 rounded-full">
                Latest
              </span>
            )}
          </div>
          <p className="font-body text-ink/40 text-xs mb-4">
            {formatDate(selected.date)}
          </p>

          <ul className="space-y-3">
            {selected.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5">
                <Check
                  className="w-4 h-4 text-jade shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span className="font-body text-ink/70 text-sm leading-relaxed">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default WhatsNewModal;
