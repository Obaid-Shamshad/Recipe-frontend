import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateRecipe() {
  const userId = window.localStorage.getItem("userId") || null
  const navigate = useNavigate()
  const [recipeData, setRecipeData] = useState({
    name: '',
    gradient: '',
    description: '',
    imageUrl: '',
    userId: window.localStorage.getItem("userId") || null
  })

   axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipeData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/recipe/create-recipe', recipeData)
      if (response.data === "unauthorized") {
        alert("Please login to create a recipe.")
        window.localStorage.removeItem("userId");
        navigate("/login");
        return;
      }
      navigate("/my-recipes")
    } catch (error) {
      console.error('Failed to create recipe:', error)
    }
  }

  return (
    <>
      <div className='flex justify-center bg-gray-300 items-center w-full min-h-screen'>
        <form onSubmit={handleSubmit} className='p-4 bg-white rounded-md mt-20 mb-2 shadow-md w-96'>
          <h1 className="text-2xl text-center font-bold mb-4">Create Recipe</h1>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="name" className='font-medium'>Recipe Name</label>
            <input type="text" id="name" name="name" value={recipeData.name} onChange={handleChange} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="gradient" className='font-medium'>Ingradient</label>
            <textarea type="text" id="gradient" name="gradient" value={recipeData.gradient} onChange={handleChange} className='p-1 h-16 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="description" className='font-medium'>Description</label>
            <textarea type="text" id="description" name="description" value={recipeData.description} onChange={handleChange} className='p-1 h-24 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="imageUrl" className='font-medium'>Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={recipeData.imageUrl} onChange={handleChange} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' />
          </div>
          <button type="submit" className='bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600'>Create Recipe</button>
        </form>
      </div>
    </>
  )
}

export default CreateRecipe
