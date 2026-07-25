import { sampleResumeData } from "../templates/sampleData";

const TemplatePreview = ({ Template, width = 900, scale = 0.31 }) => (
  <div
    style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}
  >
    <Template data={sampleResumeData} imageUrl="/photo.png" />
  </div>
);

export default TemplatePreview;
