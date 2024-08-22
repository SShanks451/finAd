import PostOrganisationReach from "../models/postOrganisationReachModel.js";

const reachPost = async (req, res) => {
  const { postId } = req.body;
  console.log("reachpostId: ", postId);
  console.log("reachuseridL ", req.user._id);

  try {
    console.log("hit reach");
    await PostOrganisationReach.create({ user: req.user._id, post: postId });

    res.status(201).json({
      message: "Post Reached",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const unreachPost = async (req, res) => {
  const { postId } = req.body;

  try {
    console.log("hit unreach");
    await PostOrganisationReach.deleteOne({ user: req.user._id, post: postId });

    res.status(200).json({
      message: "Post Unreached",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getReachedPostSingle = async (req, res) => {
  const userId = req.user._id;
  const postId = req.query.postId;

  try {
    const resData = await PostOrganisationReach.findOne({ user: userId, post: postId });
    res.status(200).json({
      resData,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export { reachPost, unreachPost, getReachedPostSingle };
