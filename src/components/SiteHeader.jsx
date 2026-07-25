import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/resume.jpeg" className="w-8 h-8 rounded-md" alt="" />
          <span className="font-display font-semibold text-ink text-lg">
            Resume Builder
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/templates"
            className="font-body text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            Templates
          </Link>
          <a
            href="/#features"
            className="font-body text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            How it works
          </a>
        </nav>
        <Link
          to="/templates"
          className="font-body font-medium text-sm bg-jade text-white px-5 py-2.5 rounded-full hover:bg-jade/90 transition-colors"
        >
          Create Resume
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;
