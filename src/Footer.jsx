import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='bg-gray-800 text-white text-center sm:p-4 p-2'>
            <p className='text-center m-4 text-sm text-gray-400'>Enjoy your food by exploring our delicious recipes!</p>
            <div className='flex justify-around  gap-4 flex-wrap'>
                <div className='w-screen sm:w-auto'>
                    <h2 className="text-xl font-bold text-blue-700">RecipeHub 🍽️</h2>
                    <p className="text-gray-400 mt-2">
                        Cook. Share. Enjoy.
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <Link to="/#allRecipes" className="text-lg mt-2 hover:text-gray-300 hover:underline cursor-pointer">All Recipes</Link>
                    <Link to="/top-rated-recipes" className="text-lg mt-2 hover:text-gray-300 hover:underline cursor-pointer">Top Rated</Link>
                    <h3 className="text-lg mt-2 hover:text-gray-300 hover:underline cursor-pointer">Recently Added</h3>
                    <h3 className="text-lg mt-2 hover:text-gray-300 hover:underline cursor-pointer">Seasonal</h3>
                </div>
                <div className='flex flex-col items-center'>
                    <Link to="/about" className="text-lg mt-2 hover:text-gray-300 hover:underline cursor-pointer">About Us</Link>
                    <Link to="/contact" className="text-lg  mt-2 hover:text-gray-300 hover:underline cursor-pointer">Contact</Link>
                    <h3 className="text-lg  mt-2 hover:text-gray-300 hover:underline cursor-pointer">Privacy Policy</h3>
                    <h3 className="text-lg  mt-2 hover:text-gray-300 hover:underline cursor-pointer">Terms of Service</h3>
                </div>
            </div>
           <div className='flex gap-2 flex-col sm:flex-row justify-around mt-12'>
             <div className='sm:order-2'>
                <a href="#" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-white mx-2">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white mx-2">Instagram</a>
             </div>
             <p className='sm:order-1'>&copy; 2026 Recipe App. All rights reserved.</p>
           </div>
        </footer>
    )
}

export default Footer
