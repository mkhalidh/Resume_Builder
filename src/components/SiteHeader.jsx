import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Templates", to: "/templates" },
  { label: "How it works", to: "/#features" },
  { label: "Examples", to: "/#examples" },
];

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

        <div className="hidden md:flex items-center gap-3">
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
