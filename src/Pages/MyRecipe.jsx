import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Model from '../Model'




function MyRecipe() {
  const [myRecipes, setMyRecipes] = useState([]);
  const userId = window.localStorage.getItem("userId") || null;
  const [isDeleting, setIsDeleting] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipe/get-my-recipes/' + userId, {
          withCredentials: true
        });
        if (response.data === "unauthorized") {
          alert("Please login to see your recipes.")
          window.localStorage.removeItem("userId");
          navigate("/login");
          return;
        }
        setMyRecipes(response.data);
      } catch (error) {
        console.error('Error fetching my recipes:', error);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleEdit = (recipeId) => {
    navigate("/edit-recipe/" + recipeId);
  }

  const handleDelete = async (recipeId) => {
    setIsDeleting(false);
    try {
      const response = await axios.delete('http://localhost:5000/recipe/delete-recipe/' + recipeId, {
        withCredentials: true
      });
      // Remove the deleted recipe from the state
      setMyRecipes(myRecipes.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const deleting = (recipeId) => {
    setRecipeToDelete(recipeId);
    setIsDeleting(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModel = () => {
    setIsDeleting(false);
    setRecipeToDelete(null);
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <div className='min-h-screen'>
       {myRecipes.length > 0 && <h1 className='text-4xl font-bold text-center mt-20 mb-4'>My Recipes</h1>}
        {myRecipes && myRecipes.map(recipe => {
          return <div className='flex justify-center mb-2' key={recipe._id}>
            <div className='p-4 hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:shadow-gray-700 transition-shadow duration-300 rounded-md '>
              <div className='flex flex-col gap-2 p-4  bg-gray-300'>
                <Link to={"/read-recipe/" + recipe._id}>
                  <div>
                    <h1 className='text-2xl '> {recipe.name} </h1>
                    <img src={recipe.imageUrl} alt="recipe" className="w-64 h-64 object-cover" />
                  </div>
                </Link>
                <div className='flex gap-2'>
                  <button onClick={() => handleEdit(recipe._id)} className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 px-4'>Edit</button>
                  <button onClick={() => deleting(recipe._id)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 px-4'>Delete</button>
                </div>
              </div>
            </div>
            {myRecipes.length === 0 && <h1 className='flex justify-center items-center h-screen text-3xl'>You have no recipes.</h1>}

          </div>

        })
        }

        {isDeleting && <Model onClose={closeModel} onConfirm={() => handleDelete(recipeToDelete)} title="Are you sure you want to delete this recipe?" />}


      </div>
    </>
  )
}

export default MyRecipe
