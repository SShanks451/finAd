import Post from "../models/postModel.js";
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

const createpost = async (req, res) => {
  const { textContent, image } = req.body;

  try {
    // console.log(req.user);
    let imageData = [];
    if (image.length > 0) {
      const results = await uploadToCloudinary(image, "my-profile");
      imageData = results;
    }
    // console.log("imageData: ", imageData);

    const post = await Post.create({ user: req.user._id, textContent, images: imageData });

    res.status(201).json({
      post,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getallposts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate({
      path: "user",
      select: "-password",
    });
    // console.log("all posts: ", allPosts);

    res.status(200).send(allPosts);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const updatePostLikeCount = async (req, res) => {
  const { postId, action } = req.body;

  if (action === "like") {
    try {
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  if (action === "dislike") {
    try {
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
};

export { createpost, getallposts, updatePostLikeCount };
