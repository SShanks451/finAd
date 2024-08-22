import { useEffect, useState } from "react";
import HorizontalNavbar from "../components/HorizontalNavbar";
import Post from "../components/Post";
import VerticalNavbar from "../components/VerticalNavbar";
import CreatePost from "../components/CreatePost";
import BasicButtons from "../muiComponents/Button";
import axios from "axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Feedpage = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [posted, setPosted] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64string = reader.result;
      setImageArray((prevArray) => [...prevArray, base64string]);
      toast.success("Image uploaded");
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
    e.target.value = null;
  };

  const handleCreatePostButtonClick = () => {
    setIsCreatePost(!isCreatePost);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/api/posts/createpost", {
      textContent,
      image: imageArray,
    });
    setLoading(false);
    toast.success("Post created");
    setTextContent("");
    setImage(null);
    setImageArray([]);
    setIsCreatePost(!isCreatePost);
    setPosted(!posted);
  };

  useEffect(() => {
    async function getAllPosts() {
      const response = await axios.get("/api/posts/allposts");
      setAllPosts(response.data);
    }

    getAllPosts();
  }, [posted]);

  if (!allPosts) {
    return <Loader />;
  }

  return (
    <div className="w-[100%] text-white">
      <div className="w-[100%">
        <HorizontalNavbar />
        <div className="flex w-[100%]">
          <div className="w-[10%] border-r fixed">
            <VerticalNavbar />
          </div>
          <div className="w-[20%] ml-48 mt-24">
            <div className="w-[100%] border border-[#3d3d3d] bg-[#3d3d3d] rounded-lg h-[350px] py-3">
              <h1 className="text-center">Featured Ads for the week</h1>
            </div>
            <div className="w-[100%] mt-4 border border-[#3d3d3d] bg-[#3d3d3d] rounded-lg h-80 py-3">
              <h1 className="text-center">Brands you can follow</h1>
            </div>
            <div className="sticky top-24 mt-4 w-[100%] text-black">
              <BasicButtons label="Create Post" width="100%" onClick={handleCreatePostButtonClick} />
            </div>
          </div>
          {!isCreatePost ? (
            <div className="w-[45%] ml-20 mt-24">{allPosts && allPosts.map((post) => <Post post={post} />)}</div>
          ) : (
            <div className="w-[50%] ml-20 mt-24">
              <CreatePost
                onClick={() => {
                  setIsCreatePost(!isCreatePost);
                }}
                textContent={textContent}
                setTextContent={setTextContent}
                handlePost={handlePost}
                handleImage={handleImage}
                imageArray={imageArray}
                setImageArray={setImageArray}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedpage;
