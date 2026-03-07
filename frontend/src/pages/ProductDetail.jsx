import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuantitySelector from "../components/QuantitySelector";
import { toast } from "react-toastify";
import { useCart } from "../context/useCart";



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://ecommerce-project-1z7p.onrender.com/product/get/${id}`);

        if (res.data.success) {
          setProduct(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "https://ecommerce-project-1z7p.onrender.com/cart/addToCart",
        {
          productId,
          quantity,
        },
        {
          withCredentials: true,
        },
      );
      fetchCart();

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-2xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold text-orange-500">
              FRW{product.price}
            </span>
          </div>
          <QuantitySelector
            value={1}
            min={1}
            max={10}
            onChange={(val) => setQuantity(val)}
          />
          <button
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
