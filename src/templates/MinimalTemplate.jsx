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
            className="font-body text-xs text-ink/70 border border-ink/15 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const MinimalTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar;
  const hasTags = [skills, tools, languages].some((group) =>
    group?.some(Boolean)
  );

  return (
    <div className="bg-white shadow-md overflow-hidden px-12 py-12">
      <div className="flex items-center gap-6 mb-10 pb-8 border-b border-ink/10">
        <img
          src={imageUrl}
          className="w-20 h-20 rounded-full object-cover grayscale"
          alt="profile"
        />
        <div>
          <h1 className="font-display font-bold text-ink text-3xl tracking-tight">
            {data.name || "Muhammad Khalid Hussain"}
          </h1>
          <p className="font-body text-ink/50 uppercase tracking-widest text-xs mt-1">
            {data.designation || "Software Engineer"}
          </p>
        </div>
      </div>

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
                  <p className="font-body text-ink/60 text-sm">
                    {exp.companyName}
                  </p>
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

      {data.projects?.some((p) => p.mainHeading) && (
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
                      <h3 className="font-display font-semibold text-ink text-base">
                        {project.mainHeading}
                      </h3>
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
      )}

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
                  <p className="font-body text-ink/60 text-sm">
                    {edu.schoolName}
                  </p>
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

      {hasTags && (
        <section>
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-5">
            Skills &amp; Tools
          </h2>
          <TagGroup label="Skills" items={skills} />
          <TagGroup label="Tools" items={tools} />
          <TagGroup label="Languages" items={languages} />
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
