import BasicTextFields from "../muiComponents/InputBox";
import InputAdornments from "../muiComponents/PasswordInputBox";
import BasicButtons from "../muiComponents/Button";
import SiteLogo from "../images/SiteLogo.jpg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/Bg-image.png";

const OrganizationSignup = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedIn, setFoundedIn] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState(null);

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64string = reader.result;
      setBase64Image(base64string);
      toast.success("Image uploaded");
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
    e.target.value = null;
  };

  const handleSubmit = async () => {
    const response = await axios.post("/api/organisations/signup", {
      name: organizationName,
      tagline: tagline,
      founded: foundedIn,
      businessEmail: organizationEmail,
      website: website,
      location: location,
      about: about,
      plan: selectedPlan,
      password: password,
      logo: base64image,
    });
    console.log("response: ", response);
    navigate(`/organizationprofile?orgId=${response.data._id}`);
    toast.success("Organization created");
  };

  return (
    <div className="w-[100%] fixed">
      <img src={bgImage} className="absolute opacity-10" alt="" />
      <div className="h-screen mx-4">
        <div className="flex justify-center h-screen">
          <div className="flex flex-col justify-center text-white">
            <div className="bg-white  flex flex-col justify-start items-center px-10 pb-16 pt-10 rounded-xl border border-black shadow-lg z-10 opacity-90">
              <div className="w-[80px] h-[80px] mb-4">
                <img src={SiteLogo} />
              </div>
              {active === 0 && (
                <div className="flex flex-col items-center">
                  <BasicTextFields label="Organization Name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
                  <BasicTextFields label="Organization Email" value={organizationEmail} onChange={(e) => setOrganizationEmail(e.target.value)} />
                  <InputAdornments label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className="mt-4">
                    <BasicButtons
                      label="Next"
                      width={200}
                      onClick={() => {
                        setActive((active) => active + 1);
                      }}
                    />
                  </div>
                </div>
              )}
              {active === 1 && (
                <div className="flex flex-col items-center w-[100%] text-black">
                  <div className="flex">
                    <div className="">
                      <div className="border w-[120px] h-[120px] border-black text-center rounded-full mr-5 hover:bg-gray-200">
                        {image && <img className="w-[120px] h-[120px] rounded-full" src={base64image} alt="no-logo" />}
                      </div>
                      <input
                        name="image"
                        className="relative w-[100px] mt-4 ml-2"
                        placeholder="Image"
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleImage}
                      />
                    </div>
                    <div>
                      <BasicTextFields label="Organization Name" value={organizationName} disabled={true} />
                      <BasicTextFields label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    <div>
                      <BasicTextFields label="Organization Email" value={organizationEmail} disabled={true} />
                      <BasicTextFields label="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[120px] h-[120px] mr-5"></div>
                    <div>
                      <BasicTextFields label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                      <BasicTextFields label="Founded In" value={foundedIn} onChange={(e) => setFoundedIn(e.target.value)} />
                    </div>
                    <div>
                      <BasicTextFields label="Industry Type" />
                    </div>
                  </div>
                  <div className="mt-5 ml-20">
                    <textarea
                      className="px-2 py-1 border rounded-lg"
                      placeholder="About the company..."
                      rows={4}
                      cols={60}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                  <div className="mt-6">
                    <BasicButtons label="Next" width={300} onClick={() => setActive((active) => active + 1)} />
                  </div>
                  <div className="mt-4">
                    <BasicButtons label="Back" width={200} onClick={() => setActive((active) => active - 1)} />
                  </div>
                </div>
              )}
              {active === 2 && (
                <div className="flex flex-col items-center w-[100%] text-black">
                  <div className="flex">
                    <div
                      className={`border border-black p-20 rounded-xl shadow-lg text-xl cursor-pointer ${
                        selectedPlan === 1 ? "bg-[#ebe6e6]" : "bg-white"
                      }`}
                      onClick={() => {
                        setSelectedPlan(1);
                      }}
                    >
                      <div className="text-center">PLAN 1</div>
                      <div className="mt-10">Basic Platform Fee</div>
                      <div className="mt-2">Influencer Recommendation ❌</div>
                    </div>
                    <div className="ml-4">
                      <div
                        className={`border border-black p-20 rounded-xl shadow-lg text-xl cursor-pointer ${
                          selectedPlan === 2 ? "bg-[#ebe6e6]" : "bg-white"
                        }`}
                        onClick={() => {
                          setSelectedPlan(2);
                        }}
                      >
                        <div className="text-center">PLAN 2</div>
                        <div className="mt-10">Amount: </div>
                        <div className="mt-2">Influencer Recommendation </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <BasicButtons label="Submit" width={300} onClick={handleSubmit} />
                  </div>
                  <div className="mt-4">
                    <BasicButtons label="Back" width={200} onClick={() => setActive((active) => active - 1)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignup;
