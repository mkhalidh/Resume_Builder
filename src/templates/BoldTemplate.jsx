import { useCroppedPhoto } from "../hooks/useCroppedPhoto";
import { ContactLine } from "../components/ContactLine";
import { ProjectLinkBadge } from "../components/ProjectLinkBadge";

const DEFAULT_SECTION_ORDER = ["experience", "projects", "education", "certifications"];

// Each section is its own component purely so the render order can be
// data-driven (data.sectionOrder) instead of fixed by source order — the
// JSX/styling inside each one is unchanged from before this was extracted.
const ExperienceSection = ({ data }) => (
  <>
    <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
      Experience
    </h2>
    <div className="space-y-6 mb-10">
      {data.experiences?.map(
        (exp, i) =>
          (exp.mainHeading || exp.companyName) && (
            <div key={i} className="bg-surface rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-1">
                {exp.mainHeading && (
                  <h3 className="font-display font-semibold text-ink text-base">
                    {exp.mainHeading}
                  </h3>
                )}
                {exp.date && (
                  <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                    {exp.date}
                  </span>
                )}
              </div>
              {exp.companyName && (
                <p className="font-body text-coral text-sm mb-2">
                  {exp.companyName}
                </p>
              )}
              {exp.description && (
                <p className="font-body text-ink/70 text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          )
      )}
    </div>
  </>
);

const ProjectsSection = ({ data }) => (
  <>
    <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
      Projects
    </h2>
    <div className="space-y-6 mb-10">
      {data.projects?.map(
        (project, i) =>
          project.mainHeading && (
            <div key={i} className="bg-surface rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-ink text-base">
                    {project.mainHeading}
                  </h3>
                  <ProjectLinkBadge href={project.link} className="text-coral" />
                </div>
                {project.date && (
                  <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                    {project.date}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="font-body text-ink/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          )
      )}
    </div>
  </>
);

const EducationSection = ({ data }) => (
  <>
    <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
      Education
    </h2>
    <div className="space-y-4">
      {data.education?.map(
        (edu, i) =>
          (edu.mainHeading || edu.schoolName) && (
            <div key={i} className="flex items-baseline justify-between">
              <div>
                {edu.schoolName && (
                  <h3 className="font-display font-semibold text-ink text-sm">
                    {edu.schoolName}
                  </h3>
                )}
                {edu.mainHeading && (
                  <p className="font-body text-ink/60 text-sm">{edu.mainHeading}</p>
                )}
              </div>
              {edu.date && (
                <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                  {edu.date}
                </span>
              )}
            </div>
          )
      )}
    </div>
  </>
);

const CertificationsSection = ({ data }) => {
  if (!data.certifications?.some((c) => c.mainHeading)) return null;
  return (
    <>
      <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
        Certifications &amp; Achievements
      </h2>
      <div className="space-y-4 mb-10">
        {data.certifications.map(
          (cert, i) =>
            cert.mainHeading && (
              <div key={i} className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-display font-semibold text-ink text-sm">
                    {cert.mainHeading}
                  </h3>
                  {cert.issuer && (
                    <p className="font-body text-ink/60 text-sm">{cert.issuer}</p>
                  )}
                </div>
                {cert.date && (
                  <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                    {cert.date}
                  </span>
                )}
              </div>
            )
        )}
      </div>
    </>
  );
};

const SECTION_COMPONENTS = {
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  certifications: CertificationsSection,
};

const BoldTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar || {};
  const displayImageUrl = useCroppedPhoto(imageUrl);

  return (
    <div className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="bg-coral px-12 pt-12 pb-16">
        <h1 className="font-display font-extrabold text-white text-4xl tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="font-body text-white/80 text-sm uppercase tracking-widest mt-2">
          {data.designation || "Your Role"}
        </p>
        <ContactLine
          contact={data.contact}
          className="font-body text-xs text-white/70 mt-2"
          separatorClassName="mx-2 text-white/40"
          linkClassName="hover:text-white transition-colors"
        />
      </div>

      <div className="px-12">
        {imageUrl && (
          <img
            src={displayImageUrl}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg -mt-12 mb-8"
            alt="profile"
          />
        )}

        <div className="grid sm:grid-cols-[1fr_240px] gap-10 pb-12">
          <div>
            {(data.sectionOrder?.length
              ? data.sectionOrder
              : DEFAULT_SECTION_ORDER
            ).map((key) => {
              const SectionComponent = SECTION_COMPONENTS[key];
              return SectionComponent ? (
                <SectionComponent key={key} data={data} />
              ) : null;
            })}
          </div>

          <div className="space-y-8">
            {[
              { label: "Skills", items: skills, color: "bg-coral" },
              { label: "Tools", items: tools, color: "bg-gold" },
              { label: "Languages/Frameworks", items: languages, color: "bg-violet" },
            ].map(
              ({ label, items, color }) =>
                items?.some(Boolean) && (
                  <div key={label}>
                    <h3 className="font-display font-bold text-ink text-xs uppercase tracking-widest mb-3">
                      {label}
                    </h3>
                    <ul className="space-y-2">
                      {items.filter(Boolean).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 font-body text-sm text-ink/70"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldTemplate;
