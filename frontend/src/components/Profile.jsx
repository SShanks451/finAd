import { GoHomeFill } from "react-icons/go";
import { MdMessage } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { MdSignpost } from "react-icons/md";
import { CiInstagram } from "react-icons/ci";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";
import { PiTiktokLogoThin } from "react-icons/pi";
import { CiYoutube } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import profilePic from "../images/purav.jpg";
import { useEffect, useRef } from "react";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const scrollList = (element, direction) => {
  if (element) {
    const itemHeight = element.querySelector("li").clientHeight;
    const scrollAmount = itemHeight * 3;
    element.scrollTo({
      top: element.scrollTop + scrollAmount * direction,
      behavior: "smooth",
    });
  }
};

function EndorsedProducts() {
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [showScrollDownButton, setShowScrollDownButton] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current.scrollTop > 0) {
        setShowScrollUpButton(true);
      } else {
        setShowScrollUpButton(false);
      }

      if (listRef.current.scrollTop < listRef.current.scrollHeight - listRef.current.clientHeight) {
        setShowScrollDownButton(true);
      } else {
        setShowScrollDownButton(false);
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
      return () => {
        listElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="w-full h-96 drop-shadow-md hover:drop-shadow-2xl border border-orange-300 rounded-lg mt-6 p-4 text-center relative z-10 hover:border-2 hover:backdrop-blur-lg ">
      <h3 className="text-2xl font-extralight mb-4 font-poppins">Endorsed Products</h3>
      <div className="relative h-full overflow-hidden">
        <div className="overflow-y-auto h-60 relative no-scrollbar" ref={listRef}>
          <ul className="list-disc list-inside text-center space-y-6">
            <li className="border rounded-2xl border-white h-10 pt-1">Company A</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company B</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company C</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company D</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company E</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company F</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company G</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company H</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company I</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company J</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company K</li>
            <li className="border rounded-2xl border-white h-10 pt-1">Company L</li>
          </ul>
        </div>
        {showScrollUpButton && (
          <button
            onClick={() => scrollList(listRef.current, -1)}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            <FaArrowUp />
          </button>
        )}
        {showScrollDownButton && (
          <button
            onClick={() => scrollList(listRef.current, 1)}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            <FaArrowDown />
          </button>
        )}
      </div>
    </div>
  );
}

function Profile() {
  const user = useSelector((state) => state.user.userInfo);

  const [responsex, setResponsex] = useState(null);

  useEffect(() => {
    async function fn() {
      const resp = await axios.post("/api/instadetails", {
        user,
      });
      setResponsex(resp.data);
      console.log(resp.data);
    }

    fn();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll(".count-up");
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        let count = +counter.innerText.replace(/[MK,]/g, "");

        const increment = target / 75; // Adjust increment here for speed

        const animateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = formatNumber(count);
            requestAnimationFrame(animateCount);
          } else {
            counter.innerText = formatNumber(target); // Ensure the final value is correct
          }
        };

        animateCount();
      };

      updateCount();
    });
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K+";
    }
    return num.toFixed(0) + "+";
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Dashbord />
      <Maincontent />
    </div>
  );
}

function Dashbord() {
  return (
    <header className="bg-[#212121] text-white p-4 shadow">
      <div className="container mx-auto flex items-center">
        <h1 className="text-xl font-bold ml-10">My Dashboard</h1>
        <nav className="flex-1">
          <ul className="flex justify-center space-x-8">
            <li className="flex flex-col items-center">
              <a href="#Home" className="flex flex-col items-center text-center hover:text-custom-lime">
                <GoHomeFill className="text-2xl mb-1" />
                <span className="text-sm">Home</span>
              </a>
            </li>
            <li className="flex flex-col items-center">
              <a href="#message" className="flex flex-col items-center text-center hover:text-custom-lime">
                <MdMessage className="text-2xl mb-1" />
                <span className="text-sm">Messaging</span>
              </a>
            </li>
            <li className="flex flex-col items-center">
              <a href="#notifications" className="flex flex-col items-center text-center hover:text-custom-lime">
                <MdNotificationsActive className="text-2xl mb-1" />
                <span className="text-sm">Notifications</span>
              </a>
            </li>
            <li className="flex flex-col items-center">
              <a href="#endorsements" className="flex flex-col items-center text-center hover:text-custom-lime">
                <MdSignpost className="text-2xl mb-1" />
                <span className="text-sm">Endorsements</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Maincontent() {
  return (
    <div className="flex flex-col bg-[#212121] lg:flex-row text-white p-4 lg:pl-20 lg:pr-10 pt-1 lg:pt-4">
      {/* Left Section */}
      <div className="lg:w-2/3 flex flex-col  lg:pb-60 lg:items-start px-4 lg:pr-80 ">
        {/* Big Name */}
        <h2 className="text-6xl font-bold lg:pb-6 lg:mb-4 lg:mt-10 lg:pt-8 text-center lg:text-left">Purav Jha</h2>
        {/* About Section */}
        <p className="text-lg text-white-700 lg:pb-10 mb-4 font-raleway font-medium">
          Purav Jha is a rising star in the Indian digital landscape, known for his engaging content as a social media influencer and actor. Born in
          New Delhi, he has quickly made a name for himself through his collaborations with popular creators and his own YouTube channel. This
          biography explores his early life, career trajectory, personal achievements, and future aspirations, providing a comprehensive look at the
          life of this young influencer.
        </p>

        {/* Followers Section */}
        <div className="flex items-center mb-4 justify-center lg:justify-start rounded-lg pb ">
          <table className="table-auto flex justify-center">
            <tbody>
              <tr className="flex justify-between">
                <td className="px-6 text-2xl font-raleway font-medium flex flex-col items-center justify-center w-1/5">
                  <CiInstagram />
                  Instagram
                </td>
                <td className="px-6 text-2xl font-raleway font-medium flex flex-col items-center justify-center w-1/5">
                  <FaXTwitter />
                  Twitter
                </td>
                <td className="px-6 text-2xl font-raleway font-medium flex items-center flex-col justify-center w-1/5">
                  <PiTiktokLogoThin />
                  TikTok
                </td>
                <td className="px-6 text-2xl font-raleway font-medium flex items-center flex-col justify-center w-1/5">
                  <CiYoutube />
                  YouTube
                </td>
                <td className="px-6 text-2xl font-raleway font-medium flex items-center flex-col justify-center w-1/5">
                  <CiLinkedin />
                  LinkedIn
                </td>
              </tr>
              <tr className="flex justify-between">
                <td className="px-6 font-raleway font-medium flex justify-center w-1/5">
                  <span className="text-md font-bold font-usmodern count-up" data-count="">
                    -
                  </span>
                </td>
                <td className="px-6 font-raleway font-medium flex justify-center w-1/5">
                  <span className="text-md font-bold font-usmodern count-up" data-count="">
                    -
                  </span>
                </td>
                <td className="px-6 font-raleway font-medium flex justify-center w-1/5">
                  <span className="text-md font-bold font-usmodern count-up" data-count="">
                    -
                  </span>
                </td>
                <td className="px-6 font-raleway font-medium flex justify-center w-1/5">
                  <span className="text-md font-bold font-usmodern count-up" data-count="">
                    -
                  </span>
                </td>
                <td className="px-6 font-raleway font-medium flex justify-center w-1/5">
                  <span className="text-md font-bold font-usmodern count-up" data-count="">
                    -
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-2 mt-10 w-fit text-2xl font-raleway font-medium flex flex-col items-center justify-center">Insta Score</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3 flex flex-col justify-center items-center mr-10 pt-2 space-y-20 mb-20">
        {/* Profile Picture Container */}
        <div className="w-full  h-96 border border-black rounded-lg overflow-hidden ">
          <img src={profilePic} alt="Profile" className=" w-full h-96" />
        </div>

        {/* Container for previously worked companies */}
        <EndorsedProducts />
      </div>
    </div>
  );
}

export default Profile;
