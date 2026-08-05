import { useCroppedPhoto } from "../hooks/useCroppedPhoto";
import { ContactLine } from "../components/ContactLine";
import { ProjectLinkBadge } from "../components/ProjectLinkBadge";

const TagGroup = ({ label, items }) => {
  const list = items?.filter(Boolean);
  if (!list?.length) return null;
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-body text-[10px] uppercase tracking-wide text-ink/40 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {list.map((tag, i) => (
          <span
            key={i}
            className="inline-block font-body text-xs text-ink/70 border border-ink/15 rounded-full px-3 h-7 leading-7"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Each section is its own component purely so the render order can be
// data-driven (data.sectionOrder) instead of fixed by source order — the
// JSX/styling inside each one is unchanged from before this was extracted.
const ExperienceSection = ({ data }) => (
  <section className="mb-10">
    <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
      Experience
    </h2>
    <div className="space-y-7">
      {data.experiences.map((exp, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            {exp.mainHeading && (
              <h3 className="font-display font-semibold text-ink text-base">
                {exp.mainHeading}
              </h3>
            )}
            {exp.companyName && (
              <p className="font-body text-ink/60 text-sm">{exp.companyName}</p>
            )}
            {exp.description && (
              <p className="font-body text-ink/70 text-sm leading-relaxed mt-1.5">
                {exp.description}
              </p>
            )}
          </div>
          {exp.date && (
            <p className="font-body text-ink/40 text-xs whitespace-nowrap">
              {exp.date}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({ data }) => {
  if (!data.projects?.some((p) => p.mainHeading)) return null;
  return (
    <section className="mb-10">
      <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
        Projects
      </h2>
      <div className="space-y-7">
        {data.projects.map(
          (project, i) =>
            project.mainHeading && (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-ink text-base">
                      {project.mainHeading}
                    </h3>
                    <ProjectLinkBadge href={project.link} className="text-jade" />
                  </div>
                  {project.description && (
                    <p className="font-body text-ink/70 text-sm leading-relaxed mt-1.5">
                      {project.description}
                    </p>
                  )}
                </div>
                {project.date && (
                  <p className="font-body text-ink/40 text-xs whitespace-nowrap">
                    {project.date}
                  </p>
                )}
              </div>
            )
        )}
      </div>
    </section>
  );
};

const EducationSection = ({ data }) => (
  <section className="mb-10">
    <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
      Education
    </h2>
    <div className="space-y-4">
      {data.education.map((edu, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            {edu.mainHeading && (
              <h3 className="font-display font-semibold text-ink text-base">
                {edu.mainHeading}
              </h3>
            )}
            {edu.schoolName && (
              <p className="font-body text-ink/60 text-sm">{edu.schoolName}</p>
            )}
          </div>
          {edu.date && (
            <p className="font-body text-ink/40 text-xs whitespace-nowrap">
              {edu.date}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
);

const CertificationsSection = ({ data }) => {
  if (!data.certifications?.some((c) => c.mainHeading)) return null;
  return (
    <section className="mb-10">
      <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
        Certifications &amp; Achievements
      </h2>
      <div className="space-y-4">
        {data.certifications.map(
          (cert, i) =>
            cert.mainHeading && (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <h3 className="font-display font-semibold text-ink text-base">
                    {cert.mainHeading}
                  </h3>
                  {cert.issuer && (
                    <p className="font-body text-ink/60 text-sm">{cert.issuer}</p>
                  )}
                </div>
                {cert.date && (
                  <p className="font-body text-ink/40 text-xs whitespace-nowrap">
                    {cert.date}
                  </p>
                )}
              </div>
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
const DEFAULT_SECTION_ORDER = ["experience", "projects", "education", "certifications"];

const MinimalTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar;
  const hasTags = [skills, tools, languages].some((group) =>
    group?.some(Boolean)
  );

  // The `grayscale` CSS class only affects on-screen rendering — html2canvas
  // (used for PDF export) doesn't apply CSS filters, so the exported photo
  // would show up in color. This hook bakes grayscale into the actual pixels
  // instead, keeping screen and PDF in sync.
  const displayImageUrl = useCroppedPhoto(imageUrl, { grayscale: true });

  return (
    <div className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden px-12 py-12">
      <div className="flex items-center gap-6 mb-10 pb-8 border-b border-ink/10">
        <img
          src={displayImageUrl}
          className="w-20 h-20 rounded-full object-cover"
          alt="profile"
        />
        <div>
          <h1 className="font-display font-bold text-ink text-3xl tracking-tight">
            {data.name || "Muhammad Khalid Hussain"}
          </h1>
          <p className="font-body text-ink/50 uppercase tracking-widest text-xs mt-1">
            {data.designation || "Software Engineer"}
          </p>
          <ContactLine
            contact={data.contact}
            className="font-body text-xs text-ink/60 mt-2"
            separatorClassName="mx-2 text-ink/30"
            linkClassName="hover:text-jade transition-colors"
          />
        </div>
      </div>

      {(data.sectionOrder?.length ? data.sectionOrder : DEFAULT_SECTION_ORDER).map(
        (key) => {
          const SectionComponent = SECTION_COMPONENTS[key];
          return SectionComponent ? (
            <SectionComponent key={key} data={data} />
          ) : null;
        }
      )}

      {hasTags && (
        <section>
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
            Skills &amp; Tools
          </h2>
          <TagGroup label="Skills" items={skills} />
          <TagGroup label="Tools" items={tools} />
          <TagGroup label="Languages/Frameworks" items={languages} />
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
