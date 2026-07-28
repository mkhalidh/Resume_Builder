import { useCroppedPhoto } from "../hooks/useCroppedPhoto";

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
          </div>
        </div>
        <div className="bg-jade-50 px-8 py-8">
          <SidebarList title="Skills" items={data.rightSidebar?.skills} />
          <SidebarList title="Tools" items={data.rightSidebar?.tools} />
          <SidebarList title="Languages" items={data.rightSidebar?.languages} />
        </div>
      </div>

      <div className="px-10 py-10">
        <section className="mb-10">
          <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
            Experience
          </h2>
          <div className="divide-y divide-ink/10">
            {data.experiences?.map(
              (exp, i) =>
                (exp.mainHeading || exp.companyName) && (
                  <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
                    <p className="font-body text-ink/40 text-xs pt-1">
                      {exp.date}
                    </p>
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

        <section className="mb-10">
          <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
            Projects
          </h2>
          <div className="divide-y divide-ink/10">
            {data.projects?.map(
              (project, i) =>
                project.mainHeading && (
                  <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
                    <p className="font-body text-ink/40 text-xs pt-1">
                      {project.date}
                    </p>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-base">
                        {project.mainHeading}
                      </h3>
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

        <section>
          <h2 className="font-display font-bold text-ink text-sm uppercase tracking-widest border-b-2 border-ink pb-2 mb-6">
            Education
          </h2>
          <div className="divide-y divide-ink/10">
            {data.education?.map(
              (edu, i) =>
                (edu.mainHeading || edu.schoolName) && (
                  <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-5 first:pt-0">
                    <p className="font-body text-ink/40 text-xs pt-1">
                      {edu.date}
                    </p>
                    <div>
                      {edu.schoolName && (
                        <h3 className="font-display font-semibold text-ink text-base">
                          {edu.schoolName}
                        </h3>
                      )}
                      {edu.mainHeading && (
                        <p className="font-body text-ink/60 text-sm">
                          {edu.mainHeading}
                        </p>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CorporateTemplate;
