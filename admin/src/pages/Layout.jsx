import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import axios from "axios";

const Layout = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      axios.defaults.withCredentials = true;

      try {
        const res = await axios.post(
          "http://localhost:9090/auth/is-admin-auth"
        );

        if (res.data.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsAuth(false);
      }
    };

    check();
  }, []);

  // Loading igihe auth iri kugenzurwa
  if (isAuth === null) {
    return <div className="p-6">Loading...</div>;
  }

  // Niba atakoze login
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // Niba login yemeye
  return (
    <div className="flex">
      <div className="fixed left-0 top-0 h-screen w-64">
        <SideNavbar />
      </div>

      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;