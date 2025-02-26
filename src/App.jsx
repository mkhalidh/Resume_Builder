import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import html2pdf from "html2pdf.js"; // Alternative approach
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";
import ResumeForm from "./components/form/ResumeForm";

const App = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    designation: "",
    image: null,
    experiences: [
      { mainHeading: "", companyName: "", date: "", description: "" },
    ],
    education: [{ mainHeading: "", schoolName: "", date: "" }],
    rightSidebar: { skills: [""], tools: [""], languages: [""] },
  });

  const resumeRef = useRef(); // Reference to the resume container

  const handleFormSubmit = (values) => {
    setResumeData(values);
  };

  const handleDownload = () => {
    const input = resumeRef.current;

    // Force the container to render at full size
    html2canvas(input, {
      scale: window.devicePixelRatio, // Improves resolution
      useCORS: true,
      logging: false,
      scrollX: 0, // Prevents unwanted horizontal scroll issues
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth, // Captures full width
      windowHeight: document.documentElement.scrollHeight, // Captures full height
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
    <div className="App   ">
      <div className=" flex flex-col justify-center items-center">
        <div className=" flex justify-center items-center gap-3">
          <img src="/resume.jpeg" className="w-[50px] h-[50px]" alt="" />
          <h1 className=" flex text-5xl poppins-extrabold my-6 text-[#423306]">
            Resume Builder
          </h1>
        </div>
        <div className="p-4  flex  w-[80%]   items-center">
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>
      </div>
      {/* 🔹 Download Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={handleDownload}
          className="bg-[#eab308] text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-[#715a12]"
        >
          Download Resume
        </button>
      </div>

      {/* Resume Preview (Captured for PDF) */}
      <div ref={resumeRef} className="p-4 bg-white shadow-md overflow-hidden">
        <Navbar
          name={resumeData.name}
          designation={resumeData.designation}
          image={
            resumeData.image
              ? URL.createObjectURL(resumeData.image)
              : "/photo.png"
          }
        />
        <div className="flex justify-between">
          <Main data={resumeData} />
          <RightSidebar data={resumeData.rightSidebar} />
        </div>
      </div>
    </div>
  );
};

export default App;
