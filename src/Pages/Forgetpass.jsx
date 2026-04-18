import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_KEY}/auth/forget-password`, { email })
      .then(response => {
       toast.warning(response.data.message)
      })
      .catch(error => {
        toast.error("Failed to send reset link. Please try again.");
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Reset Link
          </button>
        </form>
      </div>
       <ToastContainer toastClassName="top-20" />
    </div>
  );
};

export default Forgetpass;
