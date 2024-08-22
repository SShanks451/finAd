import mongoose from "mongoose";

const postOrganisationReachSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostOrganisation",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PostOrganisationReach = mongoose.model("PostOrganisationReach", postOrganisationReachSchema);

export default PostOrganisationReach;
