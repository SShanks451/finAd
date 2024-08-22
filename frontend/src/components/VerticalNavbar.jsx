import { useNavigate } from "react-router-dom";
import { signOutUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";
import TimelineIcon from "@mui/icons-material/Timeline";
import axios from "axios";

const VerticalNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(signOutUser());
    await axios.post("/api/users/logout");
  };

  return (
    <div className="h-screen w-[100%]">
      <div className="w-[100%] flex justify-center mt-28">
        <Tooltip title="Home">
          <IconButton>
            <HomeIcon fontSize="large" className="mx-auto text-white" onClick={() => navigate("/feed")} />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[100%] flex justify-center mt-5">
        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsActiveIcon fontSize="large" className="mx-auto text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[100%] flex justify-center mt-5">
        <Tooltip title="Messages">
          <IconButton>
            <EmailIcon fontSize="large" className="mx-auto text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[100%] flex justify-center mt-5">
        <Tooltip title="Profile">
          <IconButton>
            <Person2Icon fontSize="large" className="mx-auto text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[100%] flex justify-center mt-5">
        <Tooltip title="Activities">
          <IconButton>
            <TimelineIcon fontSize="large" className="mx-auto text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[100%] flex justify-center mt-5">
        <Tooltip title="Logout">
          <IconButton>
            <ExitToAppIcon fontSize="large" className="mx-auto text-white" onClick={handleLogout} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default VerticalNavbar;
