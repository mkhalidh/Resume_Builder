import { useCroppedPhoto } from "../hooks/useCroppedPhoto";

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
