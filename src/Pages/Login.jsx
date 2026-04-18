import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const API_KEY = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_KEY}/auth/login`, { username, password })
      if (response.data.message === "Login successful") {
        window.localStorage.setItem("userId", response.data.userId);
        toast.success(response.data);
        return navigate("/user");
      }
      toast.warning(response.data);
    } catch (error) {
      toast.error("login failed");
    }
  }

  return (
    <>
      <div className='flex justify-center bg-gray-300 items-center h-screen fixed top-0 left-0 w-full '>
        <form onSubmit={handleSubmit} className='p-6 bg-white rounded-md shadow-md '>
          <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="username" className='font-medium'>Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' autoComplete='username' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium'>Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' autoComplete='current-password' required />
          </div>
         <div className="flex gap-3">
           <div className='flex items-center mb-4 gap-1'>
            <input type="checkbox" name="remember me" id="remember me" />
            <label htmlFor="remember me">Remember me</label>
          </div>
          <Link to="/forgot-password" className='text-red-800 hover:underline'>Forgot-password</Link>
         </div>
          <button type="submit" className='bg-blue-500 cursor-pointer text-white p-2 rounded-md w-full hover:bg-blue-600'>Login</button>
          <p className='text-center text-sm text-gray-500 mt-4'>Don't have an account? <Link to="/register" className='text-blue-500 hover:underline'>Register</Link></p>
          <ToastContainer toastClassName="top-20" />
        </form>
      </div>
    </>
  )
}

export default Login
