import userModel from "../../../../DB/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password, age, phone } = req.body;
    const checkEmail = await userModel.findOne({ email }).select("email");
    if (checkEmail) {
      return res.status(409).json({ message: "This email exist" });
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    const user = new userModel({
      userName,
      email,
      password: hashPassword,
      age,
      phone,
    });
    const saveUser = await user.save();
    if (saveUser) {
      return res.status(201).json({ message: "Done", saveUser });
    } else {
      return res.status(400).json({ message: "Fail to signup" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await userModel
      .findOne({ email })
      .select("email password");
    if (!checkEmail) {
      return res.status(404).json({ message: "This email is not exist" });
    }
    const match = bcrypt.compareSync(password, checkEmail.password);
    if (!match) {
      return res.status(400).json({ message: "This password is rong" });
    }
    const token = jwt.sign({ id: checkEmail._id }, "Ahmed@1230984567", {
      expiresIn: "20h",
    });
    await userModel.updateOne({ email }, { active: true });
    return res.status(200).json({ message: "Done", token });
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const logout = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.active) {
      return res.status(409).json({ message: "Already you loged out" });
    }
    const logoutUser = await userModel.findByIdAndUpdate(user._id, {
      active: false,
    });
    if (logoutUser) {
      res.status(200).json({ message: "Done" });
    } else {
      return res.status(400).json({ message: "In-valid user" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
