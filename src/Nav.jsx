import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import HumbergerMenu from './HumbergerMenu'

function Nav({ checkedLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const handleLogout = () => {
    axios.post('http://localhost:5000/auth/logout')
      .then(response => {
        window.localStorage.removeItem("userId");
        navigate("/");
      })
      .catch(error => {
        console.error('Error occurred while logging out:', error);
      });
  }

  return (
    <>
      <nav className='flex justify-between items-center p-4 bg-gray-800 fixed text-white w-full top-0 z-20 px-8'>
        <div className='hidden sm:block' >
          <div className='flex space-x-3'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'}>Recipe App</NavLink>
            <NavLink to="/create-recipe" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'}>Create Recipe</NavLink>
            <NavLink to="/my-recipes" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'}>My Recipes</NavLink>
            <NavLink to="/saved-recipes" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'}>Saved Recipes</NavLink>
          </div>
        </div>
        <button className='sm:hidden text-4xl cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        {checkedLogin && <div>
          {userId ? (
            <button onClick={handleLogout} className='bg-red-500 text-white p-2 px-4 rounded cursor-pointer hover:bg-red-600 border border-transparent'>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className='border p-2 hover:bg-gray-300 hover:text-gray-600 inline-block'>Login/Register</NavLink>
          )}

        </div>}
        {!checkedLogin && <p className='p-2 border border-transparent'>Loading...</p>}
      </nav>
      <div className={`${isMenuOpen ? 'top-16' : '-top-40'} fixed z-10 left-0 w-full transition-all sm:hidden  duration-300 ease`}>
        <HumbergerMenu setIsMenuOpen={setIsMenuOpen} />
      </div>
    </>
  )
}

export default Nav
