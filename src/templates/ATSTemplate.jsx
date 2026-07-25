const ATSTemplate = ({ data }) => {
  const { skills, tools, languages } = data.rightSidebar || {};
  const groups = [
    { label: "Skills", items: skills },
    { label: "Tools", items: tools },
    { label: "Languages", items: languages },
  ].filter((group) => group.items?.some(Boolean));

  return (
    <div className="bg-white px-12 py-10 font-body text-ink">
      <div className="border-b border-ink pb-4 mb-6">
        <h1 className="font-body font-bold text-xl">
          {data.name || "Your Name"}
        </h1>
        <p className="text-sm text-ink/70">{data.designation || "Your Role"}</p>
      </div>

      <section className="mb-6">
        <h2 className="font-body font-bold text-xs uppercase tracking-wide mb-3">
          Experience
        </h2>
        <div className="space-y-4">
          {data.experiences?.map(
            (exp, i) =>
              (exp.mainHeading || exp.companyName) && (
                <div key={i} className="text-sm leading-snug">
                  <p className="font-semibold">
                    {exp.mainHeading}
                    {exp.companyName ? ` — ${exp.companyName}` : ""}
                    {exp.date ? ` (${exp.date})` : ""}
                  </p>
                  {exp.description && (
                    <p className="text-ink/70 mt-0.5">{exp.description}</p>
                  )}
                </div>
              )
          )}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-body font-bold text-xs uppercase tracking-wide mb-3">
          Projects
        </h2>
        <div className="space-y-4">
          {data.projects?.map(
            (project, i) =>
              project.mainHeading && (
                <div key={i} className="text-sm leading-snug">
                  <p className="font-semibold">
                    {project.mainHeading}
                    {project.date ? ` (${project.date})` : ""}
                  </p>
                  {project.description && (
                    <p className="text-ink/70 mt-0.5">{project.description}</p>
                  )}
                </div>
              )
          )}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-body font-bold text-xs uppercase tracking-wide mb-3">
          Education
        </h2>
        <div className="space-y-2">
          {data.education?.map(
            (edu, i) =>
              (edu.mainHeading || edu.schoolName) && (
                <p key={i} className="text-sm">
                  <span className="font-semibold">{edu.schoolName}</span>
                  {edu.mainHeading ? ` — ${edu.mainHeading}` : ""}
                  {edu.date ? ` (${edu.date})` : ""}
                </p>
              )
          )}
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.label} className="mb-6 last:mb-0">
          <h2 className="font-body font-bold text-xs uppercase tracking-wide mb-3">
            {group.label}
          </h2>
          <p className="text-sm text-ink/80">
            {group.items.filter(Boolean).join(", ")}
          </p>
        </section>
      ))}
    </div>
  );
};

export default ATSTemplate;
