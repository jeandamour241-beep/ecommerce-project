import { useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/cart/getCart",
          { withCredentials: true }
        );

        if (res.data.success && res.data.data) {
          setCartItems(res.data.data.cartItems || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/cart/getCart",
        { withCredentials: true }
      );

      if (res.data.success && res.data.data) {
        setCartItems(res.data.data.cartItems || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;