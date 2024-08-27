import mongoose from "mongoose";

const organisationFollowerSchema = mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
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

const OrganisationFollower = mongoose.model("OrganisationFollower", organisationFollowerSchema);

export default OrganisationFollower;
