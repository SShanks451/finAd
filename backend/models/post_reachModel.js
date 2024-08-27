import mongoose from "mongoose";

const postReachSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganisationPost",
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

const PostReach = mongoose.model("PostReach", postReachSchema);

export default PostReach;
