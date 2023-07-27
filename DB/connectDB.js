import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(`mongodb://localhost:27017/crud`)
    .then(() => {
      console.log("connected DB");
    })
    .catch((err) => {
      console.log(`Fail to connect DB ${err}`);
    });
};
export default connectDB