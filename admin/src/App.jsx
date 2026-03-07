import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Orders from './pages/Orders'
import ProductList from './pages/ProductList'
import ProductUpload from './pages/ProductUpload'
import Users from './pages/Users'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/products' element={<ProductList/>}/>
          <Route path='/upload' element={<ProductUpload/>}/>
          <Route path='/users' element={<Users/>}/>
        </Route>
        <Route path='/' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
