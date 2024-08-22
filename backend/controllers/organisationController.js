import Organisation from "../models/organisationModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (image, folder = "my-profile") => {
  try {
    const data = await cloudinary.uploader.upload(image, { folder: folder });
    return { url: data.secure_url };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createOrganisation = async (req, res) => {
  const { name, tagline, bio, founded, businessEmail, website, location, plan, password, logo } = req.body;

  const existingOrganisation = await Organisation.findOne({ businessEmail });
  const existingUser = await Organisation.findOne({ businessEmail });
  if (existingUser || existingOrganisation) {
    res.status(400).json({
      message: "Email Already Taken",
    });
  }

  let companyLogo;

  if (logo) {
    const result = await uploadToCloudinary(logo, "my-profile");
    companyLogo = result.url;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    console.log("before");
    const newOrganisation = await Organisation.create({
      name,
      tagline,
      bio,
      founded,
      businessEmail,
      website,
      location,
      plan,
      logo: companyLogo,
      password: hashedPassword,
    });
    console.log("after");
    console.log("New Organisation: ", newOrganisation);
    generateToken(res, newOrganisation._id);
    res.status(201).json(newOrganisation);
  } catch (error) {
    res.status(500).json({ message: "Error while creating organisation", error });
  }
};

const getOrganisationById = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    console.log("organisation: ", organisation);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching organisation", error });
  }
};

const updateOrganisation = async (req, res) => {
  try {
    const updatedOrganisation = await Organisation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrganisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    res.status(200).json(updatedOrganisation);
  } catch (error) {
    res.status(500).json({ message: "Error while updating organisation", error });
  }
};

const loginOrganisation = async (req, res) => {
  const { businessEmail, password } = req.body;
  try {
    const existingOrganisation = await Organisation.findOne({ businessEmail });
    if (!existingOrganisation) {
      res.status(400).json({
        message: "Organisation not found with this email",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Incorrect Password!!",
      });
    }

    generateToken(res, existingOrganisation._id);

    res.status(200).json(existingOrganisation);
  } catch (error) {
    res.status(500).json({ message: "Error while logging organisation", error });
  }
};

const logoutOrganisation = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { createOrganisation, updateOrganisation, loginOrganisation, logoutOrganisation, getOrganisationById };
