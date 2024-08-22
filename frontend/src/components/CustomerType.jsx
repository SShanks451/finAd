import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CustomerType = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      <div className="flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="mx-auto">
            <IoPersonOutline size={60} />
          </div>
          <div className="text-4xl mt-4 mx-auto">Register as ?</div>
          <div
            className="border-2 text-center rounded-xl text-4xl mt-16 px-20 py-4 cursor-pointer hover:text-slate-400"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Influencer
          </div>
          <div
            className="border-2 text-center rounded-xl text-4xl mt-4 px-20 py-4 cursor-pointer hover:text-slate-400"
            onClick={() => navigate("/organizationsignup")}
          >
            Organization
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerType;
