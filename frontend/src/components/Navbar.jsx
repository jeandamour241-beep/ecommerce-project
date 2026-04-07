import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/useCart";
import { CiSearch } from "react-icons/ci";
import { url } from "./url";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [showCart, setShowCart] = useState(false);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { cartItems, cartCount } = useCart();

  // 🔐 CHECK AUTH
  useEffect(() => {
    const checkAuth = async () => {
      axios.defaults.withCredentials = true;
      try {
        const res = await axios.post(`${url}/auth/is-auth`);

        if (res.data.success) {
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
        console.log(error.message);
      }
    };

    const getUser = async () => {
      axios.defaults.withCredentials = true;
      try {
        const res = await axios.get(`${url}/data`);

        if (res.data.success) {
          setUser(res.data.name[0].toUpperCase());
        }
      } catch (error) {
        setUser("");
        console.log(error.message);
      }
    };

    checkAuth();
    getUser();
  }, []);

  const searchProduct = async (value) => {
    axios.defaults.withCredentials = true;

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `${url}/product/find?search=${value}`,
      );

      if (res.data.success) {
        setResults(res.data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      searchProduct(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const logout = async () => {
    axios.defaults.withCredentials = true;

    try {
      const res = await axios.post(`${url}/auth/logout/user`);

      if (res.data.success) {
        setAuth(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <nav className="bg-orange-100 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-orange-500">Online</span>
            <span className="text-gray-800">Shop</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <span
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/")}
            >
              Home
            </span>

            <span
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/orders")}
            >
              Orders
            </span>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:block relative w-72">
            <div className="flex items-center border rounded-lg px-2 bg-white">
              <CiSearch size={20} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>

            {/* RESULTS */}
            {results.length > 0 && (
              <div className="absolute top-12 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearch("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>

                      <p className="text-xs text-orange-500">
                        FRW {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart className="text-xl" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

              {showCart && (
                <div className="absolute right-0 top-10 w-80 bg-white shadow-xl rounded-lg p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Cart empty</p>
                  ) : (
                    <>
                      <h3 className="font-bold mb-3">Cart Items</h3>

                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between mb-2"
                        >
                          <span>{item.product?.name}</span>

                          <span>FRW {item.price * item.quantity}</span>
                        </div>
                      ))}

                      <div className="border-t pt-2 font-bold">
                        Total: FRW {total}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {auth ? (
              <div className="relative group w-8 h-8 bg-gray-800 text-orange-500 rounded-full flex items-center justify-center font-bold cursor-pointer">
                {user}

                <div className="absolute hidden group-hover:block top-8 right-0 bg-white shadow rounded">
                  <ul className="p-2 text-sm">
                    <li
                      onClick={logout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded-full"
                onClick={() => navigate("/authentication")}
              >
                Sign Up
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          <div className="flex items-center border rounded-lg p-2">
            <CiSearch size={20} />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full ml-2 outline-none"
            />
          </div>

          <div onClick={() => navigate("/")}>Home</div>

          <div onClick={() => navigate("/orders")}>Orders</div>

          <div onClick={() => navigate("/cart")}>
            Cart (<span className="text-orange-400">{cartCount}</span>)
          </div>

          {results.length > 0 && (
            <div className="absolute top-27 left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold">{product.name}</p>

                    <p className="text-xs text-orange-500">
                      FRW {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
