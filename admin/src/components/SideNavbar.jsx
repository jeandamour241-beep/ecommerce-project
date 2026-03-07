import { NavLink, useNavigate } from "react-router-dom";
import {
  FiUpload,
  FiBox,
  FiUsers,
  FiShoppingCart
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

function SideNavbar() {

  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition";

  const activeStyle =
    "flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white";

  const logout = async () => {
    axios.defaults.withCredentials=true;

    try {
      const res = await axios.post('https://ecommerce-project-1z7p.onrender.com/auth/logout/admin');
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="w-64 h-screen bg-white shadow-2xl p-5 fixed">

      <h1 className="text-2xl font-bold mb-10 text-blue-600">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2">

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          <FiUpload size={20} />
          Upload
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          <FiBox size={20} />
          Product List
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          <FiUsers size={20} />
          User List
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          <FiShoppingCart size={20} />
          Orders
        </NavLink>

        <button className="bg-blue-600 py-2 rounded-2xl text-white hover:cursor-pointer" onClick={logout}>Logout</button>

      </nav>
    </div>
  );
}

export default SideNavbar;