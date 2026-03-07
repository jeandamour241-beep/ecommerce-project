import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9090/product/get", {
          withCredentials: true,
        });



        if (res.data.success) {
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getProducts();
  }, [products]);

  // DELETE PRODUCT
  const Delete = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/product/delete",
        { id },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setProducts(products.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <p className="text-gray-500 text-sm">Manage your store products</p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* Table Head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Image</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="p-4 font-medium text-gray-800">{item.name}</td>

                {/* Image */}
                <td className="p-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                {/* Price */}
                <td className="p-4 text-gray-700">${item.price}</td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-4">
                    {/* DELETE */}
                    <button
                      className="text-red-500 hover:text-red-700 text-lg"
                      onClick={() => Delete(item.id)}
                    >
                      <FaTrash />
                    </button>

                    {/* UPDATE */}
                    <button className="text-blue-500 hover:text-blue-700 text-lg">
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
