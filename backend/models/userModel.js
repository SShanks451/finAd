import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    influencerType: {
      type: String,
      enum: ["Bronze", "Gold", "Platinum"],
      default: "Bronze",
      required: true,
    },

    instaFollowers: {
      type: Number,
      default: 0,
    },

    instaScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
