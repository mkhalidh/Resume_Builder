const Box = ({ title, mainHeading, companyName, date, description }) => {
  return (
    <div className=" mx-[48px] my-[30px]  rounded-2xl bg-[#fef0c3] text-[#715a12] p-4 ">
      <div className=" text-xl ">
        {title && (
          <h3 className="text-sm montserrat  text-gray-600">{title}</h3>
        )}
        {mainHeading && <h1 className="poppins-semibold">{mainHeading}</h1>}
        {companyName && <h2 className="poppins-regular">{companyName}</h2>}
      </div>

      {date && <p className="text-sm font-sans text-gray-600">{date}</p>}

      {description && (
        <p className="poppins-regular w-[70%] leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default Box;
