import { useNavigate } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { templates } from "../templates";
import TemplatePreview from "../components/TemplatePreview";

const trustPoints = ["Free forever", "No sign-up", "ATS-friendly"];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-jade-50 text-jade font-body text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free, Every Template
          </div>
          <h1 className="font-display font-extrabold text-ink text-3xl md:text-5xl mb-4">
            Resume Templates
          </h1>
          <p className="font-body text-ink/60 max-w-lg mx-auto mb-6">
            Pick a layout that fits your style, then customize every section
            with your own content. Every template uses the same live preview
            and one-click PDF export.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {trustPoints.map((point) => (
              <span
                key={point}
                className="flex items-center gap-1.5 font-body text-sm text-ink/60"
              >
                <Check className="w-4 h-4 text-jade shrink-0" strokeWidth={3} />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(({ id, name, description, component: Template }) => (
            <div key={id} className="bg-jade-50 rounded-3xl p-4">
              <div className="h-72 overflow-hidden bg-white rounded-2xl shadow-sm pointer-events-none">
                <TemplatePreview Template={Template} scale={0.36} />
              </div>
              <div className="pt-5 px-2 pb-2">
                <h3 className="font-display font-semibold text-ink text-lg mb-1">
                  {name}
                </h3>
                <p className="font-body text-ink/60 text-sm mb-5 leading-relaxed">
                  {description}
                </p>
                <button
                  onClick={() => navigate(`/builder?template=${id}`)}
                  className="w-full font-body font-semibold bg-jade text-white px-5 py-3 rounded-full hover:bg-jade/90 transition-colors"
                >
                  Use this template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
