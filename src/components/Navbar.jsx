const Navbar = ({ name, designation, image }) => {
  return (
    <div className="poppins-regular">
      <div className="bg-[#85680e] h-[4px]"></div>
      <div className="flex justify-between items-center bg-[#fee28a]">
        <div className="m-[48px] text-4xl">
          <h1 className="poppins-bold text-[#423306]">
            {name || "Muhammad Khalid Hussain"}
          </h1>
          <p className=" text-[#85680e]">
            {designation || "Software Engineer"}
          </p>
        </div>
        <div>
          <img
            src={image || "/photo.png"}
            className="w-[150px]  h-[150px] mr-28 border-[03px]  border-[#a17c07] rounded-full"
            alt="photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
