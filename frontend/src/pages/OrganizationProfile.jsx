import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicButtons from "../muiComponents/Button";
import CreatePost from "../components/CreatePost";
import toast from "react-hot-toast";
import JobPost from "../components/JobPost";
import WebIcon from "@mui/icons-material/Web";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const OrganizationProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("orgId");

  const [orgDetails, setOrgDetails] = useState("");
  const [isCreateJobPost, setIsCreateJobPost] = useState(false);
  const [isActivePost, setIsActivePost] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [orgPosts, setOrgPosts] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/api/organisationposts/createpost", {
      content: textContent,
      status: "active",
      pictures: imageArray,
      organisation: query,
    });
    setLoading(false);
    toast.success("Post created");
    setTextContent("");
    setImage(null);
    setImageArray([]);
    setIsCreateJobPost(!isCreateJobPost);
  };

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

  useEffect(() => {
    async function getOrgById() {
      const orgResponse = await axios.get(`/api/organisations/getOrganisationById/${query}`);
      setOrgDetails(orgResponse.data);
    }

    getOrgById();
  }, []);

  useEffect(() => {
    async function getOrgPostsById() {
      const response = await axios.get(`/api/organisationposts/getpostsbyorgId?orgId=${query}`);
      setOrgPosts(response.data);
      console.log("org posts: ", response.data);
    }

    getOrgPostsById();
  }, []);

  if (!orgPosts) {
    return <div>Loading..</div>;
  }

  return (
    <div className="w-[100%] min-h-screen">
      <div className="text-white w-[100%]">
        <div className="flex items-center mx-20">
          <div className="flex items-center w-[50%]">
            <img className="w-[150px] h-[150px] rounded-full" src={orgDetails.logo} alt="no-logo" />
            <div className="ml-5">
              <div className="text-2xl">{orgDetails.name}</div>
              <div className="text-md">{orgDetails.tagline}</div>
              <div className="text-xs mt-1">{orgDetails.location}</div>
            </div>
          </div>
          <div className="w-[50%] flex">
            <div className="mx-auto">
              <div className="flex items-center">
                <WebIcon fontSize="large" />
                <div className="cursor-pointer hover:text-blue-500 ml-2">{orgDetails.website}</div>
              </div>
              <div className="flex items-center mt-4">
                <PeopleAltIcon fontSize="large" />
                <div className="ml-2">{orgDetails.followersCount} Followers</div>
              </div>
            </div>
            <div className="mx-auto">
              <div className="flex items-center">
                <EmailIcon fontSize="large" />
                <div className="cursor-pointer hover:text-blue-500 ml-2">{orgDetails.businessEmail}</div>
              </div>
              <div className="flex items-center mt-4">
                <CalendarMonthIcon fontSize="large" />
                <div className="ml-2">Founded In {orgDetails.founded}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-32 mt-4">
          <div className="text-xl">About</div>
          <div className="mt-2 text-md">{orgDetails.about}</div>
        </div>

        <div className="mx-32 mt-10 flex justify-between">
          <div className="text-center">
            <BasicButtons
              label="Create Ad Post"
              width={300}
              onClick={() => {
                setIsCreateJobPost(!isCreateJobPost);
                setIsActivePost(false);
              }}
            />
          </div>
          {isCreateJobPost && (
            <div className="ml-20 w-[100%]">
              <CreatePost
                onClick={() => setIsCreateJobPost(!isCreateJobPost)}
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

          {!isCreateJobPost && (
            <div className="">
              <div className="text-center">
                <BasicButtons
                  label="Active Jobs"
                  width={300}
                  onClick={() => {
                    setIsActivePost(!isActivePost);
                    setIsCreateJobPost(false);
                  }}
                />
              </div>
              {isActivePost && (
                <div className="overflow-scroll">
                  {orgPosts.map((post) => (
                    <div className="border rounded-lg border-black shadow-lg my-8 p-6 ">
                      <div className="whitespace-pre-wrap">{post.content}</div>
                      {post.pictures.map((im) => (
                        <div className="flex justify-center">
                          <img className="my-4" src={im.url} alt="" />
                        </div>
                      ))}
                      <div className="mx-2 mt-5">Likes: {post.likesCount}</div>
                      <div className="mx-2 mt-1">Reaches: {post.reachCount}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isCreateJobPost && (
            <div>
              <BasicButtons label="Expired Jobds" width={300} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
