import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const getOrders = async () => {
      try {

        const res = await axios.get(
          "https://ecommerce-project-1z7p.onrender.com/order/all",
          { withCredentials: true }
        );

        setOrders(res.data.orders);

      } catch (error) {
        console.log(error.message);
      }
    };

    getOrders();

  }, []);

  const approveOrder = async (id) => {

    try {

      await axios.put(
        `https://ecommerce-project-1z7p.onrender.com/order/status/${id}`,
        { status: "approved" },
        { withCredentials: true }
      );

      // update UI without refetch
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "approved" } : order
        )
      );

    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {orders.map((order) => {

        const total =
          order.orderItems?.reduce(
            (sum, item) => sum + item.price,
            0
          ) || 0;

        return (
          <div key={order.id} className="border p-6 mb-6 rounded-xl shadow">

            <p className="font-bold">
              Customer: {order.user?.name}
            </p>

            <p>Email: {order.user?.email}</p>

            <p>Status: {order.status}</p>

            <p>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between">
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
                onClick={() => approveOrder(order.id)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve Order
              </button>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default AdminOrders;