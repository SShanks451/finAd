import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

const JobPost = ({ post }) => {
  // console.log("post: ", post);
  const image_array = post.pictures;
  console.log(image_array);

  const [imageActive, setImageActive] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isReach, setIsReach] = useState(false);
  const [isReachClicked, setIsReachClicked] = useState(false);

  const handlePrevImage = () => {
    setImageActive((imageActive) => (imageActive - 1 < 0 ? image_array.length - 1 : imageActive - 1));
  };

  const handleNextImage = () => {
    setImageActive((imageActive) => (imageActive + 1) % image_array.length);
  };

  const handleLike = async () => {
    await axios.post("/api/postlikes/likepost", {
      postId: post._id,
    });
    setIsLikeClicked(!isLikeClicked);
    await axios.put("/api/postorganisation/updatelikecount", {
      postId: post._id,
      incrementBy: 1,
    });
  };

  const handleDislike = async () => {
    await axios.delete("/api/postlikes/dislikepost", {
      data: {
        postId: post._id,
      },
    });
    setIsLikeClicked(!isLikeClicked);
    await axios.put("/api/postorganisation/updatelikecount", {
      postId: post._id,
      incrementBy: -1,
    });
  };

  const handleReach = async () => {
    await axios.post("/api/reach/reachpost", {
      postId: post._id,
    });
    setIsReachClicked(!isLikeClicked);
    await axios.put("/api/postorganisation/updatereachcount", {
      postId: post._id,
      incrementBy: 1,
    });
  };

  // const handleUnReach = async () => {
  //   await axios.delete("/api/reach/unreachpost", {
  //     data: {
  //       postId: post._id,
  //     },
  //   });
  //   setIsReachClicked(!isLikeClicked);
  //   await axios.put("/api/postorganisation/updatereachcount", {
  //     postId: post._id,
  //     incrementBy: -1,
  //   });
  // };

  useEffect(() => {
    async function getLikedPostSingle() {
      const response = await axios.get(`/api/postlikes/getlikedpostsingle?postId=${post._id}`);
      if (response.data.resData) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }

    getLikedPostSingle();
  }, [isLikeClicked]);

  useEffect(() => {
    async function getReachedPostSingle() {
      const response = await axios.get(`/api/reach/getreachedpostsingle?postId=${post._id}`);
      if (response.data.resData) {
        setIsReach(true);
      } else {
        setIsReach(false);
      }
    }

    getReachedPostSingle();
  }, [isReachClicked]);

  return (
    <div className="border h-auto bg-[#3d3d3d] border-[#3d3d3d] rounded-sm mb-4">
      <div className="flex justify-between">
        <div className="flex w-[100%]">
          <div className="w-[10%] h-[4rem] border m-4">
            <img src={post.organisation.logo} alt="" />
          </div>
          <div>
            <div className="mt-4 ml-2 flex">
              <div className="">{post.organisation.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 mt-1 whitespace-pre-wrap">{post.content}</div>
      {/* {post.images.map((im) => (
        <div className="flex justify-center">
          <img className="" src={im.url} alt="post-img" />
        </div>
      ))} */}
      {image_array && image_array.length > 0 && (
        <div className="flex justify-center items-center">
          <img className="w-[50px] h-[50px] cursor-pointer" src={leftArrow} alt="left-arrow" onClick={handlePrevImage} />
          <img className="" src={image_array[imageActive].url} alt="post-image" />
          <img className="w-[50px] h-[50px] cursor-pointer" src={rightArrow} alt="right-arrow" onClick={handleNextImage} />
        </div>
      )}

      <div className="mx-4 mb-4 mt-8 flex flex-row-reverse border-t border-slate-500">
        <div className="mx-4 cursor-pointer mt-4">
          <CiShare1 className="mx-auto" size={30} />
          <div className="text-xs flex justify-center">
            <div>Share</div>
          </div>
        </div>
        <div className="mx-4 cursor-pointer mt-4">
          <FaRegComment className="mx-auto" size={30} />
          <div className="text-xs flex justify-center">
            <div>Comment</div>
          </div>
        </div>
        <div className="mx-4 cursor-pointer mt-4" onClick={!isReach ? handleReach : null}>
          <FaRegArrowAltCircleUp className="mx-auto" size={30} color={isReach ? "green" : ""} />
          <div className="text-xs flex justify-center">
            <div>Reach</div>
          </div>
        </div>
        <div className="mx-4 cursor-pointer mt-4" onClick={!isLike ? handleLike : handleDislike}>
          <AiOutlineLike className="mx-auto" size={30} color={isLike ? "green" : ""} />
          <div className="text-xs flex justify-center">
            <div>Like</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
