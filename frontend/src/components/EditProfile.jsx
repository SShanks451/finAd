import MultipleSelectChip from "../muiComponents/MultipleSelectChip";
import SelectLabels from "../muiComponents/Select";
import BasicDatePicker from "../muiComponents/DatePicker";
import { IoCloudUploadOutline } from "react-icons/io5";
import SiteLogo from "../images/SiteLogo.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center">
        <div className="text-white w-[1000px] border-t">
          <div className="flex justify-center mt-6">
            <img className="w-[100px] h-[100px]" src={SiteLogo} alt="" />
          </div>
          <div className="flex w-[100%] shadow-lg mt-6 rounded-xl bg-[#3d3d3d] border-2 border-black">
            <div className="w-[150px] m-4">
              <div className="border w-[150px] h-[150px] text-center opacity-30 flex flex-col justify-center">Profile photo</div>
              <div className="bg-[#3d3d3d] text-center mt-4 py-2 border rounded-full shadow-lg cursor-pointer border-slate-500 hover:bg-[#212121]">
                Browse
              </div>
            </div>
            <div className="ml-40">
              <div className="mt-4">
                <div className="mb-2 text-lg text-[#ebe6e6]">Username</div>
                <input className="bg-[#3d3d3d] border-white border text-white rounded-lg h-9 px-2 w-[230px]" type="text" />
              </div>
              <div className="mt-3">
                <div className="mb-2 text-lg text-[#ebe6e6] mt-4">Portfolio</div>
                <input className="bg-[#3d3d3d] border-white border text-white rounded-lg h-9 px-2 w-[230px]" type="text" />
              </div>
            </div>
            <div className="ml-20">
              <div className="mt-4">
                <div className="mb-2 text-lg text-[#ebe6e6]">Gender</div>
                <SelectLabels />
              </div>
              <div className="mt-3">
                <div className="mb-2 text-lg text-[#ebe6e6]">Location</div>
                <input className="bg-[#3d3d3d] border-white border text-white rounded-lg h-9 px-2 w-[230px]" type="text" />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[60%] shadow-lg mt-10 rounded-xl bg-[#3d3d3d] pl-2 border-2 border-black">
              <div className="text-lg text-[#ebe6e6] ml-2 pt-1">Categories</div>
              <MultipleSelectChip />
            </div>
            <div className="shadow-lg mt-10 rounded-xl bg-[#3d3d3d] w-[40%] ml-8 pl-2 h-[90px] border-2 border-black">
              <div className="ml-2 text-[#ebe6e6] text-lg pt-1">Date of Birth</div>
              <BasicDatePicker />
            </div>
          </div>
          <div className="text-[#ebe6e6] shadow-lg mt-10 pb-2 rounded-xl bg-[#3d3d3d] border-2 border-black">
            <div className="text-lg ml-4 mb-2 pt-2">Bio/Description</div>
            <textarea
              name=""
              id=""
              className="ml-4 w-[90%] bg-[#3d3d3d] border-white border text-white rounded-lg px-2 h-[100px] resize-none"
            ></textarea>
          </div>
          <div className="flex w-[100%] shadow-lg mt-10 rounded-xl bg-[#3d3d3d]  border-2 border-black justify-center">
            <div className="mb-4">
              <div className="text-lg text-center mb-2 pt-2">Upload Media</div>
              <div className="w-[250px] h-[250px] border bg-cente flex justify-center cursor-pointer hover:bg-[#5d5d5d]">
                <IoCloudUploadOutline size={50} className="my-auto" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="text-center text-2xl my-8 border w-fit px-20 py-2 cursor-pointer rounded-xl hover:bg-[#3d3d3d]"
              onClick={() => {
                navigate("/feed");
              }}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
