import mongoose from "mongoose";

const organisationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    organisationProducts: [
      {
        type: String,
      },
    ],
    founded: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    bgPic: {
      type: String,
    },
    businessEmail: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    plan: {
      type: Number,
      required: true,
    },
    followers: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Organisation = mongoose.model("Organisation", organisationSchema);

export default Organisation;
