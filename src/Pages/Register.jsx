import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, password, email })

      if (response.data === "success") {
        toast.success("User created successfully. Please login.")
        return navigate("/login")
      }
      toast.error(response.data);
    } catch (error) {
      toast.error('Registration failed')
    }
  }

  return (
    <>
      <div className='flex justify-center bg-gray-300 items-center h-screen fixed top-0 left-0 w-full '>
        <form onSubmit={handleSubmit} className='p-6 bg-white rounded-md  shadow-md '>
          <h1 className="text-2xl text-center font-bold mb-4">Register</h1>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="username" className='font-medium'>Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="email" className='font-medium'>Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium'>Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' required />
          </div>
          <button type="submit" className='bg-blue-500 cursor-pointer text-white p-2 rounded-md w-full hover:bg-blue-600'>Register</button>
          <p className='text-center text-sm text-gray-500 mt-4'>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a></p>
        </form>
        <ToastContainer toastClassName="top-20" />
      </div>
    </>
  )
}

export default Register
