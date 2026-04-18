import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Model from '../components/Model'
import { ToastContainer, toast } from 'react-toastify';
import LazyImage from '../components/Lazyimage'




function MyRecipe() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const userId = window.localStorage.getItem("userId") || null;
  const API_KEY = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(`${API_KEY}/recipe/get-my-recipes/`+ userId, {
          withCredentials: true
        });
        if (response.data === "unauthorized") {
          window.localStorage.removeItem("userId");
          toast.warning("Please login to see your recipes.")
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
  const deleting = (recipeId) => {
    setRecipeToDelete(recipeId);
    setIsDeleting(true);
    document.body.style.overflow = 'hidden';
  }

  const handleDelete = async (recipeId) => {
    setIsDeleting(false);
    document.body.style.overflow = 'auto';
    try {
      const response = await axios.delete(`${API_KEY}/recipe/delete-recipe/` + recipeId, {
        withCredentials: true
      });
     if(response.data.status == "success") {
       setMyRecipes(myRecipes.filter(recipe => recipe._id !== recipeId));
      toast.success("recipe deleted")
     }
    } catch (error) {
      toast.error('Error deleting recipe');
    }
  };


  const closeModel = () => {
    setIsDeleting(false);
    setRecipeToDelete(null);
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <div className='min-h-screen p-2'>
        {myRecipes.length > 0 && <h1 className='text-4xl font-bold text-center mt-20 mb-4'>My Recipes</h1>}
        <div className='flex flex-col items-center mb-2'>
          {myRecipes && myRecipes.map(recipe => {
            return <div className='w-full' key={recipe._id}>
              <div className='p-4 m-auto max-w-72 hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:shadow-gray-700 transition-shadow duration-300 rounded-md flex flex-col'>
                <div className='flex flex-col gap-2 p-4  bg-gray-200'>
                  <Link to={"/read-recipe/" + recipe._id}>
                    <div>
                      <h1 className='text-2xl mb-2'> {recipe.name} </h1>
                      <div className="w-full bg-gray-300 aspect-square">
                        <LazyImage src={recipe.imageUrl} className="w-full aspect-square object-cover" />
                      </div>
                    </div>
                  </Link>
                  <div className='flex gap-2'>
                    <button onClick={() => handleEdit(recipe._id)} className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 px-4'>Edit</button>
                    <button onClick={() => deleting(recipe._id)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 px-4'>Delete</button>
                  </div>
                </div>

              </div>
            </div>


          })
          }
        </div>
        {userId && myRecipes.length === 0 && <h1 className='flex justify-center items-center h-screen text-3xl'>You have not created any recipe yet.</h1>}
        {isDeleting && <Model onClose={closeModel} onConfirm={() => handleDelete(recipeToDelete)} title="Are you sure you want to delete this recipe?" />}

        <ToastContainer toastClassName="top-20" />
      </div>
    </>
  )
}

export default MyRecipe
