import { useMemo, useState, useRef, useLayoutEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeForm from "../components/form/ResumeForm";
import { getTemplate } from "../templates";

// Templates are built assuming a fixed desktop-width page (fixed sidebar/column
// widths in px), so on a narrow phone screen they'd otherwise just squish into
// whatever the viewport width is. Rendering at this native width and shrinking
// with CSS zoom (which — unlike transform: scale — affects layout, so the
// wrapper naturally collapses to the right size) keeps the exact same
// proportions as the desktop preview, just smaller.
const PREVIEW_NATIVE_WIDTH = 900;

const Builder = () => {
  const [searchParams] = useSearchParams();
  const template = getTemplate(searchParams.get("template"));
  const Template = template.component;

  const [resumeData, setResumeData] = useState({
    name: "",
    designation: "",
    image: null,
    experiences: [
      { mainHeading: "", companyName: "", date: "", description: "" },
    ],
    projects: [{ mainHeading: "", date: "", description: "" }],
    education: [{ mainHeading: "", schoolName: "", date: "" }],
    rightSidebar: { skills: [""], tools: [""], languages: [""] },
  });

  const resumeRef = useRef(); // Reference to the resume container
  const previewWrapperRef = useRef(); // Measures available width for scaling
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = previewWrapperRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      setScale(width > 0 ? Math.min(width / PREVIEW_NATIVE_WIDTH, 1) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imageUrl = useMemo(
    () =>
      resumeData.image ? URL.createObjectURL(resumeData.image) : "/photo.png",
    [resumeData.image]
  );

  const handleFormSubmit = (values) => {
    setResumeData(values);
  };

  const handleDownload = () => {
    const input = resumeRef.current;

    html2canvas(input, {
      scale: window.devicePixelRatio, // Improves resolution
      useCORS: true,
      logging: false,
      scrollX: 0, // Prevents unwanted horizontal scroll issues
      scrollY: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Adjusting PDF dimensions dynamically
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "p" : "l", // Auto-orientation
        unit: "mm",
        format: [imgWidth, imgHeight], // Dynamically set size
      });

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="bg-surface min-h-screen">
      <div className="flex flex-col justify-center items-center pt-14 pb-8 px-6">
        <p className="font-body text-jade text-sm font-medium mb-2">
          {template.name} template ·{" "}
          <Link to="/templates" className="underline hover:no-underline">
            change
          </Link>
        </p>
        <h1 className="font-display font-extrabold text-4xl text-ink mb-8">
          Build your resume
        </h1>
        <div className="w-full max-w-3xl">
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={handleDownload}
          className="font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
        >
          Download Resume
        </button>
      </div>

      {/* Resume Preview (Captured for PDF) */}
      <div className="flex justify-center px-6 pb-16">
        <div ref={previewWrapperRef} className="w-full max-w-4xl">
          <div style={{ width: PREVIEW_NATIVE_WIDTH, zoom: scale }}>
            <div ref={resumeRef}>
              <Template data={resumeData} imageUrl={imageUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
