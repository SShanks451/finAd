import PostLike from "../models/postLikeModel.js";

const likePost = async (req, res) => {
  const { postId } = req.body;

  try {
    console.log("hit like");
    await PostLike.create({ user: req.user._id, post: postId });

    res.status(201).json({
      message: "Post Liked",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const dislikePost = async (req, res) => {
  const { postId } = req.body;

  try {
    console.log("hit dislike");
    await PostLike.deleteOne({ user: req.user._id, post: postId });

    res.status(200).json({
      message: "Post Disliked",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getLikedPostSingle = async (req, res) => {
  const userId = req.user._id;
  const postId = req.query.postId;
  // console.log("postid: ", postId);
  // console.log("userid: ", userId);

  try {
    const resData = await PostLike.findOne({ user: userId, post: postId });
    res.status(200).json({
      resData,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export { likePost, dislikePost, getLikedPostSingle };
