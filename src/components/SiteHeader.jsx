import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X, UserCircle } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import WhatsNewModal from "./WhatsNewModal";

const navLinks = [
  { label: "Templates", to: "/templates" },
  { label: "How it works", to: "/#features" },
  { label: "Examples", to: "/#examples" },
  { label: "Articles", to: "/blog" },
];

const GITHUB_URL = "https://github.com/mkhalidh/Resume_Builder";
const DEVELOPER_URL = "https://web-sepia-zeta-76e1668kme.vercel.app/";

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

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
          <button
            type="button"
            onClick={() => setShowWhatsNew(true)}
            className="font-body text-sm font-medium text-ink/50 hover:text-ink transition-colors"
          >
            v{__APP_VERSION__}
          </button>
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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setShowWhatsNew(true);
            }}
            className="font-body text-sm font-medium text-ink/50 text-left"
          >
            v{__APP_VERSION__} · What&apos;s New
          </button>
        </div>
      )}

      <WhatsNewModal
        open={showWhatsNew}
        onClose={() => setShowWhatsNew(false)}
      />
    </header>
  );
};

export default SiteHeader;
