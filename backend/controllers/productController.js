import { prisma } from "../config/db.js";
import cloudinary from "../config/cloudinary.conf.js";

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

    const data = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        image_url: result.secure_url,
        image_public_id: result.public_id,
      },
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
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }

    const deleteImage = await cloudinary.uploader.destroy(
      existingProduct.image_public_id,
    );
    if (!deleteImage) {
      return res
        .status(400)
        .json({ success: false, message: "Image not deleted." });
    }

    await prisma.product.delete({ where: { id: id } });

    return res.status(200).json({ success: true, message: "product deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    return res.status(200).json({ success: true, message: "success", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductLimit = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });
    return res.status(200).json({ success: true, message: "success", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.product.findFirst({ where: { id: id } });
    return res.status(200).json({ success: true, message: "success", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.json({ success: false, message: "please enter name." });
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive", // kugirango ibe case-insensitive
        },
      },
    });

    if (!products || products.length === 0) {
      return res.json({ success: false, message: "product not found." });
    }

    return res.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const swiperProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
