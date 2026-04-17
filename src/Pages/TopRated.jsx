import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import LazyImage from '../components/Lazyimage'

function TopRated() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipe/topRated-recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            <div className='min-h-screen'>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center gap-2 md:px-24 px-4 my-24'>
                    {recipes && recipes.map(recipe => {
                        return <div key={recipe._id} className='w-full'>
                            <Link to={"/read-recipe/" + recipe._id}>
                                <div className='flex flex-col gap-2 p-4 bg-gray-100 max-w-120 hover:bg-gray-300 duration-300 hover:scale-[1.01] rounded-md'>
                                    <h1 className='text-xl '> {recipe.name} </h1>
                                    <div className="w-full bg-gray-300 aspect-square">
                                        <LazyImage src={recipe.imageUrl} className="w-full bg-gray-300 aspect-square object-cover" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })
                    }
                </div>
            </div>

        </>
    )
}

export default TopRated
