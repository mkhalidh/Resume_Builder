import { useNavigate } from "react-router-dom";
import { templates } from "../templates";
import { sampleResumeData } from "../templates/sampleData";

const PREVIEW_WIDTH = 900;
const PREVIEW_SCALE = 0.31;

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-display font-extrabold text-ink text-3xl md:text-4xl mb-3">
            Pick a template to start
          </h1>
          <p className="font-body text-ink/60 max-w-md mx-auto">
            Every template uses the same live-preview and one-click PDF
            export. Switch anytime before you download.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map(({ id, name, description, component: Template }) => (
            <div
              key={id}
              className="bg-white rounded-2xl border border-black/5 overflow-hidden flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-surface pointer-events-none">
                <div
                  style={{
                    width: PREVIEW_WIDTH,
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: "top left",
                  }}
                >
                  <Template data={sampleResumeData} imageUrl="/photo.png" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-ink text-lg mb-1">
                  {name}
                </h3>
                <p className="font-body text-ink/60 text-sm mb-6 flex-1">
                  {description}
                </p>
                <button
                  onClick={() => navigate(`/builder?template=${id}`)}
                  className="font-body font-semibold bg-jade text-white px-5 py-3 rounded-full hover:bg-jade/90 transition-colors"
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
