import { useCroppedPhoto } from "../hooks/useCroppedPhoto";

const SectionLabel = ({ label, number, dark }) => (
  <div
    className={`flex items-center justify-between pb-2 mb-4 border-b ${
      dark ? "border-white/15" : "border-ink/15"
    }`}
  >
    <span
      className={`font-display text-[11px] font-semibold tracking-[0.2em] uppercase ${
        dark ? "text-white/90" : "text-ink/80"
      }`}
    >
      {label}
    </span>
    <span
      className={`font-display text-[11px] tracking-[0.1em] ${
        dark ? "text-white/40" : "text-ink/35"
      }`}
    >
      {number}
    </span>
  </div>
);

const TagList = ({ items, dark }) => {
  const list = items?.filter(Boolean);
  if (!list?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((item, i) => (
        <span
          key={i}
          className={`inline-block font-body text-xs px-3 h-7 leading-7 rounded-full border ${
            dark
              ? "border-white/15 text-white/75"
              : "border-ink/15 text-ink/75"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const EditorialBase = ({ data, imageUrl, dark }) => {
  const bg = dark ? "bg-[#1B1B1B]" : "bg-[#F2EBE4]";
  const heading = dark ? "text-white" : "text-ink";
  const muted = dark ? "text-white/50" : "text-ink/50";
  const body = dark ? "text-white/75" : "text-ink/75";
  const displayImageUrl = useCroppedPhoto(imageUrl);

  return (
    <div className={`${bg} px-10 py-12 md:px-16 md:py-16`}>
      <div className="flex items-center gap-5 mb-12">
        {imageUrl && (
          <img
            src={displayImageUrl}
            alt="profile"
            className={`w-16 h-16 rounded-full object-cover border-2 ${
              dark ? "border-white/20" : "border-ink/15"
            }`}
          />
        )}
        <h1
          className={`font-display font-semibold ${heading} text-2xl md:text-4xl leading-tight`}
        >
          {data.name || "Your Name"}
          {data.designation && (
            <>
              <span className={muted}>, </span>
              {data.designation}
            </>
          )}
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-10">
          <div>
            <SectionLabel label="Experience" number="01" dark={dark} />
            <div className="space-y-6">
              {data.experiences?.map(
                (exp, i) =>
                  (exp.mainHeading || exp.companyName) && (
                    <div key={i}>
                      {exp.date && (
                        <p
                          className={`font-body text-[10px] uppercase tracking-wider ${muted} mb-1`}
                        >
                          {exp.date}
                        </p>
                      )}
                      {exp.mainHeading && (
                        <h3
                          className={`font-display font-medium ${heading} text-sm mb-0.5`}
                        >
                          {exp.mainHeading}
                        </h3>
                      )}
                      {exp.companyName && (
                        <p className={`font-body text-xs ${muted} mb-2`}>
                          {exp.companyName}
                        </p>
                      )}
                      {exp.description && (
                        <p className={`font-body text-xs leading-relaxed ${body}`}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>

          {data.projects?.some((p) => p.mainHeading) && (
            <div>
              <SectionLabel label="Projects" number="02" dark={dark} />
              <div className="space-y-6">
                {data.projects.map(
                  (project, i) =>
                    project.mainHeading && (
                      <div key={i}>
                        {project.date && (
                          <p
                            className={`font-body text-[10px] uppercase tracking-wider ${muted} mb-1`}
                          >
                            {project.date}
                          </p>
                        )}
                        <h3
                          className={`font-display font-medium ${heading} text-sm mb-0.5`}
                        >
                          {project.mainHeading}
                        </h3>
                        {project.description && (
                          <p className={`font-body text-xs leading-relaxed ${body}`}>
                            {project.description}
                          </p>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          <div>
            <SectionLabel label="Education" number="03" dark={dark} />
            <div className="space-y-4">
              {data.education?.map(
                (edu, i) =>
                  (edu.mainHeading || edu.schoolName) && (
                    <div key={i}>
                      {edu.date && (
                        <p
                          className={`font-body text-[10px] uppercase tracking-wider ${muted} mb-1`}
                        >
                          {edu.date}
                        </p>
                      )}
                      {edu.schoolName && (
                        <h3
                          className={`font-display font-medium ${heading} text-sm`}
                        >
                          {edu.schoolName}
                        </h3>
                      )}
                      {edu.mainHeading && (
                        <p className={`font-body text-xs ${muted}`}>
                          {edu.mainHeading}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <SectionLabel label="Skills" number="04" dark={dark} />
            <TagList items={data.rightSidebar?.skills} dark={dark} />
          </div>
          <div>
            <SectionLabel label="Tools" number="05" dark={dark} />
            <TagList items={data.rightSidebar?.tools} dark={dark} />
          </div>
          <div>
            <SectionLabel label="Languages" number="06" dark={dark} />
            <TagList items={data.rightSidebar?.languages} dark={dark} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditorialDarkTemplate = (props) => (
  <EditorialBase {...props} dark />
);

export const EditorialLightTemplate = (props) => (
  <EditorialBase {...props} dark={false} />
);
