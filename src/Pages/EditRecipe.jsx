import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function EditRecipe() {
    const { recipeId } = useParams();
    const userId = window.localStorage.getItem("userId") || null
    
    const [recipeData, setRecipeData] = useState({
        name: '',
        gradient: '',
        description: '',
        imageUrl: '',
        userId: userId
    })

    
    

    useEffect(() => {
        const fetchEditRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipe/get-edit-recipe/' + recipeId, {
                    withCredentials: true
                });
                if (response.data === "unauthorized") {
                    alert("Please login to see this recipe.")
                    window.localStorage.removeItem("userId");
                    navigate("/login");
                    return;
                }
                setRecipeData({
                    name: response.data.name,
                    gradient: response.data.gradient,
                    description: response.data.description,
                    imageUrl: response.data.imageUrl,
                    userId: response.data.userId
                })
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchEditRecipe();
    }, [recipeId]);


    const navigate = useNavigate()
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
            const response = await axios.put('http://localhost:5000/recipe/edit-recipe/' + recipeId, recipeData)
            if (response.data === "unauthorized") {
                alert("Please login to edit this recipe.")
                window.localStorage.removeItem("userId");
                navigate("/login");
                return;
            }
            navigate("/my-recipes")
        } catch (error) {
            console.error('Failed to edit recipe:', error)
        }
    }

    return (
        <div>
            <div className='flex justify-center bg-gray-300 items-center h-screen fixed top-0 left-0 w-full '>
                <form onSubmit={handleSubmit} className='p-4 bg-white rounded-md mt-28 md:mt-20 shadow-md w-96'>
                    <h1 className="text-2xl text-center font-bold mb-4">Edit Recipe</h1>
                    <div className='mb-4 flex flex-col gap-1'>
                        <label htmlFor="name" className='font-medium'>Recipe Name</label>
                        <input type="text" id="name" name="name" value={recipeData.name} onChange={handleChange} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
                    </div>
                    <div className='mb-4 flex flex-col gap-1'>
                        <label htmlFor="gradient" className='font-medium'>Gradient</label>
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
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600'>Edit Recipe</button>
                </form>
            </div>
        </div>
    )
}

export default EditRecipe
