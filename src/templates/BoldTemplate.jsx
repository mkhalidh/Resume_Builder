const BoldTemplate = ({ data, imageUrl }) => {
  const { skills, tools, languages } = data.rightSidebar || {};

  return (
    <div className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="bg-coral px-12 pt-12 pb-16">
        <h1 className="font-display font-extrabold text-white text-4xl tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="font-body text-white/80 text-sm uppercase tracking-widest mt-2">
          {data.designation || "Your Role"}
        </p>
      </div>

      <div className="px-12">
        {imageUrl && (
          <img
            src={imageUrl}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg -mt-12 mb-8"
            alt="profile"
          />
        )}

        <div className="grid sm:grid-cols-[1fr_240px] gap-10 pb-12">
          <div>
            <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
              Experience
            </h2>
            <div className="space-y-6 mb-10">
              {data.experiences?.map(
                (exp, i) =>
                  (exp.mainHeading || exp.companyName) && (
                    <div key={i} className="bg-surface rounded-xl p-5">
                      <div className="flex items-baseline justify-between mb-1">
                        {exp.mainHeading && (
                          <h3 className="font-display font-semibold text-ink text-base">
                            {exp.mainHeading}
                          </h3>
                        )}
                        {exp.date && (
                          <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                            {exp.date}
                          </span>
                        )}
                      </div>
                      {exp.companyName && (
                        <p className="font-body text-coral text-sm mb-2">
                          {exp.companyName}
                        </p>
                      )}
                      {exp.description && (
                        <p className="font-body text-ink/70 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>

            <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
              Projects
            </h2>
            <div className="space-y-6 mb-10">
              {data.projects?.map(
                (project, i) =>
                  project.mainHeading && (
                    <div key={i} className="bg-surface rounded-xl p-5">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-ink text-base">
                          {project.mainHeading}
                        </h3>
                        {project.date && (
                          <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                            {project.date}
                          </span>
                        )}
                      </div>
                      {project.description && (
                        <p className="font-body text-ink/70 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>

            <h2 className="font-display font-bold text-coral text-sm uppercase tracking-widest mb-5">
              Education
            </h2>
            <div className="space-y-4">
              {data.education?.map(
                (edu, i) =>
                  (edu.mainHeading || edu.schoolName) && (
                    <div key={i} className="flex items-baseline justify-between">
                      <div>
                        {edu.schoolName && (
                          <h3 className="font-display font-semibold text-ink text-sm">
                            {edu.schoolName}
                          </h3>
                        )}
                        {edu.mainHeading && (
                          <p className="font-body text-ink/60 text-sm">
                            {edu.mainHeading}
                          </p>
                        )}
                      </div>
                      {edu.date && (
                        <span className="font-body text-ink/40 text-xs whitespace-nowrap ml-3">
                          {edu.date}
                        </span>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="space-y-8">
            {[
              { label: "Skills", items: skills, color: "bg-coral" },
              { label: "Tools", items: tools, color: "bg-gold" },
              { label: "Languages", items: languages, color: "bg-violet" },
            ].map(
              ({ label, items, color }) =>
                items?.some(Boolean) && (
                  <div key={label}>
                    <h3 className="font-display font-bold text-ink text-xs uppercase tracking-widest mb-3">
                      {label}
                    </h3>
                    <ul className="space-y-2">
                      {items.filter(Boolean).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 font-body text-sm text-ink/70"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldTemplate;
