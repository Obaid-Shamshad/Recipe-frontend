import React, { useState, } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Resetpass() {
  const [password, setPassword] = useState('');
  // const [passErr, setPassErr] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();

  // let handlePass = (e) => {
  //     let passVal = e.target.value;
  //     setPassword(passVal);
  //     if (passVal.length > 0 && !/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[,./<>~@#$%&*()]+).+$/.test(passVal)) {
  //         setPassErr("Must use [a-zA-Z0-9] and special char")
  //     } else if (passVal.length > 0 && passVal.length < 8) {
  //         setPassErr("password must contain at least 8 char")
  //     } else {
  //         setPassErr("");
  //     }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!passErr) {
    axios.post(`http://localhost:5000/auth/reset-password/${id}/${token}`, { password })
      .then(response => {
        alert(response.data.message)
        if (response.data.status === 'success') {
          navigate("/Login");
        }
      })
      .catch(error => {
        console.error("Error resetting password:", error);
        alert("Failed to reset password. Please try again.");

      });
    //  } else {
    //         alert("Please fix the errors before submitting.");
    //  }
  };


  return (
    <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your new password"
              required
            />
          </div>
          {/* {passErr && <p className="text-red-500 text-sm italic  bg-gray-300 fixed -mt-4 px-1 ">{passErr}</p>} */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Resetpass
