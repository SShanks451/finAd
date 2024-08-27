import OrganisationFollower from "../models/organisation_followerModel.js";

const followOrg = async (req, res) => {
  const userId = req.user._id;
  const { orgId } = req.body;

  try {
    await OrganisationFollower.create({ organisation: orgId, user: userId });
    res.status(201).json({
      message: "Following organisation",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const unfollowOrg = async (req, res) => {
  const userId = req.user._id;
  const { orgId } = req.body;

  try {
    await OrganisationFollower.deleteOne({ organisation: orgId, user: userId });
    res.status(201).json({
      message: "Unfollowed organisation",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const getFollowedOrgByUserIdAndOrgId = async (req, res) => {
  const userId = req.user._id;
  const orgId = req.query.orgId;

  try {
    const resData = await OrganisationFollower.findOne({ organisation: orgId, user: userId });
    res.status(200).json({
      resData,
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export { followOrg, unfollowOrg, getFollowedOrgByUserIdAndOrgId };
