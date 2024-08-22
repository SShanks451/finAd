import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="w-[100%] h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <ClipLoader color="#ffffff" size={50} />;
      </div>
    </div>
  );
};

export default Loader;
