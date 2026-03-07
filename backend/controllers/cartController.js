import db from "../models/index.js";

const {Product, Cart, CartItem} = db;

export const addToCart = async (req, res) => {

    const transaction = await db.sequelize.transaction();

    try {
        
        const userId = req.user.id;
        const {productId, quantity} = req.body;
        if (!productId) {
            
            transaction.rollback();
            return res.status(400).json({success: false, message: "you can't add to cart without product"});
            
        }

        const existingProduct = await Product.findOne({where: {id: productId}});
        if (!existingProduct) {
            
            transaction.rollback();
            return res.status(400).json({success: false, message: "Product not found"});
            
        }

        let existingCart = await Cart.findOne({where: {userId: userId}});
        if (!existingCart) {
            existingCart = await Cart.create({userId: userId}, {transaction});
        }

        const cartItem = await CartItem.create({cartId: existingCart.id, productId: productId, quantity: quantity, price: existingProduct.price}, {transaction});
        await transaction.commit();
        return res.status(200).json({success: true, message: "Product added to cart", data: cartItem});

    } catch (error) {
        transaction.rollback();
        return res.status(500).json({success: false, message: error.message})
    }
}

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          as: 'cartItems',
          model: CartItem,
          include: [
            {
              as: 'product',
              model: Product
            }
          ],
        },
      ],
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

    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [
        {
          as: 'cart',
          model: Cart,
          where: { userId },
        },
      ],
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

    const cartItem = await CartItem.findByPk(id, {
      include: [
        {
          model: Cart,
          as: "cart",
          where: { userId },
        },
      ],
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cartItem.destroy();

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