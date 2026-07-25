import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X, UserCircle } from "lucide-react";

const navLinks = [
  { label: "Templates", to: "/templates" },
  { label: "How it works", to: "/#features" },
  { label: "Examples", to: "/#examples" },
  { label: "Articles", to: "/blog" },
];

const GITHUB_URL = "https://github.com/mkhalidh/Resume_Builder";
const DEVELOPER_URL = "https://web-sepia-zeta-76e1668kme.vercel.app/";

// lucide-react doesn't ship a GitHub mark, so this is the standard GitHub
// octocat logo as an inline SVG.
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .322.216.694.825.576 4.765-1.589 8.199-6.085 8.199-11.385 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-jade flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display font-semibold text-lg">
            <span className="text-ink">resume</span>
            <span className="text-jade">builder</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-body text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            Contribute here
          </a>
          <a
            href={DEVELOPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            About developer
          </a>
          <Link
            to="/templates"
            className="font-body font-medium text-sm bg-jade text-white px-5 py-2.5 rounded-full hover:bg-jade/90 transition-colors"
          >
            Create Resume
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-surface px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-body text-sm font-medium text-ink/70"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium text-ink/70"
          >
            <GithubIcon className="w-4 h-4" />
            Contribute here
          </a>
          <a
            href={DEVELOPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium text-ink/70"
          >
            <UserCircle className="w-4 h-4" />
            About developer
          </a>
          <Link
            to="/templates"
            onClick={() => setOpen(false)}
            className="font-body font-medium text-sm bg-jade text-white px-5 py-2.5 rounded-full text-center"
          >
            Create Resume
          </Link>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
