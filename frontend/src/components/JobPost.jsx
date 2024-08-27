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
  // console.log(image_array);

  const [imageActive, setImageActive] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isReach, setIsReach] = useState(false);
  const [isReachClicked, setIsReachClicked] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowClicked, setIsFollowClicked] = useState(false);

  // console.log("isReach: ", isReach);

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
    await axios.put("/api/organisationposts/updatelikecount", {
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
    await axios.put("/api/organisationposts/updatelikecount", {
      postId: post._id,
      incrementBy: -1,
    });
  };

  const handleReach = async () => {
    await axios.post("/api/postreaches/reachpost", {
      postId: post._id,
    });
    setIsReachClicked(!isReachClicked);
    await axios.put("/api/organisationposts/updatereachcount", {
      postId: post._id,
      incrementBy: 1,
    });
  };

  const handleFollow = async () => {
    await axios.post("/api/organisationfollowers/followorg", {
      orgId: post.organisation._id,
    });
    setIsFollowClicked(!isFollowClicked);
    await axios.put("/api/organisations/updatefollowercount", {
      orgId: post.organisation._id,
      incrementBy: 1,
    });
  };

  const handleUnFollow = async () => {
    await axios.delete("/api/organisationfollowers/unfolloworg", {
      data: {
        orgId: post.organisation._id,
      },
    });
    setIsFollowClicked(!isFollowClicked);
    await axios.put("/api/organisations/updatefollowercount", {
      orgId: post.organisation._id,
      incrementBy: -1,
    });
  };

  useEffect(() => {
    async function checkPostAlreadyLiked() {
      const response = await axios.get(`/api/postlikes/getlikedpostbypostidanduserid?postId=${post._id}`);
      if (response.data.resData) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }

    checkPostAlreadyLiked();
  }, [isLikeClicked]);

  useEffect(() => {
    async function checkPostAlreadyReached() {
      const response = await axios.get(`/api/postreaches/getreachedpostbypostidanduserid?postId=${post._id}`);
      if (response.data.resData) {
        setIsReach(true);
      } else {
        setIsReach(false);
      }
    }

    checkPostAlreadyReached();
  }, [isReachClicked]);

  useEffect(() => {
    async function checkOrgAlreadyFollowed() {
      const response = await axios.get(`/api/organisationfollowers/getfollowedorgbyuseridandorgId?orgId=${post.organisation._id}`);
      if (response.data.resData) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }

    checkOrgAlreadyFollowed();
  }, [isFollowClicked]);

  return (
    <div className="border h-auto bg-[#3d3d3d] border-[#3d3d3d] rounded-sm mb-4">
      <div className="flex justify-between">
        <div className="flex w-[100%]">
          <div className="w-[100px] h-[80px] m-2">
            <img className="" src={post.organisation.logo} alt="" />
          </div>
          <div className="w-[100%] flex justify-between items-center">
            <div className="items-center">
              <div className="text-md">{post.organisation.name}</div>
              <div className="flex items-center">
                <div className="text-sm mr-1">{post.organisation.location} </div>
                <div className="mx-1">.</div>
                <div className="text-sm mx-1">{post.organisation.followers} followers</div>
                <div className="mx-1">.</div>
                <div className="text-sm mx-1">{new Date(post.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div>
              <button
                className={`text-sm border rounded-lg py-2 px-4 my-1 mx-5 border-black ${isFollow ? "bg-green-800" : "hover:bg-green-800"}`}
                onClick={!isFollow ? handleFollow : handleUnFollow}
              >
                {isFollow ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 mt-1 whitespace-pre-wrap">{post.content}</div>

      {image_array && image_array.length > 0 && (
        <div className="flex justify-center items-center">
          {/* <img className="w-[30px] h-[30px] cursor-pointer" src={leftArrow} alt="left-arrow" onClick={handlePrevImage} /> */}
          <img className="" src={image_array[imageActive].url} alt="post-image" />
          {/* <img className="w-[30px] h-[30px] cursor-pointer" src={rightArrow} alt="right-arrow" onClick={handleNextImage} /> */}
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
            <div className={`${isReach ? "text-green-600" : ""}`}>Reach</div>
          </div>
        </div>
        <div className="mx-4 cursor-pointer mt-4" onClick={!isLike ? handleLike : handleDislike}>
          <AiOutlineLike className="mx-auto" size={30} color={isLike ? "green" : ""} />
          <div className="text-xs flex justify-center">
            <div className={`${isLike ? "text-green-600" : ""}`}>Like</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
