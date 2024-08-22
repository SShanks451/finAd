import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";
import SiteLogo from "../images/SiteLogo.jpg";
import InputBox from "../muiComponents/InputBox";
import Button from "../muiComponents/Button";
import PasswordInputBox from "../muiComponents/PasswordInputBox";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../redux/userSlice";

axios.defaults.withCredentials = true;

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleContinueButton = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/signup", { name, emailId, password });
      dispatch(addUserInfo(res.data));
      navigate("/socialhandles");
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[100%] h-screen justify-center bg-white">
      <div className="flex justify-center">
        <div className="flex flex-col h-auto border px-10 py-8 rounded-lg border-slate-800">
          <div className="flex justify-center mb-1">
            <img className="h-[60px]" src={SiteLogo} alt="" />
          </div>
          <div className="text-center font-semibold mt-2 mb-4">Register to FinAd to continue</div>
          <div>
            <InputBox label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <InputBox label="Email Address" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div>
            <PasswordInputBox value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex justify-center mt-7" onClick={handleContinueButton}>
            <Button label="Continue" width={300} />
          </div>
          {isError && <div className="text-center text-red-600 font-semibold">{errorMessage}</div>}
          <div className="flex justify-center my-2">{isLoading && <BeatLoader color="#1976d2" />}</div>
          <div className="ml-[10px] mt-3 text-sm">
            Already have an account?{" "}
            <span className="cursor-pointer font-medium" onClick={() => navigate("/signin")}>
              Sign In
            </span>
          </div>
          <div className="ml-2.5 my-7">
            <hr />
          </div>
          <div className="ml-2.5 py-2 rounded-md flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              width="300"
              logo_alignment="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
