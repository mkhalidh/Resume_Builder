const RightSidebar = ({ data }) => {
  const sections = [
    {
      title: "Skills",
      items: data.skills,
    },
    {
      title: "Tools",
      items: data.tools,
    },
    {
      title: "Languages",
      items: data.languages,
    },
  ];

  return (
    <div className="w-[400px] bg-[#fdd147] px-10 py-10  text-sm text-[#423306] poppins-regular">
      {sections.map((section, index) => (
        <div key={index} className="mb-10 bg-[#fef0c3] p-4 rounded-xl">
          <h3 className="font-bold text-[#715a12] text-xl mb-2">
            {section.title}
          </h3>
          <ul className="list-none ">
            {section.items.map((item, i) => (
              <li className="mb-2 leading-8 text-[16px]" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RightSidebar;
