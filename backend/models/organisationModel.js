import mongoose from "mongoose";

const organisationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    businessEmail: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    website: {
      type: String,
      required: true,
    },

    tagline: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    industryType: {
      type: String,
    },

    founded: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
    },

    plan: {
      type: Number,
      required: true,
    },

    followers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Organisation = mongoose.model("Organisation", organisationSchema);

export default Organisation;
