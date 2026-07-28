import { useCroppedPhoto } from "../hooks/useCroppedPhoto";

const ListBlock = ({ title, items }) => {
  if (!items?.some((item) => item)) return null;
  return (
    <div className="mb-8">
      <h3 className="text-jade text-xs font-body font-semibold tracking-widest uppercase mb-3">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map(
          (item, i) =>
            item && (
              <li key={i} className="text-white/80 text-sm font-body">
                {item}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

const ModernTemplate = ({ data, imageUrl }) => {
  const displayImageUrl = useCroppedPhoto(imageUrl);
  return (
    <div className="flex bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[280px] bg-ink px-8 py-10 shrink-0">
        <img
          src={displayImageUrl}
          className="w-24 h-24 rounded-full object-cover border-4 border-jade mb-6"
          alt="profile"
        />
        <h1 className="font-display font-bold text-white text-2xl leading-tight mb-1">
          {data.name || "Muhammad Khalid Hussain"}
        </h1>
        <p className="text-jade font-body text-sm mb-8">
          {data.designation || "Software Engineer"}
        </p>
        <ListBlock title="Skills" items={data.rightSidebar.skills} />
        <ListBlock title="Tools" items={data.rightSidebar.tools} />
        <ListBlock title="Languages" items={data.rightSidebar.languages} />
      </div>

      {/* Main */}
      <div className="flex-1 px-10 py-10">
        <section className="mb-10">
          <h2 className="font-display font-bold text-ink text-lg tracking-widest uppercase mb-6 pb-2 border-b-2 border-jade-50">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp, i) => (
              <div key={i} className="pl-4 border-l-2 border-jade-50">
                {exp.mainHeading && (
                  <h3 className="font-display font-semibold text-ink text-base">
                    {exp.mainHeading}
                  </h3>
                )}
                {exp.companyName && (
                  <p className="font-body text-jade text-sm">
                    {exp.companyName}
                  </p>
                )}
                {exp.date && (
                  <p className="font-body text-ink/40 text-xs mb-2">
                    {exp.date}
                  </p>
                )}
                {exp.description && (
                  <p className="font-body text-ink/70 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {data.projects?.some((p) => p.mainHeading) && (
          <section className="mb-10">
            <h2 className="font-display font-bold text-ink text-lg tracking-widest uppercase mb-6 pb-2 border-b-2 border-jade-50">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map(
                (project, i) =>
                  project.mainHeading && (
                    <div key={i} className="pl-4 border-l-2 border-jade-50">
                      <h3 className="font-display font-semibold text-ink text-base">
                        {project.mainHeading}
                      </h3>
                      {project.date && (
                        <p className="font-body text-ink/40 text-xs mb-2">
                          {project.date}
                        </p>
                      )}
                      {project.description && (
                        <p className="font-body text-ink/70 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display font-bold text-ink text-lg tracking-widest uppercase mb-6 pb-2 border-b-2 border-jade-50">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="pl-4 border-l-2 border-jade-50">
                {edu.mainHeading && (
                  <h3 className="font-display font-semibold text-ink text-base">
                    {edu.mainHeading}
                  </h3>
                )}
                {edu.schoolName && (
                  <p className="font-body text-jade text-sm">
                    {edu.schoolName}
                  </p>
                )}
                {edu.date && (
                  <p className="font-body text-ink/40 text-xs">{edu.date}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
