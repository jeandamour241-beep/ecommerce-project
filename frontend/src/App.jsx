import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from './pages/Orders';

const App = () => {
  return (
    <div className='bg-linear-to-br from-white to-orange-100 min-h-screen'>
      <ToastContainer />

      <Routes>
        {/* Pages zifite Navbar */}
        <Route element={<Layout />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders />}/>
        </Route>

        {/* Login nta Navbar */}
        <Route path='/authentication' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App;