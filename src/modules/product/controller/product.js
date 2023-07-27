import productModel from "../../../../DB/models/product.js";
export const addProduct = async (req, res, next) => {
  try {
    const { title, desc, price } = req.body;
    const { user } = req;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    const product = await productModel.create({
      title,
      desc,
      price,
      userId: user._id,
    });
    if (!product) {
      return res.status(400).json({ message: "Fail to add product" });
    } else {
      return res.status(201).json({ message: "Done", product });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const { title, desc, price } = req.body;
    const { user } = req;
    const { id } = req.params;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    const product = await productModel.findOneAndUpdate(
      { userId: user._id, _id: id },
      {
        title,
        desc,
        price,
      },
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "In-valid product" });
    } else {
      return res.status(201).json({ message: "Done", product });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (!user.active) {
      return res.status(400).json({ message: "You've to be logged in" });
    }
    const product = await productModel.findOneAndDelete({
      userId: user._id,
      _id: id,
    });
    if (!product) {
      return res.status(404).json({ message: "In-valid product" });
    } else {
      return res.status(201).json({ message: "Done" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
export const products = async (req, res, next) => {
  try {
    const products = await productModel.find();
    if (!products.length) {
      return res.status(404).json({ message: "In-valid products" });
    }
    return res.status(200).json({ message: "Done", products });
  } catch (err) {
    return res.status(500).json({ message: "Catch error", err });
  }
};
