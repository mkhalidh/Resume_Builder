import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/";
const GITHUB_PROFILE_URL = "https://github.com/mkhalidh/";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Templates", to: "/templates" },
      { label: "Builder", to: "/builder" },
      { label: "How it works", to: "/#features" },
      { label: "Free forever", to: "/#free" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Career blog", to: "/blog" },
      { label: "Resume examples", to: "/#examples" },
      { label: "Cover letter tips", to: "/#" },
      { label: "Interview guides", to: "/#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/#" },
      { label: "Contact", to: "/#" },
      { label: "Careers", to: "/#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/#" },
      { label: "Terms of service", to: "/#" },
      { label: "Cookie policy", to: "/#" },
    ],
  },
];

const socials = [
  { icon: GithubIcon, label: "GitHub", href: GITHUB_PROFILE_URL },
  { icon: LinkedinIcon, label: "LinkedIn", href: LINKEDIN_URL },
];

const Footer = () => {
  return (
    <footer className="bg-ink px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 pb-12 border-b border-white/10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-jade flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-semibold text-lg">
                <span className="text-white">resume</span>
                <span className="text-jade">builder</span>
              </span>
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Build a polished, ATS-friendly resume in minutes and export it
              straight to PDF. Free forever, no sign-up required.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display font-semibold text-white text-sm mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-sm">
            &copy; {new Date().getFullYear()} resumebuilder. Built by{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              Muhammad Khalid Hussain
            </a>
            .
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
