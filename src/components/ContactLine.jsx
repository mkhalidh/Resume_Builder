// Strips the protocol/"www." for a cleaner printed display — the href still
// keeps the full original URL, only the visible text is shortened.
const stripProtocol = (url) =>
  url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");

// Shared across every template: a single-line, icon-free contact row
// ("email | phone | linkedin | github") so it reads correctly on a printed/
// PDF resume, not just on screen. `className` controls text color so each
// template can match its own palette (dark sidebar vs light background).
export const ContactLine = ({
  contact,
  className = "",
  separatorClassName = "",
  linkClassName = "hover:underline",
}) => {
  if (!contact) return null;
  const { email, phone, linkedin, github } = contact;

  const items = [
    email && { key: "email", href: `mailto:${email}`, text: email },
    phone && { key: "phone", href: `tel:${phone}`, text: phone },
    linkedin && {
      key: "linkedin",
      href: linkedin,
      text: stripProtocol(linkedin),
      external: true,
    },
    github && {
      key: "github",
      href: github,
      text: stripProtocol(github),
      external: true,
    },
  ].filter(Boolean);
  if (!items.length) return null;

  return (
    <p className={className}>
      {items.map((item, i) => (
        <span key={item.key}>
          {i > 0 && (
            <span className={separatorClassName || "mx-2 opacity-40"}>|</span>
          )}
          <a
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={linkClassName}
          >
            {item.text}
          </a>
        </span>
      ))}
    </p>
  );
};
