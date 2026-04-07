import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() =>{
    const getAllUsers = async () => {
      axios.defaults.withCredentials=true;
      try {
        
        const res = await axios.get('https://ecommerce-project-mtyu.onrender.com/auth/users', {});
        if (res.data.success) {
          setUsers(res.data.users);
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    getAllUsers();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              All Users
            </h1>
            <p className="text-gray-500 text-sm">
              Manage all users
            </p>
          </div>
    
          {/* Table Container */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
    
            <table className="w-full text-left">
    
              {/* Table Head */}
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4">Names</th>
                  <th className="p-4">Emails</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
    
              {/* Table Body */}
              <tbody>
    
                {users.map((item) => (
    
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
    
                    {/* Name */}
                    <td className="p-4 font-medium text-gray-800">
                      {item.name}
                    </td>
    
                    <td className="p-4 text-gray-700">
                      {item.email}
                    </td>
    
                    {/* Actions */}
                    <td className="p-4">
    
                      <div className="flex items-center justify-center gap-4">
    
                        {/* Delete */}
                        <button className="text-red-500 hover:text-red-700 text-lg">
                          <FaTrash />
                        </button>
    
                        {/* Update */}
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
  )
}

export default Users
