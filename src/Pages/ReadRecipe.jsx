import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import LazyImage from '../components/Lazyimage';


function ReadRecipe() {
    const [readRecipe, setReadRecipe] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [recipeRating, setRecipeRating] = useState(null);
    const [avgRating, setAvgRating] = useState(null)
    const { recipeId } = useParams();

    const userId = window.localStorage.getItem("userId") || null;
    axios.defaults.withCredentials = true;

    const API_KEY = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        const fetchReadRecipe = async () => {
            try {
                const response = await axios.get(`${API_KEY}/recipe/get-read-recipe/`+ recipeId);
                setReadRecipe(response.data);
                setAvgRating(response.data.avgRating)
            } catch (error) {
                console.error('Error fetching read recipe:', error);
            }
        };

        const checkSavedRecipes = async () => {
            try {
                const savedRecipesResponse = await axios.get(`${API_KEY}/recipe/check-saved-recipes/` + userId);
                const savedRecipes = savedRecipesResponse.data;
                const isRecipeSaved = savedRecipes.some(recipe => recipe._id === recipeId);
                setIsSaved(isRecipeSaved);

            } catch (error) {
                console.error('Error checking saved recipes:', error);
            }
        };

        const getUserRating = async () => {
            try {
                const response = await axios.post(`${API_KEY}/rating/get-userRating`, {
                    userId, recipeId
                });
                setRecipeRating(response.data)

            } catch (error) {
                console.error("Error while getting user rating", error)
            }

        }

        if (userId) {
            checkSavedRecipes();
            getUserRating();
        }
        fetchReadRecipe();
    }, []);

    const handleSavedRecipe = async () => {
        try {
            let response = await axios.put(`${API_KEY}/recipe/save-recipe`, {
                userId: userId,
                recipeId: recipeId
            });
            if (response.data === "unauthorized") {
                window.localStorage.removeItem("userId");
                toast.warning("Please login to save recipes.")
                navigate("/login");
                return;
            }
            setIsSaved(true);
        } catch (error) {
            toast.error('Error saving recipe');
        }
    };

    const handleUnsaveRecipe = async () => {
        try {
            let response = await axios.put(`${API_KEY}/recipe/unsave-recipe`, {
                userId: userId,
                recipeId: recipeId
            });
            if (response.data === "unauthorized") {
                window.localStorage.removeItem("userId");
                toast.warning("Please login to view unsave recipes.")
                navigate("/login");
                return;
            }
            setIsSaved(false);
        } catch (error) {
            toast.error('Error unsaving recipe');
        }
    };

    const handleRating = async (rating) => {
        try {
            const response = await axios.post(`${API_KEY}/rating/rate-recipe`, {
                userId: userId,
                recipeId: recipeId,
                rating: rating
            });
            if (response.data === "unauthorized") {
                window.localStorage.removeItem("userId");
                toast.warning("Please login to rate recipes.")
                navigate("/login");
                return;
            }
            setRecipeRating(rating);
        } catch (error) {
            console.error('Error rating recipe:', error);
        }
    };


    return (
        <>
            <div className='min-h-screen p-2'>
                {readRecipe && <div className='flex justify-center mt-20 p-2' key={readRecipe._id}>
                    <div className='flex max-w-140 flex-col gap-2'>
                        <img src={readRecipe.imageUrl} alt="recipe" className="w-full aspect-4/3 object-cover" />
                        <div className='flex justify-between'>
                            <p className='text-2xl font-semibold'>{readRecipe.name}</p>
                            <div className='flex flex-col items-center'>
                                {avgRating > 0 && <div className='flex gap-2'>
                                    <div className='bg-gray-400 bg-clip-text w-fit flex justify-between'>
                                        <p className='bg-yellow-500 bg-clip-text text-transparent overflow' style={{ width: `${avgRating * 20}%` }}>★★★★★</p>
                                    </div>
                                    <p className='text-sm'>({avgRating})</p>
                                </div>}
                                {userId && <div>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`text-2xl cursor-pointer ${recipeRating >= star ? 'text-yellow-500' : 'text-gray-400'}`} onClick={() => handleRating(star)}>
                                            ★
                                        </span>
                                    ))}
                                </div>}
                            </div>

                        </div>
                        {userId && (
                            <button onClick={isSaved ? handleUnsaveRecipe : handleSavedRecipe} className=' bg-yellow-500 w-fit text-white hover:bg-yellow-600 p-1 px-2 rounded-md'>
                                {isSaved ? 'Unsave' : 'Save'}
                            </button>
                        )}
                        <div className='mt-4'>
                            <h1 className='text-xl font-semibold mb-2'>Ingradient</h1>
                            <p className='font-semibold'>{readRecipe.gradient}</p>
                        </div>
                        <p className='mt-6'>{readRecipe.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ad ducimus consequatur laboriosam commodi corrupti ipsa facere quo dicta odio libero, numquam earum maiores laudantium aliquam aperiam id perferendis voluptas?</p>
                    </div>
                </div>

                }
                <ToastContainer toastClassName="top-20" />
            </div>
        </>
    )
}

export default ReadRecipe
