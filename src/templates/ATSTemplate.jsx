import { ContactLine } from "../components/ContactLine";
import { ProjectLinkBadge } from "../components/ProjectLinkBadge";

const DEFAULT_SECTION_ORDER = ["experience", "projects", "education", "certifications"];

// Each section is its own component purely so the render order can be
// data-driven (data.sectionOrder) instead of fixed by source order — the
// JSX/styling inside each one is unchanged from before this was extracted.
const ExperienceSection = ({ data }) => (
  <section className="mb-6">
    <h2 className="font-body font-bold text-lg uppercase tracking-wide mb-3">
      Experience
    </h2>
    <div className="space-y-4">
      {data.experiences?.map(
        (exp, i) =>
          (exp.mainHeading || exp.companyName) && (
            <div key={i} className="text-sm leading-snug">
              <p className="font-semibold">
                {exp.mainHeading}
                {exp.companyName ? ` — ${exp.companyName}` : ""}
                {exp.date ? ` (${exp.date})` : ""}
              </p>
              {exp.description && (
                <p className="text-ink/70 mt-0.5">{exp.description}</p>
              )}
            </div>
          )
      )}
    </div>
  </section>
);

const ProjectsSection = ({ data }) => (
  <section className="mb-6">
    <h2 className="font-body font-bold text-lg uppercase tracking-wide mb-3">
      Projects
    </h2>
    <div className="space-y-4">
      {data.projects?.map(
        (project, i) =>
          project.mainHeading && (
            <div key={i} className="text-sm leading-snug">
              <p className="font-semibold">
                {project.mainHeading}
                {project.date ? ` (${project.date})` : ""}
                {project.link && (
                  <ProjectLinkBadge href={project.link} className="text-ink ml-2" />
                )}
              </p>
              {project.description && (
                <p className="text-ink/70 mt-0.5">{project.description}</p>
              )}
            </div>
          )
      )}
    </div>
  </section>
);

const EducationSection = ({ data }) => (
  <section className="mb-6">
    <h2 className="font-body font-bold text-lg uppercase tracking-wide mb-3">
      Education
    </h2>
    <div className="space-y-2">
      {data.education?.map(
        (edu, i) =>
          (edu.mainHeading || edu.schoolName) && (
            <p key={i} className="text-sm">
              <span className="font-semibold">{edu.schoolName}</span>
              {edu.mainHeading ? ` — ${edu.mainHeading}` : ""}
              {edu.date ? ` (${edu.date})` : ""}
            </p>
          )
      )}
    </div>
  </section>
);

const CertificationsSection = ({ data }) => {
  if (!data.certifications?.some((c) => c.mainHeading)) return null;
  return (
    <section className="mb-6">
      <h2 className="font-body font-bold text-lg uppercase tracking-wide mb-3">
        Certifications &amp; Achievements
      </h2>
      <div className="space-y-2">
        {data.certifications.map(
          (cert, i) =>
            cert.mainHeading && (
              <p key={i} className="text-sm">
                <span className="font-semibold">{cert.mainHeading}</span>
                {cert.issuer ? ` — ${cert.issuer}` : ""}
                {cert.date ? ` (${cert.date})` : ""}
              </p>
            )
        )}
      </div>
    </section>
  );
};

const SECTION_COMPONENTS = {
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  certifications: CertificationsSection,
};

const ATSTemplate = ({ data }) => {
  const { skills, tools, languages } = data.rightSidebar || {};
  const groups = [
    { label: "Skills", items: skills },
    { label: "Tools", items: tools },
    { label: "Languages/Frameworks", items: languages },
  ].filter((group) => group.items?.some(Boolean));

  return (
    <div className="bg-white px-12 py-10 font-body text-ink">
      <div className="border-b border-ink pb-4 mb-6">
        <h1 className="font-body font-bold text-xl">
          {data.name || "Your Name"}
        </h1>
        <p className="text-sm text-ink/70">{data.designation || "Your Role"}</p>
        <ContactLine
          contact={data.contact}
          className="text-sm text-ink/70 mt-1"
          separatorClassName="mx-2 text-ink/30"
        />
      </div>

      {(data.sectionOrder?.length ? data.sectionOrder : DEFAULT_SECTION_ORDER).map(
        (key) => {
          const SectionComponent = SECTION_COMPONENTS[key];
          return SectionComponent ? (
            <SectionComponent key={key} data={data} />
          ) : null;
        }
      )}

      {groups.map((group) => (
        <section key={group.label} className="mb-6 last:mb-0">
          <h2 className="font-body font-bold text-lg uppercase tracking-wide mb-3">
            {group.label}
          </h2>
          <p className="text-sm text-ink/80">
            {group.items.filter(Boolean).join(", ")}
          </p>
        </section>
      ))}
    </div>
  );
};

export default ATSTemplate;
