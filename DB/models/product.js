import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: { 
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("Product", productSchema);
export default userModel;
