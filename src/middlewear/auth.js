import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.js";
const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization.startsWith("Hamada__")) {
        return res.status(400).json({ message: "In-valid barrer key" });
      }
      const token = authorization.split("Hamada__")[1];
      const decoded = jwt.verify(token, "Ahmed@1230984567");
      if (!decoded?.id) {
        return res.status(400).json({ message: "Jwt expired" });
      }
      const user = await userModel
        .findById(decoded.id)
      if (!user) {
        return res.status(404).json({ message: "In-valid user" });
      }
      req.user = user;
      return next();
    } catch (err) {
      return res.status(500).json({ message: "Catch error", err });
    }
  };
};
export default auth;
