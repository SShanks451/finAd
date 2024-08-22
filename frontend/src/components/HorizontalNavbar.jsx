import SiteLogo from "../images/SiteLogo.jpg";
import { useNavigate } from "react-router-dom";

const HorizontalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] fixed z-10">
      <div className="shadow-lg h-[4rem] bg-[#3d3d3d] flex">
        <img className="ml-[10.7rem] my-1" src={SiteLogo} alt="" />
        <div className="my-auto ml-36 text-black ">
          <input className="py-1 px-3 w-[300px] rounded-full" placeholder="⌕  Search..." type="text" />
        </div>
        <div className="flex flex-row-reverse w-full my-auto mx-24">
          <div className="h-[3rem] w-[3rem] rounded-full bg-green-500 border cursor-pointer">
            <div className="text-4xl flex justify-center">S</div>
          </div>
          <div
            className="hover:bg-[#212121] my-auto mx-auto border border-[#3d3d3d] py-2 rounded-lg px-4 cursor-pointer"
            onClick={() => navigate("/jobfeedpage")}
          >
            Go to Job Feed
          </div>
          {/* {isProfileButton && (
            <div className="border w-[10rem] h-[10rem] absolute mr-5 top-[4rem]">
              <div
                className="w-[100%] border-b flex justify-center py-1 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </div>
              <div className="w-[100%] border-b flex justify-center py-1 cursor-pointer" onClick={handleSignOutClick}>
                Sign Out
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HorizontalNavbar;
