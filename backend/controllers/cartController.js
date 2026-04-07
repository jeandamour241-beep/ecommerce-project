import { prisma } from "../config/db.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "you can't add to cart without product",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingProduct = await tx.product.findUnique({
        where: { id: productId },
      });
      if (!existingProduct) {
        throw new Error("Product not found");
      }

      let existingCart = await tx.cart.findUnique({
        where: { userId: userId },
      });
      if (!existingCart) {
        existingCart = await tx.cart.create({ data: { userId: userId } });
      }

      const cartItem = await tx.cartItem.create({
        data: {
          cartId: existingCart.id,
          productId: productId,
          quantity: quantity,
          price: existingProduct.price,
        },
      });
      return cartItem;
    });
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Item and quantity required",
      });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: itemId,
        cart: {
          userId: userId,
        },
      },
      include: {
        cart: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: id,
        cart: {
          userId: userId,
        },
      },
      include: {
        cart: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await prisma.cartItem.delete({where: {id: id}});

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
