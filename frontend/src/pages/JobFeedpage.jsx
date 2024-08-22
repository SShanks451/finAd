import { useEffect, useState } from "react";
import HorizontalNavbar from "../components/HorizontalNavbar";
import VerticalNavbar from "../components/VerticalNavbar";
import axios from "axios";
import JobPost from "../components/JobPost";

const JobFeedpage = () => {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    async function getAllJobPosts() {
      const response = await axios.get("/api/postorganisation/allpostsorganisation");
      console.log(response.data);
      setAllPosts(response.data);
    }

    getAllJobPosts();
  }, []);

  if (!allPosts) {
    return <div>Loading</div>;
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
          </div>
          <div className="w-[45%] ml-20 mt-24">{allPosts && allPosts.map((post) => <JobPost post={post} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default JobFeedpage;
