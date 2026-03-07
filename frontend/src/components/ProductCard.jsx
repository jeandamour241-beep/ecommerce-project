import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-project-1z7p.onrender.com/product/new?limit=8"
        );

        if (res.data.success) {
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      
      {/* 🔥 Title (ushobora kuyikuramo niba uyishyira muri Home) */}
      <h2 className="text-3xl font-bold text-center mb-12">
        New Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group hover:cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Discount badge optional */}
              {product.discount && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-lg truncate">
                {product.name} 🔥
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-orange-500 font-bold text-lg">
                    FRW{product.price}
                  </span>

                  {product.old_price && (
                    <span className="text-gray-400 line-through text-sm ml-2">
                      ${product.old_price}
                    </span>
                  )}
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;