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

const TimelineTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar || {};
  const tags = [...(skills || []), ...(tools || []), ...(languages || [])].filter(Boolean);

  return (
    <div className="bg-white shadow-md overflow-hidden px-12 py-12 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        {imageUrl && (
          <img
            src={imageUrl}
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
      </div>

      <TimelineSection
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

      <TimelineSection
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
              <h3 className="font-display font-semibold text-ink text-base">
                {project.mainHeading}
              </h3>
            )}
            {project.description && (
              <p className="font-body text-ink/70 text-sm leading-relaxed">
                {project.description}
              </p>
            )}
          </>
        )}
      />

      <TimelineSection
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

      {tags.length > 0 && (
        <section>
          <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest mb-5">
            Skills &amp; Languages
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="font-body text-xs text-jade bg-jade-50 rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TimelineTemplate;
