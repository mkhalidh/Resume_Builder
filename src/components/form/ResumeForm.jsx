import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { jsPDF } from "jspdf";
const ResumeForm = ({ onSubmit }) => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    designation: Yup.string().required("Designation is required"),
    image: Yup.mixed().required("Image is required"),
    experiences: Yup.array().of(
      Yup.object({
        mainHeading: Yup.string().required("Job Title is required"),
        companyName: Yup.string().required("Company Name is required"),
        date: Yup.string().required("Date is required"),
        description: Yup.string().required("Description is required"),
      })
    ),
    education: Yup.array().of(
      Yup.object({
        mainHeading: Yup.string().required("Degree is required"),
        schoolName: Yup.string().required("School Name is required"),
        date: Yup.string().required("Date is required"),
      })
    ),
    rightSidebar: Yup.object({
      skills: Yup.array().of(Yup.string().required("Skill is required")),
      tools: Yup.array().of(Yup.string().required("Tool is required")),
      languages: Yup.array().of(Yup.string().required("Language is required")),
    }),
  });

  const handleDownload = (values) => {
    const doc = new jsPDF();

    // Add Name and Designation to the PDF
    doc.text(`Name: ${values.name}`, 20, 20);
    doc.text(`Designation: ${values.designation}`, 20, 30);

    // Add Experience to the PDF
    let yPosition = 40;
    doc.text("Experience:", 20, yPosition);
    values.experiences.forEach((exp, index) => {
      yPosition += 10;
      doc.text(`Job Title: ${exp.mainHeading}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Company: ${exp.companyName}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Date: ${exp.date}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Description: ${exp.description}`, 20, yPosition);
      yPosition += 20;
    });

    // Add Education to the PDF
    doc.text("Education:", 20, yPosition);
    values.education.forEach((edu, index) => {
      yPosition += 10;
      doc.text(`Degree: ${edu.mainHeading}`, 20, yPosition);
      yPosition += 10;
      doc.text(`School: ${edu.schoolName}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Date: ${edu.date}`, 20, yPosition);
      yPosition += 20;
    });

    // Add Skills, Tools, and Languages to the PDF (Similar to Education and Experience)
    doc.text("Skills:", 20, yPosition);
    values.rightSidebar.skills.forEach((skill, index) => {
      yPosition += 10;
      doc.text(skill, 20, yPosition);
    });

    yPosition += 20;
    doc.text("Tools:", 20, yPosition);
    values.rightSidebar.tools.forEach((tool, index) => {
      yPosition += 10;
      doc.text(tool, 20, yPosition);
    });

    yPosition += 20;
    doc.text("Languages:", 20, yPosition);
    values.rightSidebar.languages.forEach((lang, index) => {
      yPosition += 10;
      doc.text(lang, 20, yPosition);
    });

    // Save the PDF with a name
    doc.save("resume.pdf");
  };

  return (
    <Formik
      initialValues={{
        name: "",
        designation: "",
        image: null,
        experiences: [
          { mainHeading: "", companyName: "", date: "", description: "" },
        ],
        education: [{ mainHeading: "", schoolName: "", date: "" }],
        rightSidebar: {
          skills: [""],
          tools: [""],
          languages: [""],
        },
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="p-10 space-y-8 bg-white shadow-lg rounded-lg">
          {/* Name and Designation Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Personal Information</h2>
            <Field
              name="name"
              placeholder="Full Name"
              className="input px-5 py-3  border w-[40%] border-gray-400 rounded-md mb-4"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
            <Field
              name="designation"
              placeholder="Designation"
              className="input px-5 py-3 w-[40%] border ml-10 border-gray-400 rounded-md mb-4"
            />
            {errors.designation && touched.designation && (
              <div className="text-red-500 text-sm">{errors.designation}</div>
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-[50%] mb-4"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
            {errors.image && touched.image && (
              <div className="text-red-500 text-sm">{errors.image}</div>
            )}
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <FieldArray name="experiences">
              {({ push, remove }) => (
                <div>
                  {values.experiences.map((_, index) => (
                    <div key={index} className="space-y-4 mb-5">
                      <Field
                        name={`experiences[${index}].mainHeading`}
                        placeholder="Job Title"
                        className="input px-5 py-3 w-[40%] border mr-10 border-gray-400 rounded-md"
                      />
                      {errors.experiences?.[index]?.mainHeading &&
                        touched.experiences?.[index]?.mainHeading && (
                          <div className="text-red-500 text-sm">
                            {errors.experiences[index].mainHeading}
                          </div>
                        )}
                      <Field
                        name={`experiences[${index}].companyName`}
                        placeholder="Company Name"
                        className="input px-5 py-3 w-[40%] border border-gray-400 rounded-md"
                      />
                      <Field
                        name={`experiences[${index}].date`}
                        placeholder="Date"
                        className="input px-5 py-3 w-[40%] mr-10 border border-gray-400 rounded-md"
                      />
                      <Field
                        as="textarea"
                        name={`experiences[${index}].description`}
                        placeholder="Description"
                        className="input px-5 py-3 w-[85%] poppins-regular border border-gray-400 rounded-md mr-5"
                      />
                      <div></div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-[#a17c07] hover:bg-[#423306] text-white px-4 py-2 rounded-md"
                      >
                        Remove Experience
                      </button>
                    </div>
                  ))}
                  {values.experiences.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          mainHeading: "",
                          companyName: "",
                          date: "",
                          description: "",
                        })
                      }
                      className="bg-[#fdd147] hover:bg-[#ca9a04]  text-white px-4 py-2 rounded-md"
                    >
                      Add Experience
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Education</h2>
            <FieldArray name="education">
              {({ push, remove }) => (
                <div>
                  {values.education.map((_, index) => (
                    <div key={index} className="space-y-4  mb-5">
                      <Field
                        name={`education[${index}].mainHeading`}
                        placeholder="Degree"
                        className="input px-5 py-3 w-[40%] mr-10  border border-gray-400 rounded-md"
                      />
                      <Field
                        name={`education[${index}].schoolName`}
                        placeholder="School Name"
                        className="input px-5 py-3 w-[40%] border border-gray-400 rounded-md"
                      />
                      <Field
                        name={`education[${index}].date`}
                        placeholder="Date"
                        className="input px-5 py-3 w-[40%] mr-10 border border-gray-400 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-[#a17c07] hover:bg-[#423306] text-white px-4 py-2 rounded-md"
                      >
                        Remove Education
                      </button>
                    </div>
                  ))}
                  {values.education.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({ mainHeading: "", schoolName: "", date: "" })
                      }
                      className="bg-[#fdd147] hover:bg-[#ca9a04]   text-white px-4 py-2 rounded-md"
                    >
                      Add Education
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <FieldArray name="rightSidebar.skills">
              {({ push, remove }) => (
                <div>
                  {values.rightSidebar.skills.map((_, index) => (
                    <div key={index} className="space-y-4 mb-5 ">
                      <Field
                        name={`rightSidebar.skills[${index}]`}
                        placeholder="Skill"
                        className="input px-5 py-3 w-[40%] border mr-10 border-gray-400 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-[#a17c07] hover:bg-[#423306] text-white px-4 py-2 rounded-md"
                      >
                        Remove Skill
                      </button>
                    </div>
                  ))}
                  {values.rightSidebar.skills.length < 10 && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="bg-[#fdd147] hover:bg-[#ca9a04]    text-white px-4 py-2 rounded-md"
                    >
                      Add Skill
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Tools Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Tools</h2>
            <FieldArray name="rightSidebar.tools">
              {({ push, remove }) => (
                <div>
                  {values.rightSidebar.tools.map((_, index) => (
                    <div key={index} className="space-y-4 mb-5">
                      <Field
                        name={`rightSidebar.tools[${index}]`}
                        placeholder="Tool"
                        className="input px-5 py-3 w-[40%] border mr-10 border-gray-400 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-[#a17c07] hover:bg-[#423306] text-white px-4 py-2 rounded-md"
                      >
                        Remove Tool
                      </button>
                    </div>
                  ))}
                  {values.rightSidebar.tools.length < 10 && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="bg-[#fdd147] hover:bg-[#ca9a04]  text-white px-4 py-2 rounded-md"
                    >
                      Add Tool
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Languages Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Languages</h2>
            <FieldArray name="rightSidebar.languages">
              {({ push, remove }) => (
                <div>
                  {values.rightSidebar.languages.map((_, index) => (
                    <div key={index} className="space-y-4 mb-5">
                      <Field
                        name={`rightSidebar.languages[${index}]`}
                        placeholder="Language"
                        className="input px-5 py-3 w-[40%] mr-10 border border-gray-400 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-[#a17c07] hover:bg-[#423306] text-white px-4 py-2 rounded-md"
                      >
                        Remove Language
                      </button>
                    </div>
                  ))}
                  {values.rightSidebar.languages.length < 10 && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="bg-[#fdd147] hover:bg-[#ca9a04]   text-white px-4 py-2 rounded-md"
                    >
                      Add Language
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#fee28a] text-[#715a12] hover:bg-[#eab308]  px-6 py-3 rounded-md mt-6 w-[50%]"
          >
            Submit
          </button>

          {/* {!isSubmitting && (
            <button
              type="button"
              onClick={() => handleDownload(values)}
              className="bg-green-500 text-white p-2 mt-5"
            >
              Download Resume as PDF
            </button>
          )} */}
        </Form>
      )}
    </Formik>
  );
};

export default ResumeForm;
