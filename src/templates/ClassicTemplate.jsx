import Navbar from "../components/Navbar";
import Main from "../components/Main";
import RightSidebar from "../components/RightSidebar";

const ClassicTemplate = ({ data, imageUrl }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden">
      <Navbar name={data.name} designation={data.designation} image={imageUrl} />
      <div className="flex justify-between">
        <Main data={data} />
        <RightSidebar data={data.rightSidebar} />
      </div>
    </div>
  );
};

export default ClassicTemplate;
