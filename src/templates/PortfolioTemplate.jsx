import { useCroppedPhoto } from "../hooks/useCroppedPhoto";

const SidebarBlock = ({ title, items }) => {
  const list = items?.filter(Boolean);
  if (!list?.length) return null;
  return (
    <div className="mb-8">
      <h3 className="text-white/40 text-[10px] font-body font-semibold tracking-[0.2em] uppercase mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {list.map((item, i) => (
          <span
            key={i}
            className="inline-block font-body text-[11px] text-white/80 bg-white/8 border border-white/10 rounded-full px-2.5 h-6 leading-6"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const PortfolioTemplate = ({ data, imageUrl }) => {
  const displayImageUrl = useCroppedPhoto(imageUrl);
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Sidebar */}
      <div className="md:w-[240px] bg-[#232339] px-7 py-10 shrink-0">
        {imageUrl && (
          <img
            src={displayImageUrl}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/15 mb-5"
            alt="profile"
          />
        )}
        <h1 className="font-display font-semibold text-white text-xl leading-tight mb-1">
          {data.name || "Your Name"}
        </h1>
        <p className="font-body text-sm text-violet mb-8">
          {data.designation || "Your Role"}
        </p>

        <SidebarBlock title="Skills" items={data.rightSidebar?.skills} />
        <SidebarBlock title="Tools" items={data.rightSidebar?.tools} />
        <SidebarBlock title="Languages" items={data.rightSidebar?.languages} />
      </div>

      {/* Main */}
      <div className="flex-1 bg-[#2E2E48] px-9 py-10">
        <section className="mb-10">
          <h2 className="font-display font-semibold text-white/90 text-sm tracking-[0.15em] uppercase mb-6">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experiences?.map(
              (exp, i) =>
                (exp.mainHeading || exp.companyName) && (
                  <div
                    key={i}
                    className="pl-4 border-l-2 border-white/10 relative"
                  >
                    <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-violet" />
                    {exp.date && (
                      <p className="font-body text-[10px] uppercase tracking-wider text-white/35 mb-1">
                        {exp.date}
                      </p>
                    )}
                    {exp.mainHeading && (
                      <h3 className="font-display font-medium text-white text-sm">
                        {exp.mainHeading}
                      </h3>
                    )}
                    {exp.companyName && (
                      <p className="font-body text-xs text-violet mb-1.5">
                        {exp.companyName}
                      </p>
                    )}
                    {exp.description && (
                      <p className="font-body text-xs leading-relaxed text-white/60">
                        {exp.description}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-white/90 text-sm tracking-[0.15em] uppercase mb-6">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects?.map(
              (project, i) =>
                project.mainHeading && (
                  <div
                    key={i}
                    className="pl-4 border-l-2 border-white/10 relative"
                  >
                    <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-jade" />
                    {project.date && (
                      <p className="font-body text-[10px] uppercase tracking-wider text-white/35 mb-1">
                        {project.date}
                      </p>
                    )}
                    <h3 className="font-display font-medium text-white text-sm">
                      {project.mainHeading}
                    </h3>
                    {project.description && (
                      <p className="font-body text-xs leading-relaxed text-white/60 mt-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </section>

        <section>
          <h2 className="font-display font-semibold text-white/90 text-sm tracking-[0.15em] uppercase mb-6">
            Education
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.education?.map(
              (edu, i) =>
                (edu.mainHeading || edu.schoolName) && (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    {edu.schoolName && (
                      <h3 className="font-display font-medium text-white text-sm mb-0.5">
                        {edu.schoolName}
                      </h3>
                    )}
                    {edu.mainHeading && (
                      <p className="font-body text-xs text-white/60 mb-1">
                        {edu.mainHeading}
                      </p>
                    )}
                    {edu.date && (
                      <p className="font-body text-[10px] uppercase tracking-wider text-white/35">
                        {edu.date}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioTemplate;
