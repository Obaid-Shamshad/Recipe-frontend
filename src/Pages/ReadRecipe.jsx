import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function ReadRecipe() {
    const [readRecipe, setReadRecipe] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const { recipeId } = useParams();

    const userId = window.localStorage.getItem("userId") || null;


    useEffect(() => {
        const fetchReadRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipe/get-read-recipie/' + recipeId);
                setReadRecipe(response.data);
            } catch (error) {
                console.error('Error fetching read recipe:', error);
            }
        };

        const checkSavedRecipes = async () => {
            try {
                const savedRecipesResponse = await axios.get('http://localhost:5000/recipe/check-saved-recipes/' + userId);
                const savedRecipes = savedRecipesResponse.data;
                const isRecipeSaved = savedRecipes.some(recipe => recipe._id === recipeId);
                setIsSaved(isRecipeSaved);
            } catch (error) {
                console.error('Error checking saved recipes:', error);
            }
        };

        if (userId) {
            checkSavedRecipes();
        }
        fetchReadRecipe();
    }, []);

    const handleSavedRecipe = async () => {
        try {
            await axios.put('http://localhost:5000/recipe/save-recipe', {
                userId: userId,
                recipeId: recipeId
            });
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handleUnsaveRecipe = async () => {
        try {
            await axios.put('http://localhost:5000/recipe/unsave-recipe', {
                userId: userId,
                recipeId: recipeId
            });
            setIsSaved(false);
        } catch (error) {
            console.error('Error un saving recipe:', error);
        }
    };


    return (
        <>
            {readRecipe && <div className='flex justify-center min-h-screen mt-20 p-2' key={readRecipe._id}>
                <div className='flex w-140 flex-col gap-3'>
                    <img src={readRecipe.imageUrl} alt="recipe" className="w-140 aspect-4/3 object-cover" />
                    <div className='flex justify-between'>
                        <p className='text-2xl font-semibold'>{readRecipe.name}</p>
                        <p className='text-2xl text-yellow-500 fill-amber-500'>★☆</p>
                    </div>
                    {userId && (
                        <button onClick={isSaved ? handleUnsaveRecipe : handleSavedRecipe} className=' bg-yellow-500 w-fit text-white hover:bg-yellow-600 p-1 px-2 rounded-md'>
                            {isSaved ? 'Unsave' : 'Save'}
                        </button>
                    )}
                    <div>
                        <h1 className='text-xl font-semibold mb-2'>Ingradient</h1>
                        <p className='font-semibold'>{readRecipe.gradient}</p>
                    </div>
                    <p>{readRecipe.description}</p>
                </div>
            </div>

            }
        </>
    )
}

export default ReadRecipe
