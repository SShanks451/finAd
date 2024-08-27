import OrganisationPost from "../models/organisation_postModel.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (image, folder = "my-profile") => {
  try {
    let results = [];
    for (let im in image) {
      const data = await cloudinary.uploader.upload(image[im], { folder: folder });
      results.push({ url: data.secure_url, publicId: data.public_id });
    }

    return results;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createPost = async (req, res) => {
  const { content, status, deadline, organisation, pictures } = req.body;
  try {
    let imageData = [];
    if (pictures.length > 0) {
      const results = await uploadToCloudinary(pictures, "my-profile");
      imageData = results;
    }
    const newPost = await OrganisationPost.create({ content, status, deadline, organisation, pictures: imageData });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error while creating post", error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await OrganisationPost.find({}).populate({ path: "organisation", select: "-password" });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching posts", error });
  }
};

const getPostsByOrganisationId = async (req, res) => {
  const orgid = req.query.orgId;
  try {
    const posts = await OrganisationPost.find({ organisation: orgid });
    // console.log("obt posts: ", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const updateLikesCount = async (req, res) => {
  try {
    const { postId, incrementBy } = req.body;

    const updatedPost = await OrganisationPost.findByIdAndUpdate(postId, { $inc: { likesCount: incrementBy } });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating likes count", error });
  }
};

const updateReachCount = async (req, res) => {
  try {
    const { postId, incrementBy } = req.body;

    const updatedPost = await OrganisationPost.findByIdAndUpdate(postId, { $inc: { reachCount: incrementBy } });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating reach count", error });
  }
};

export { createPost, getAllPosts, updateLikesCount, updateReachCount, getPostsByOrganisationId };
