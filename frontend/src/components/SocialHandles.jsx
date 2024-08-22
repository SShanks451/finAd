import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const SocialHandles = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo);

  const [isSelected, setIsSelected] = useState(false);
  const [currentHandle, setCurrentHandle] = useState(null);
  const [handleName, setHandleName] = useState("");
  const [instaHandleId, setInstaHandleId] = useState("");
  const [resFromPy, setResFromPy] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleComponents = {
    FaInstagram: FaInstagram,
    FaXTwitter: FaXTwitter,
    FaTiktok: FaTiktok,
    FaYoutube: FaYoutube,
    FaSnapchatGhost: FaSnapchatGhost,
    FaLinkedin: FaLinkedin,
  };

  const SelectedIcon = currentHandle ? handleComponents[currentHandle] : null;

  const handleInstaVerify = async () => {
    setLoading(true);
    const response = await axios.post("/api/scrapperEngine", {
      handle: instaHandleId,
      user: user,
    });
    setResFromPy(response.data);
    setLoading(false);
    setIsSelected(false);
  };

  return (
    <div>
      <div className=" min-h-screen text-white">
        <div className="flex justify-center h-screen">
          <div className="flex flex-col justify-center">
            <div className="text-4xl mx-auto">Social handles you would like to share?</div>

            {!isSelected && (
              <>
                <div className="flex justify-between mx-10 mt-20">
                  <FaInstagram
                    className={`cursor-pointer ${instaHandleId ? "text-green-600" : "white"}`}
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaInstagram");
                      setHandleName("Instagram");
                    }}
                    size={40}
                  />
                  <FaXTwitter
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaXTwitter");
                      setHandleName("X");
                    }}
                    size={40}
                  />
                  <FaTiktok
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaTiktok");
                      setHandleName("TikTok");
                    }}
                    size={40}
                  />
                </div>
                <div className="flex justify-between mx-10 mt-10">
                  <FaYoutube
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaYoutube");
                      setHandleName("Youtube");
                    }}
                    size={40}
                  />
                  <FaSnapchatGhost
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaSnapchatGhost");
                      setHandleName("Snapchat");
                    }}
                    size={40}
                  />
                  <FaLinkedin
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(true);
                      setCurrentHandle("FaLinkedin");
                      setHandleName("LinkedIn");
                    }}
                    size={40}
                  />
                </div>
                <div className="flex justify-center mt-20">
                  <div
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      navigate("/editprofile");
                    }}
                  >
                    Continue
                  </div>
                </div>
              </>
            )}

            {isSelected && (
              <>
                <div className="border-2 border-black shadow-lg mt-6 rounded-2xl py-8">
                  <div className="flex justify-center">{SelectedIcon && <SelectedIcon size={40} />}</div>
                  <div className="text-center">{handleName}</div>
                  <div className="text-center text-3xl mt-12">Username</div>
                  <div className="flex justify-center mt-4">
                    <input
                      className="w-[60%] px-3 py-3 rounded-full border-white border-2 bg-[#212121]"
                      type="text"
                      value={instaHandleId}
                      onChange={(e) => setInstaHandleId(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-4 text-md ">
                    <div className="cursor-pointer w-fit hover:text-gray-500" onClick={handleInstaVerify}>
                      {!loading ? "Verify Handle" : <ClipLoader color="#ffffff" />}
                    </div>
                  </div>
                  <div className="ml-4 mt-10 text-sm">
                    <div>* Account should be public.</div>
                    <div>* Your public data will be used for score calculations.</div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <RxCross2
                    className="cursor-pointer"
                    onClick={() => {
                      setIsSelected(false);
                      setCurrentHandle(null);
                    }}
                    size={30}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHandles;
