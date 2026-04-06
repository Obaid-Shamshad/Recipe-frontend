import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function SavedRecipies() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipe/saved-recipes/' + window.localStorage.getItem('userId'), {
          withCredentials: true
        });
        if (response.data === "unauthorized") {
          alert("Please login to view saved recipes.")
          window.localStorage.removeItem("userId");
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
     <div className="min-h-screen">
       {savedRecipes.length > 0 && <h1 className='text-4xl font-bold text-center mt-20 mb-4'>Your Saved Recipes</h1>}
       <div className='m-4'>
         {savedRecipes && savedRecipes.map(recipe => {
          return <div className='flex justify-center mb-2' key={recipe._id}>
            <div className='flex flex-col gap-2 p-4 justify-center hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:shadow-gray-700 transition-shadow duration-300 rounded-md' key={recipe._id}>
            <Link to={"/read-recipe/" + recipe._id}>
              <div className='flex flex-col gap-2 p-4 bg-gray-300'>
                <h1 className='text-2xl '> {recipe.name} </h1>
                <img src={recipe.imageUrl} alt="recipe" className="w-64 h-64 object-cover" />
              </div>
            </Link>
          </div>
          </div>
        })
        }
       </div>
        {savedRecipes.length === 0 && <h1 className='flex justify-center items-center h-screen text-3xl'>You have no saved recipes.</h1>}
     </div>
    </>
  )
}

export default SavedRecipies
