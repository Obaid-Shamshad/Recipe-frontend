import React from 'react'
import { NavLink } from 'react-router-dom'

function HumbergerMenu({setIsMenuOpen}) {
 const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
        <div className='flex flex-col gap-4 p-8 w-full bg-gray-700 text-white'>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'} onClick={handleLinkClick}>Recipe App</NavLink>
          <NavLink to="/create-recipe" className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'} onClick={handleLinkClick}>Create Recipe</NavLink>
          <NavLink to="/my-recipes"  className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'} onClick={handleLinkClick}>My Recipes</NavLink>
          <NavLink to="/saved-recipes"  className={({ isActive }) => isActive ? 'text-gray-300' : 'hover:underline hover:text-gray-300'} onClick={handleLinkClick}>Saved Recipes</NavLink>
        </div>
  )
}

export default HumbergerMenu
