import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const inputClass =
  "w-full px-4 py-3 border border-black/10 rounded-xl font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-jade-50 focus:border-jade transition-colors";
const errorClass = "text-coral text-xs mt-1 font-body";
const sectionTitleClass = "font-display font-semibold text-ink text-xl mb-4";
const addButtonClass =
  "font-body text-sm font-semibold text-jade border border-jade/30 rounded-full px-5 py-2.5 hover:bg-jade-50 transition-colors";
const removeButtonClass =
  "absolute top-3 right-3 font-body text-xs font-medium text-coral hover:underline";
const entryClass =
  "relative space-y-3 p-5 rounded-xl bg-surface border border-black/5 mb-4";

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
    projects: Yup.array().of(
      Yup.object({
        mainHeading: Yup.string().required("Project Name is required"),
        date: Yup.string(),
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

  return (
    <Formik
      initialValues={{
        name: "",
        designation: "",
        image: null,
        experiences: [
          { mainHeading: "", companyName: "", date: "", description: "" },
        ],
        projects: [{ mainHeading: "", date: "", description: "" }],
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
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10 space-y-10">
          {/* Name and Designation Section */}
          <div>
            <h2 className={sectionTitleClass}>Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Field name="name" placeholder="Full Name" className={inputClass} />
                {errors.name && touched.name && (
                  <div className={errorClass}>{errors.name}</div>
                )}
              </div>
              <div>
                <Field
                  name="designation"
                  placeholder="Designation"
                  className={inputClass}
                />
                {errors.designation && touched.designation && (
                  <div className={errorClass}>{errors.designation}</div>
                )}
              </div>
            </div>

            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <span className="font-body text-sm font-medium text-jade bg-jade-50 px-4 py-2.5 rounded-full hover:bg-jade/10 transition-colors">
                Upload photo
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
              />
              <span className="font-body text-xs text-ink/40">
                {values.image ? values.image.name : "No file chosen"}
              </span>
            </label>
            {errors.image && touched.image && (
              <div className={errorClass}>{errors.image}</div>
            )}
          </div>

          {/* Experience Section */}
          <div>
            <h2 className={sectionTitleClass}>Experience</h2>
            <FieldArray name="experiences">
              {({ push, remove }) => (
                <div>
                  {values.experiences.map((_, index) => (
                    <div key={index} className={entryClass}>
                      {values.experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={removeButtonClass}
                        >
                          Remove
                        </button>
                      )}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field
                          name={`experiences[${index}].mainHeading`}
                          placeholder="Job Title"
                          className={inputClass}
                        />
                        <Field
                          name={`experiences[${index}].companyName`}
                          placeholder="Company Name"
                          className={inputClass}
                        />
                      </div>
                      {errors.experiences?.[index]?.mainHeading &&
                        touched.experiences?.[index]?.mainHeading && (
                          <div className={errorClass}>
                            {errors.experiences[index].mainHeading}
                          </div>
                        )}
                      <Field
                        name={`experiences[${index}].date`}
                        placeholder="Date"
                        className={inputClass}
                      />
                      <Field
                        as="textarea"
                        rows={3}
                        name={`experiences[${index}].description`}
                        placeholder="Description"
                        className={inputClass}
                      />
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
                      className={addButtonClass}
                    >
                      Add Experience
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Projects Section */}
          <div>
            <h2 className={sectionTitleClass}>Projects</h2>
            <FieldArray name="projects">
              {({ push, remove }) => (
                <div>
                  {values.projects.map((_, index) => (
                    <div key={index} className={entryClass}>
                      {values.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={removeButtonClass}
                        >
                          Remove
                        </button>
                      )}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field
                          name={`projects[${index}].mainHeading`}
                          placeholder="Project Name"
                          className={inputClass}
                        />
                        <Field
                          name={`projects[${index}].date`}
                          placeholder="Date"
                          className={inputClass}
                        />
                      </div>
                      {errors.projects?.[index]?.mainHeading &&
                        touched.projects?.[index]?.mainHeading && (
                          <div className={errorClass}>
                            {errors.projects[index].mainHeading}
                          </div>
                        )}
                      <Field
                        as="textarea"
                        rows={3}
                        name={`projects[${index}].description`}
                        placeholder="Description"
                        className={inputClass}
                      />
                    </div>
                  ))}
                  {values.projects.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({ mainHeading: "", date: "", description: "" })
                      }
                      className={addButtonClass}
                    >
                      Add Project
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Education Section */}
          <div>
            <h2 className={sectionTitleClass}>Education</h2>
            <FieldArray name="education">
              {({ push, remove }) => (
                <div>
                  {values.education.map((_, index) => (
                    <div key={index} className={entryClass}>
                      {values.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={removeButtonClass}
                        >
                          Remove
                        </button>
                      )}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field
                          name={`education[${index}].mainHeading`}
                          placeholder="Degree"
                          className={inputClass}
                        />
                        <Field
                          name={`education[${index}].schoolName`}
                          placeholder="School Name"
                          className={inputClass}
                        />
                      </div>
                      <Field
                        name={`education[${index}].date`}
                        placeholder="Date"
                        className={inputClass}
                      />
                    </div>
                  ))}
                  {values.education.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({ mainHeading: "", schoolName: "", date: "" })
                      }
                      className={addButtonClass}
                    >
                      Add Education
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Skills / Tools / Languages Sections */}
          {[
            { key: "skills", label: "Skills", placeholder: "Skill" },
            { key: "tools", label: "Tools", placeholder: "Tool" },
            { key: "languages", label: "Languages", placeholder: "Language" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <h2 className={sectionTitleClass}>{label}</h2>
              <FieldArray name={`rightSidebar.${key}`}>
                {({ push, remove }) => (
                  <div>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {values.rightSidebar[key].map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Field
                            name={`rightSidebar.${key}[${index}]`}
                            placeholder={placeholder}
                            className={`${inputClass} w-40`}
                          />
                          {values.rightSidebar[key].length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="font-body text-xs font-medium text-coral hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {values.rightSidebar[key].length < 10 && (
                      <button
                        type="button"
                        onClick={() => push("")}
                        className={addButtonClass}
                      >
                        Add {label.slice(0, -1)}
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-body font-semibold bg-jade text-white px-8 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
          >
            Update Preview
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResumeForm;
