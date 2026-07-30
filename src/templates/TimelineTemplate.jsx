import { useCroppedPhoto } from "../hooks/useCroppedPhoto";
import { ContactLine } from "../components/ContactLine";
import { ProjectLinkBadge } from "../components/ProjectLinkBadge";

const DEFAULT_SECTION_ORDER = ["experience", "projects", "education", "certifications"];

const TimelineSection = ({ title, items, renderItem }) => {
  const filtered = items?.filter((item) => item.mainHeading || item.schoolName || item.companyName);
  if (!filtered?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest mb-6">
        {title}
      </h2>
      <div className="relative pl-6 border-l-2 border-jade-100 space-y-8">
        {filtered.map((item, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-jade border-2 border-white ring-2 ring-jade-100" />
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
};

const TagGroup = ({ label, items }) => {
  const list = items?.filter(Boolean);
  if (!list?.length) return null;
  return (
    <div className="mb-5 last:mb-0 text-center">
      <p className="font-body text-[10px] uppercase tracking-widest text-ink/40 mb-2.5">
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {list.map((tag, i) => (
          <span
            key={i}
            className="inline-block font-body text-xs text-jade bg-jade-50 rounded-full px-3 h-7 leading-7"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const TimelineTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar || {};
  const hasTags = [skills, tools, languages].some((group) =>
    group?.some(Boolean)
  );
  const displayImageUrl = useCroppedPhoto(imageUrl);

  return (
    <div className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden px-12 py-12 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        {imageUrl && (
          <img
            src={displayImageUrl}
            className="w-20 h-20 rounded-full object-cover mb-4"
            alt="profile"
          />
        )}
        <h1 className="font-display font-bold text-ink text-3xl">
          {data.name || "Your Name"}
        </h1>
        <p className="font-body text-jade text-sm uppercase tracking-widest mt-1">
          {data.designation || "Your Role"}
        </p>
        <ContactLine
          contact={data.contact}
          className="font-body text-xs text-ink/60 mt-2"
          separatorClassName="mx-2 text-ink/30"
          linkClassName="hover:text-jade transition-colors"
        />
      </div>

      {(data.sectionOrder?.length ? data.sectionOrder : DEFAULT_SECTION_ORDER).map(
        (key) => {
          if (key === "experience") {
            return (
              <TimelineSection
                key={key}
                title="Experience"
                items={data.experiences}
                renderItem={(exp) => (
                  <>
                    {exp.date && (
                      <p className="font-body text-ink/40 text-xs mb-1">{exp.date}</p>
                    )}
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
                  </>
                )}
              />
            );
          }
          if (key === "projects") {
            return (
              <TimelineSection
                key={key}
                title="Projects"
                items={data.projects}
                renderItem={(project) => (
                  <>
                    {project.date && (
                      <p className="font-body text-ink/40 text-xs mb-1">
                        {project.date}
                      </p>
                    )}
                    {project.mainHeading && (
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-ink text-base">
                          {project.mainHeading}
                        </h3>
                        <ProjectLinkBadge href={project.link} className="text-jade" />
                      </div>
                    )}
                    {project.description && (
                      <p className="font-body text-ink/70 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </>
                )}
              />
            );
          }
          if (key === "education") {
            return (
              <TimelineSection
                key={key}
                title="Education"
                items={data.education}
                renderItem={(edu) => (
                  <>
                    {edu.date && (
                      <p className="font-body text-ink/40 text-xs mb-1">{edu.date}</p>
                    )}
                    {edu.schoolName && (
                      <h3 className="font-display font-semibold text-ink text-base">
                        {edu.schoolName}
                      </h3>
                    )}
                    {edu.mainHeading && (
                      <p className="font-body text-ink/60 text-sm">{edu.mainHeading}</p>
                    )}
                  </>
                )}
              />
            );
          }
          if (key === "certifications") {
            return (
              <TimelineSection
                key={key}
                title="Certifications & Achievements"
                items={data.certifications}
                renderItem={(cert) => (
                  <>
                    {cert.date && (
                      <p className="font-body text-ink/40 text-xs mb-1">{cert.date}</p>
                    )}
                    {cert.mainHeading && (
                      <h3 className="font-display font-semibold text-ink text-base">
                        {cert.mainHeading}
                      </h3>
                    )}
                    {cert.issuer && (
                      <p className="font-body text-ink/60 text-sm">{cert.issuer}</p>
                    )}
                  </>
                )}
              />
            );
          }
          return null;
        }
      )}

      {hasTags && (
        <section>
          <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest mb-5 text-center">
            Skills &amp; Languages
          </h2>
          <TagGroup label="Skills" items={skills} />
          <TagGroup label="Tools" items={tools} />
          <TagGroup label="Languages" items={languages} />
        </section>
      )}
    </div>
  );
};

export default TimelineTemplate;
