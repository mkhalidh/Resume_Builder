import { useRef } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { sampleResumeData } from "../../data/sampleResumeData";
import { stressTestResumeData } from "../../data/stressTestResumeData";

// The dev-only sample/stress-test data files predate the certifications and
// section-order fields and are intentionally left untouched — this fills in
// defaults for those two fields only when the fixture data doesn't have them,
// so `setValues(...)` below never leaves certifications/sectionOrder
// undefined (which would crash the Certifications FieldArray and the section
// order control, both of which call `.map` unconditionally).
const NEW_SECTION_DEFAULTS = {
  certifications: [{ mainHeading: "", issuer: "", date: "" }],
  sectionOrder: ["experience", "projects", "education", "certifications"],
};

const SECTION_LABELS = {
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications & Achievements",
};

// Native HTML5 drag-and-drop — no dependency needed for reordering 4 rows.
// Up/down arrows are a second, always-available way to reorder since HTML5
// drag-and-drop doesn't work on touch devices.
const SectionOrderControl = ({ order, onChange }) => {
  const dragIndex = useRef(null);

  const moveItem = (from, to) => {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {order.map((key, index) => (
        <div
          key={key}
          draggable
          onDragStart={(e) => {
            dragIndex.current = index;
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragIndex.current === null) return;
            moveItem(dragIndex.current, index);
            dragIndex.current = null;
          }}
          className="flex items-center gap-3 bg-surface border border-black/10 rounded-xl px-4 py-2.5"
        >
          <GripVertical className="w-4 h-4 text-ink/30 cursor-grab shrink-0" />
          <span className="flex-1 font-body text-sm text-ink">
            {SECTION_LABELS[key] || key}
          </span>
          <button
            type="button"
            onClick={() => moveItem(index, index - 1)}
            disabled={index === 0}
            className="text-ink/40 hover:text-jade disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={`Move ${SECTION_LABELS[key] || key} up`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => moveItem(index, index + 1)}
            disabled={index === order.length - 1}
            className="text-ink/40 hover:text-jade disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={`Move ${SECTION_LABELS[key] || key} down`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

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
    // No format validation (.email()/.url()) here on purpose — these fields
    // are optional, so a malformed entry should never block the whole form
    // from submitting (previously it silently did, which read as "nothing
    // works" since the resulting error text is easy to miss among the rest
    // of the form).
    contact: Yup.object({
      email: Yup.string().optional(),
      phone: Yup.string().optional(),
      linkedin: Yup.string().optional(),
      github: Yup.string().optional(),
    }),
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
        link: Yup.string().optional(),
      })
    ),
    education: Yup.array().of(
      Yup.object({
        mainHeading: Yup.string().required("Degree is required"),
        schoolName: Yup.string().required("School Name is required"),
        date: Yup.string().required("Date is required"),
      })
    ),
    certifications: Yup.array().of(
      Yup.object({
        mainHeading: Yup.string().optional(),
        issuer: Yup.string().optional(),
        date: Yup.string().optional(),
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
        contact: { email: "", phone: "", linkedin: "", github: "" },
        experiences: [
          { mainHeading: "", companyName: "", date: "", description: "" },
        ],
        projects: [{ mainHeading: "", date: "", description: "", link: "" }],
        education: [{ mainHeading: "", schoolName: "", date: "" }],
        certifications: [{ mainHeading: "", issuer: "", date: "" }],
        sectionOrder: ["experience", "projects", "education", "certifications"],
        rightSidebar: {
          skills: [""],
          tools: [""],
          languages: [""],
        },
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setValues, errors, touched }) => (
        <Form className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10 space-y-10">
          {import.meta.env.DEV && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch("/photo.png");
                  const file = new File([await res.blob()], "photo.png", {
                    type: "image/png",
                  });
                  setValues({
                    ...NEW_SECTION_DEFAULTS,
                    ...sampleResumeData,
                    image: file,
                  });
                }}
                className="flex-1 font-body text-xs font-medium text-violet border border-dashed border-violet/40 rounded-xl px-4 py-2.5 hover:bg-violet/5 transition-colors"
              >
                ⚡ Fill Sample Data (dev only)
              </button>
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch("/photo.png");
                  const file = new File([await res.blob()], "photo.png", {
                    type: "image/png",
                  });
                  setValues({
                    ...NEW_SECTION_DEFAULTS,
                    ...stressTestResumeData,
                    image: file,
                  });
                }}
                className="flex-1 font-body text-xs font-medium text-gold border border-dashed border-gold/50 rounded-xl px-4 py-2.5 hover:bg-gold/10 transition-colors"
              >
                🧪 Fill Stress Test Data — max content, multi-page (dev only)
              </button>
            </div>
          )}

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

          {/* Contact Section (all optional) */}
          <div>
            <h2 className={sectionTitleClass}>Contact (optional)</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Field
                  name="contact.email"
                  placeholder="Email"
                  className={inputClass}
                />
                {errors.contact?.email && touched.contact?.email && (
                  <div className={errorClass}>{errors.contact.email}</div>
                )}
              </div>
              <div>
                <Field
                  name="contact.phone"
                  placeholder="Phone"
                  className={inputClass}
                />
              </div>
              <div>
                <Field
                  name="contact.linkedin"
                  placeholder="LinkedIn URL"
                  className={inputClass}
                />
                {errors.contact?.linkedin && touched.contact?.linkedin && (
                  <div className={errorClass}>{errors.contact.linkedin}</div>
                )}
              </div>
              <div>
                <Field
                  name="contact.github"
                  placeholder="GitHub URL"
                  className={inputClass}
                />
                {errors.contact?.github && touched.contact?.github && (
                  <div className={errorClass}>{errors.contact.github}</div>
                )}
              </div>
            </div>
          </div>

          {/* Section order — drag or use arrows, doesn't affect section design */}
          <div>
            <h2 className={sectionTitleClass}>Section Order</h2>
            <p className="font-body text-sm text-ink/50 mb-4">
              Drag to rearrange, or use the arrows. This only changes the order
              sections appear in — not how they look.
            </p>
            <SectionOrderControl
              order={values.sectionOrder}
              onChange={(next) => setFieldValue("sectionOrder", next)}
            />
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
                      <Field
                        name={`projects[${index}].link`}
                        placeholder="Project Link (optional)"
                        className={inputClass}
                      />
                      {errors.projects?.[index]?.link &&
                        touched.projects?.[index]?.link && (
                          <div className={errorClass}>
                            {errors.projects[index].link}
                          </div>
                        )}
                    </div>
                  ))}
                  {values.projects.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          mainHeading: "",
                          date: "",
                          description: "",
                          link: "",
                        })
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

          {/* Certifications & Achievements Section (optional) */}
          <div>
            <h2 className={sectionTitleClass}>
              Certifications &amp; Achievements (optional)
            </h2>
            <FieldArray name="certifications">
              {({ push, remove }) => (
                <div>
                  {values.certifications.map((_, index) => (
                    <div key={index} className={entryClass}>
                      {values.certifications.length > 1 && (
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
                          name={`certifications[${index}].mainHeading`}
                          placeholder="Certification / Achievement Title"
                          className={inputClass}
                        />
                        <Field
                          name={`certifications[${index}].issuer`}
                          placeholder="Issuing Organization (optional)"
                          className={inputClass}
                        />
                      </div>
                      <Field
                        name={`certifications[${index}].date`}
                        placeholder="Date (optional)"
                        className={inputClass}
                      />
                    </div>
                  ))}
                  {values.certifications.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        push({ mainHeading: "", issuer: "", date: "" })
                      }
                      className={addButtonClass}
                    >
                      Add Certification
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
            {
              key: "languages",
              label: "Languages/Frameworks",
              placeholder: "Language/Framework",
              singular: "Language/Framework",
            },
          ].map(({ key, label, placeholder, singular }) => (
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
                        Add {singular || label.slice(0, -1)}
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
