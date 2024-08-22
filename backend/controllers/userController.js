import User from "../models/userModel.js";
import zod from "zod";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const signupBody = zod.object({
  name: zod.string(),
  emailId: zod.string().email(),
  password: zod.string(),
});

const createUser = async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: "Invalid Inputs",
    });
  }

  const { name, emailId, password } = req.body;

  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    res.status(400).json({
      message: "Email Already Taken",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      emailId,
      password: hashedPassword,
    });

    console.log("New User: ", newUser);

    generateToken(res, newUser._id);

    res.status(200).json({
      id: newUser._id,
      name: newUser.name,
      emailId: newUser.emailId,
      reach: newUser.reach,
      influencerType: newUser.influencerType,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const signinbody = zod.object({
  emailId: zod.string().email(),
  password: zod.string(),
});

const loginUser = async (req, res) => {
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: "Invalid Inputs",
    });
  }

  const { emailId, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      res.status(400).json({
        message: "User not found with this email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Wrong Password!!",
      });
    }

    generateToken(res, existingUser._id);

    res.status(200).json({
      id: existingUser._id,
      name: existingUser.name,
      emailId: existingUser.emailId,
      reach: existingUser.reach,
      influencerType: existingUser.influencerType,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export { createUser, loginUser, logoutUser };
