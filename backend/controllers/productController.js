import cloudinary from "../config/cloudinary.conf.js";
import db from "../models/index.js";
import { Op } from "sequelize";

const { Product } = db;

export const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file;
    if (!name || !description || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required." });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      folder: "product_images",
    });
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "image not uploaded" });
    }

    const data = await Product.create({
      name,
      description,
      price,
      image_url: result.secure_url,
      image_public_id: result.public_id
    });

    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "something went wrong." });
    }

    return res
      .status(201)
      .json({ success: true, message: "product created.", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required." });
  }

  try {
    const existingProduct = await Product.findOne({ where: {id: id}});
    if (!existingProduct) {
        return res.status(400).json({success: false, message: 'Product not found.'});
    }

    const deleteImage = await cloudinary.uploader.destroy(existingProduct.image_public_id);
    if (!deleteImage) {
        return res.status(400).json({success: false, message: 'Image not deleted.'});
    }

    await Product.destroy({ where: {id: id}});

    return res.status(200).json({ success: true, message: "product deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    return res.status(200).json({ success: true, message: "success", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductLimit = async (req, res) => {
  try {
    const product = await Product.findAll({
      limit: 8,
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).json({ success: true, message: "success", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const {id} = req.params
    const data = await Product.findOne({where: {id: id}});
    return res.status(200).json({ success: true, message: "success", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    
    const {search} = req.query
    if (!search) {
      return res.json({success: false, message: 'please enter name.'});
    }

    const products = await Product.findAll({
      where: {
        [Op.or] : [
          {name: {[Op.like]: `%${search}%`}}
        ]
      }
    });
    if (!products || products.length === 0) {
      return res.json({success: false, message: 'product not found.'});
    }

    return res.json({success: true, total: products.length, products});

  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}

export const swiperProduct = async (req, res) => {
  try {
    
    const product = await Product.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
    })

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}