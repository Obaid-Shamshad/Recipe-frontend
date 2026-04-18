import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LazyImage from '../components/Lazyimage'


function SavedRecipies() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");

  const API_KEY = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`${API_KEY}/recipe/saved-recipes/`+ userId, {
          withCredentials: true
        });
        if (response.data === "unauthorized") {
          window.localStorage.removeItem("userId");
          alert("Please login to view saved recipes.")
          navigate("/login");
          return;
        }
        setSavedRecipes(response.data);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <>
      <div className="min-h-screen p-2">
        {savedRecipes.length > 0 && <h1 className='text-4xl font-bold text-center mt-20 mb-4'>Your Saved Recipes</h1>}

        {savedRecipes && savedRecipes.map(recipe => {
          return <div className='flex justify-center mb-2' key={recipe._id}>
            <div className='w-full'>
              <div className='flex max-w-72 mx-auto flex-col gap-2 p-4 justify-center hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:shadow-gray-700 transition-shadow duration-300 rounded-md' key={recipe._id}>
                <Link to={"/read-recipe/" + recipe._id}>
                  <div className='flex flex-col gap-2 p-4 bg-gray-200 '>
                    <h1 className='text-2xl '> {recipe.name} </h1>
                    <div className="w-full bg-gray-300 aspect-square">
                      <LazyImage src={recipe.imageUrl} className="w-full aspect-square object-cover" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        })
        }

        {userId && savedRecipes.length === 0 && <h1 className='flex justify-center items-center h-screen text-3xl'>You have no saved recipes.</h1>}
      </div>
    </>
  )
}

export default SavedRecipies
