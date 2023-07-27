import userModel from "../../../../DB/models/user.js";
import bcrypt from "bcrypt";
export const updateProfile = async (req, res, next) => {
  try {
    const { userName, email, age, phone } = req.body;
    const { user } = req;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    if (email) {
      const checkEmail = await userModel.findOne({ email }).select("email");
      if (checkEmail) {
        return res.status(409).json({ message: "Email exist" });
      }
    }
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      userName,
      email,
      age,
      phone,
    });
    if (!updateUser) {
      return res.status(400).json({ message: "Fail to update profile" });
    } else {
      return res.status(200).json({ message: "Done", updateUser });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;
    const { user } = req;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "This password miss match" });
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });
    if (!updateUser) {
      return res.status(400).json({ message: "Fail to update password" });
    } else {
      return res.status(200).json({ message: "Done", updateUser });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const deleteProfile = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    const deleteUser = await userModel.findByIdAndDelete(user._id);
    if (!deleteUser) {
      return res.status(400).json({ message: "Fail to delete password" });
    } else {
      return res.status(200).json({ message: "Done" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "In-valid user" });
    } else {
      return res.status(200).json({ message: "Done", user });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const users = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (!users.length) {
      return res.status(404).json({ message: "In-valid user" });
    } else {
      return res.status(200).json({ message: "Done", users });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
