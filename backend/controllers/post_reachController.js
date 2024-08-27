import PostReach from "../models/post_reachModel.js";

const reachPost = async (req, res) => {
  const { postId } = req.body;

  console.log("reachpostId: ", postId);
  console.log("reachuseridL ", req.user._id);

  try {
    console.log("hit reach");
    await PostReach.create({ user: req.user._id, post: postId });

    res.status(201).json({
      message: "Post Reached",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getReachedPostByPostIdAndUserId = async (req, res) => {
  const userId = req.user._id;
  const postId = req.query.postId;

  try {
    const resData = await PostReach.findOne({ user: userId, post: postId });
    res.status(200).json({
      resData,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export { reachPost, getReachedPostByPostIdAndUserId };
