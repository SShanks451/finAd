import mongoose from "mongoose";

const planSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    duration: { type: Number, required: true },
    amount: { type: Number, required: true },
    planType: { type: String, required: true, enum: ["User", "Organisation"] },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
