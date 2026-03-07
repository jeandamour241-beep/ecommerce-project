import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/useCart";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      const res = await axios.post(
        "https://ecommerce-project-1z7p.onrender.com/order/add",
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        clearCart();
        toast.success("Order placed successfully 🎉");

        // Clear cart from UI
        setCart(null);

        // Redirect to orders page (optional)
        window.location.href = "/orders";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ✅ Load cart once (React 19 safe)
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get("https://ecommerce-project-1z7p.onrender.com/cart/getCart", {
          withCredentials: true,
        });

        if (res.data.success) {
          setCart(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // ✅ Update quantity (Optimistic Update)
  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put(
        "https://ecommerce-project-1z7p.onrender.com/cart/update",
        { itemId, quantity: newQty },
        { withCredentials: true },
      );

      // Update UI instantly
      setCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQty } : item,
        ),
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Remove item (Optimistic Update)
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`https://ecommerce-project-1z7p.onrender.com/cart/delete/${itemId}`, {
        withCredentials: true,
      });

      toast.success("Item removed");

      setCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading cart...
      </div>
    );
  }

  // ✅ Empty cart
  if (!cart || !cart.cartItems?.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Cart is empty 🛒
      </div>
    );
  }

  // ✅ Calculate total
  const total = cart.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center border rounded-2xl p-6 shadow-sm bg-white"
          >
            {/* Product Info */}
            <div className="flex items-center gap-6">
              <img
                src={item.product?.image_url}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div>
                <h2 className="text-lg font-semibold">{item.product?.name}</h2>
                <p className="text-gray-500">FRW {item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>

            {/* Item Total */}
            <div className="text-orange-500 font-bold text-lg mt-4 md:mt-0">
              FRW {item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="mt-10 p-6 bg-gray-100 rounded-2xl text-right">
        <h2 className="text-2xl font-bold">
          Total: <span className="text-orange-500">FRW {total}</span>
        </h2>

        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {checkoutLoading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
