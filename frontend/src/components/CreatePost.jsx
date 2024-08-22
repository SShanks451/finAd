import BasicButtons from "../muiComponents/Button";
import { RxCross1 } from "react-icons/rx";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const CreatePost = ({ onClick, textContent, setTextContent, handlePost, handleImage, imageArray, setImageArray, loading }) => {
  return (
    <form action="">
      <div className="w-[100%] ">
        <textarea
          placeholder="Write something..."
          className="w-[100%] h-[30rem] p-4 bg-[#181818] resize-none outline-none shadow-lg"
          autoFocus={false}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />
        <div className="flex gap-4">
          {imageArray.length >= 0 &&
            imageArray.map((im) => (
              <div className="w-fit text-center">
                <img src={im} alt="photo" width={100} height={100} />
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon
                      fontSize="small"
                      className="text-center cursor-pointer mt-1 text-white"
                      onClick={() => {
                        console.log("delete");
                        const index = imageArray.indexOf(im);
                        setImageArray(imageArray.filter((_, i) => i !== index));
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
        </div>

        <div className="flex justify-between mt-2 text-black">
          <div>
            <PhotoCameraIcon fontSize="large" className="text-white absolute" />
            <input
              name="image"
              className="relative w-20 z-10 opacity-0"
              placeholder="Image"
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImage}
            />
          </div>

          {!loading ? (
            <BasicButtons
              isDisable={textContent.length === 0 && imageArray.length === 0 ? true : false}
              label="Post"
              width={150}
              onClick={handlePost}
            />
          ) : (
            <ClipLoader color="white" />
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <RxCross1 className="cursor-pointer" size={30} onClick={onClick} />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
