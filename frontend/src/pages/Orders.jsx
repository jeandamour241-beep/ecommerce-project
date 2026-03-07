import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://ecommerce-project-1z7p.onrender.com/order/getOrder", {
          withCredentials: true,
        });

        setOrders(res.data.orders);
      } catch (error) {
        navigate("/authentication");
        console.log(error.message);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-project-1z7p.onrender.com/order/delete/${id}`, {
        withCredentials: true,
      });

      toast.success("Order deleted successfully");

      // remove order from UI
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "text-yellow-500";
    if (status === "approved") return "text-green-500";
    if (status === "delivered") return "text-blue-500";
    if (status === "cancelled") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        orders.map((order) => {
          const total =
            order.orderItems?.reduce((sum, item) => sum + item.price, 0) || 0;

          return (
            <div key={order.id} className="border p-6 mb-6 rounded-2xl shadow bg-white">
              <p className="font-semibold mb-2">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className={`font-bold mb-4 ${getStatusColor(order.status)}`}>
                Status: {order.status}
              </p>

              {order.orderItems?.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.product?.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>FRW {item.price}</span>
                </div>
              ))}

              <div className="mt-4 font-bold text-orange-500">
                Total: FRW {total}
              </div>

              {order.status === "pending" && (
                <button
                  onClick={() => handleDelete(order.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete Order
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;