import { useMemo, useState, useRef, useLayoutEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeForm from "../components/form/ResumeForm";
import { getTemplate } from "../templates";
import { useSEO } from "../hooks/useSEO";

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

  useSEO({
    title: `Build Your Resume with the ${template.name} Template | resumebuilder`,
    description:
      "Fill in a simple form, watch your resume update live, then export a polished PDF in one click. Free, no sign-up required.",
    path: "/builder",
  });

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
      backgroundColor: "#ffffff", // html2canvas's own background auto-detection is unreliable
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
    <div className="bg-surface min-h-screen overflow-x-hidden">
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

      {/* Resume Preview shown to the user — zoomed to fit the screen */}
      <div className="flex justify-center px-6 pb-16">
        <div ref={previewWrapperRef} className="w-full max-w-4xl">
          <div style={{ width: PREVIEW_NATIVE_WIDTH, zoom: scale }}>
            <Template data={resumeData} imageUrl={imageUrl} />
          </div>
        </div>
      </div>

      {/*
        Hidden copy rendered at native width for html2canvas to capture.
        html2canvas doesn't understand the non-standard `zoom` property used
        above to fit the preview to the screen, so PDF export always reads
        from this untouched, full-size copy instead of the visible one. Kept
        in normal document flow (not pushed off-screen with a large negative
        offset) and clipped via a zero-height ancestor — html2canvas's region
        capture gets unreliable when the source element sits far outside its
        rendering viewport.
      */}
      <div className="h-0 overflow-hidden" aria-hidden="true">
        <div ref={resumeRef} style={{ width: PREVIEW_NATIVE_WIDTH }}>
          <Template data={resumeData} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Builder;
