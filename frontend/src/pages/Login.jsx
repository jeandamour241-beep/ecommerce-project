import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [state, setState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      if (state === false) {
        const response = await axios.post(
          "http://localhost:9090/auth/register",
          { name, email, password },
        );
        if (response.data.success) {
          setName("");
          setEmail("");
          setPassword("");
          setState(true);
        }

        toast.success(response.data.message);
      } else {
        const response = await axios.post("http://localhost:9090/auth/login", {
          email,
          password,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-orange-500">Sign</span> {state ? "In" : "Up"}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          {state === false && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            {state ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {state ? (
          <p className="text-center text-sm text-gray-600 mt-4">
            Do you want to create account?{" "}
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => setState(false)}
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => setState(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
