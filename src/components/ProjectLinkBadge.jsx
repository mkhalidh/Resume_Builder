import { ExternalLink } from "lucide-react";

// Shared across every template: a small "Link" badge next to a project
// title, only rendered when the project has a link. `className` controls
// the accent color so each template can match its own palette.
export const ProjectLinkBadge = ({ href, className = "" }) => {
  if (!href) return null;
  // The project link isn't validated as a URL (an invalid entry shouldn't
  // block the whole form), so a bare domain like "example.com" would
  // otherwise become a relative href on-screen and an invalid URI in the
  // exported PDF's link annotation — either way, effectively unclickable.
  const normalizedHref = /^https?:\/\//i.test(href) ? href : `https://${href}`;
  return (
    <a
      href={normalizedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 font-body text-xs font-medium hover:underline ${className}`}
    >
      <ExternalLink className="w-3 h-3" strokeWidth={2} />
      Link
    </a>
  );
};
