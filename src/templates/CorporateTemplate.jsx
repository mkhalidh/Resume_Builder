import { useCroppedPhoto } from "../hooks/useCroppedPhoto";
import { ContactLine } from "../components/ContactLine";
import { ProjectLinkBadge } from "../components/ProjectLinkBadge";

const SidebarList = ({ title, items }) => {
  const list = items?.filter(Boolean);
  if (!list?.length) return null;
  return (
    <div className="mb-6">
      <h3 className="font-display font-semibold text-ink text-xs uppercase tracking-widest mb-2">
        {title}
      </h3>
      <p className="font-body text-ink/60 text-sm leading-relaxed">
        {list.join(", ")}
      </p>
    </div>
  );
};

const DEFAULT_SECTION_ORDER = ["experience", "projects", "education", "certifications"];

// Each section is its own component purely so the render order can be
// data-driven (data.sectionOrder) instead of fixed by source order — the
// JSX/styling inside each one is unchanged from before this was extracted.
const ExperienceSection = ({ data }) => (
  <section className="mb-10">
    <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
      Experience
    </h2>
    <div className="divide-y divide-ink/10">
      {data.experiences?.map(
        (exp, i) =>
          (exp.mainHeading || exp.companyName) && (
            <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
              <p className="font-body text-ink/40 text-xs pt-1">{exp.date}</p>
              <div>
                {exp.mainHeading && (
                  <h3 className="font-display font-semibold text-ink text-base">
                    {exp.mainHeading}
                  </h3>
                )}
                {exp.companyName && (
                  <p className="font-body text-ink/60 text-sm mb-1.5">
                    {exp.companyName}
                  </p>
                )}
                {exp.description && (
                  <p className="font-body text-ink/70 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          )
      )}
    </div>
  </section>
);

const ProjectsSection = ({ data }) => (
  <section className="mb-10">
    <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
      Projects
    </h2>
    <div className="divide-y divide-ink/10">
      {data.projects?.map(
        (project, i) =>
          project.mainHeading && (
            <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
              <p className="font-body text-ink/40 text-xs pt-1">{project.date}</p>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-ink text-base">
                    {project.mainHeading}
                  </h3>
                  <ProjectLinkBadge href={project.link} className="text-jade-600" />
                </div>
                {project.description && (
                  <p className="font-body text-ink/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          )
      )}
    </div>
  </section>
);

const EducationSection = ({ data }) => (
  <section className="mb-10">
    <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
      Education
    </h2>
    <div className="divide-y divide-ink/10">
      {data.education?.map(
        (edu, i) =>
          (edu.mainHeading || edu.schoolName) && (
            <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
              <p className="font-body text-ink/40 text-xs pt-1">{edu.date}</p>
              <div>
                {edu.schoolName && (
                  <h3 className="font-display font-semibold text-ink text-base">
                    {edu.schoolName}
                  </h3>
                )}
                {edu.mainHeading && (
                  <p className="font-body text-ink/60 text-sm">{edu.mainHeading}</p>
                )}
              </div>
            </div>
          )
      )}
    </div>
  </section>
);

const CertificationsSection = ({ data }) => {
  if (!data.certifications?.some((c) => c.mainHeading)) return null;
  return (
    <section className="mb-10">
      <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
        Certifications &amp; Achievements
      </h2>
      <div className="divide-y divide-ink/10">
        {data.certifications.map(
          (cert, i) =>
            cert.mainHeading && (
              <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
                <p className="font-body text-ink/40 text-xs pt-1">{cert.date}</p>
                <div>
                  <h3 className="font-display font-semibold text-ink text-base">
                    {cert.mainHeading}
                  </h3>
                  {cert.issuer && (
                    <p className="font-body text-ink/60 text-sm">{cert.issuer}</p>
                  )}
                </div>
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

const CorporateTemplate = ({ data, imageUrl }) => {
  const displayImageUrl = useCroppedPhoto(imageUrl);
  return (
    <div className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="grid sm:grid-cols-[1fr_260px]">
        <div className="flex items-center gap-5 px-10 py-8">
          {imageUrl && (
            <img
              src={displayImageUrl}
              className="w-16 h-16 rounded-lg object-cover"
              alt="profile"
            />
          )}
          <div>
            <h1 className="font-display font-bold text-ink text-2xl">
              {data.name || "Your Name"}
            </h1>
            <p className="font-body text-ink/50 text-sm mt-0.5">
              {data.designation || "Your Role"}
            </p>
            <ContactLine
              contact={data.contact}
              className="font-body text-xs text-ink/50 mt-1.5"
              separatorClassName="mx-2 text-ink/25"
              linkClassName="hover:text-jade-600 transition-colors"
            />
          </div>
        </div>
        <div className="bg-jade-50 px-8 py-8">
          <SidebarList title="Skills" items={data.rightSidebar?.skills} />
          <SidebarList title="Tools" items={data.rightSidebar?.tools} />
          <SidebarList title="Languages/Frameworks" items={data.rightSidebar?.languages} />
        </div>
      </div>

      <div className="px-10 py-10">
        {(data.sectionOrder?.length ? data.sectionOrder : DEFAULT_SECTION_ORDER).map(
          (key) => {
            const SectionComponent = SECTION_COMPONENTS[key];
            return SectionComponent ? (
              <SectionComponent key={key} data={data} />
            ) : null;
          }
        )}
      </div>
    </div>
  );
};

export default CorporateTemplate;
