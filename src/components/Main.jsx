import Box from "./Box";

const Main = ({ data }) => {
  return (
    <div>
      {/* Experience Section */}
      {data.experiences.map((experience, index) => (
        <Box
          key={index}
          title={index === 0 ? "E X P E R I E N C E" : ""}
          mainHeading={experience.mainHeading}
          companyName={experience.companyName}
          date={experience.date}
          description={experience.description}
        />
      ))}

      {/* Projects Section */}
      {data.projects?.map((project, index) => (
        <Box
          key={index}
          title={index === 0 ? "P R O J E C T S" : ""}
          mainHeading={project.mainHeading}
          date={project.date}
          description={project.description}
        />
      ))}

      {/* Education Section */}
      {data.education.map((education, index) => (
        <Box
          key={index}
          title={index === 0 ? "E D U C A T I O N" : ""}
          mainHeading={education.mainHeading}
          companyName={education.schoolName}
          date={education.date}
        />
      ))}
    </div>
  );
};

export default Main;


