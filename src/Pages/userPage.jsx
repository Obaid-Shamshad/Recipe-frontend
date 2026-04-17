import React from 'react'
import { Link } from 'react-router-dom'

function userPage() {
    return (
        <>
            <div className='min-h-screen  flex flex-col items-center'>
                <h1 className='mt-24 text-2xl italic'>Create and enjoy your recipes</h1>
                <div className='flex justify-center  flex-wrap max-w-200 gap-8 mt-12 mb-6'>
                    <Link to="/my-recipes">
                        <div className='flex flex-col items-center gap-8 w-76  py-8 px-2 shadow-gray-400 cursor-pointer shadow-lg bg-purple-200 hover:bg-purple-300 tanstion-all duration-300 rounded-lg '>
                            <h1 className='text-2xl font-semibold'>My Recipes</h1>
                            <p className='text-gray-600 text-lg'>Click here to see you recipes</p>
                        </div>
                    </Link>
                    <Link to="/saved-recipes">
                        <div className='flex flex-col items-center gap-8 p-8 w-76 shadow-gray-400 cursor-pointer shadow-lg bg-purple-200 rounded-lg py-8 px-2 hover:bg-purple-300 tanstion-all duration-300 '>
                            <h1 className='text-2xl font-semibold'>Saved Recipes</h1>
                            <p className='text-gray-600 text-lg'>Click here to see your saved recipes</p>
                        </div>
                    </Link>
                    <Link to="/create-recipe">
                        <div className='flex flex-col items-center gap-8  p-8 w-76 shadow-gray-400 cursor-pointer shadow-lg bg-purple-200 rounded-lg py-8 px-2 hover:bg-purple-300 tanstion-all duration-300 '>
                            <h1 className='text-2xl font-semibold'>Create Recipes</h1>
                            <p className='text-gray-600 text-lg'>Click here to create recipes</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default userPage
