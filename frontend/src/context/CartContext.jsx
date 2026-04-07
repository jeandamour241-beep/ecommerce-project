import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔥 Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/cart/getCart",
        { withCredentials: true }
      );

      if (res.data.success) {
        setCartItems(res.data.data.cartItems || []);
      }
    } catch (error) {
      setCartItems([]);
      console.log(error.message)
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 Add To Cart (important for instant update)
  const addToCartLocal = (newItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity:
                  item.quantity + newItem.quantity,
              }
            : item
        );
      }

      return [...prev, newItem];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        fetchCart,
        addToCartLocal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};