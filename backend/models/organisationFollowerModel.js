import mongoose from "mongoose";

const organisationFollowerSchema = mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const OrganisationFollower = mongoose.model("OrganisationFollower", organisationFollowerSchema);

export default OrganisationFollower;
