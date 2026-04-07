import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ImageSlider from '../ImageSlider'



function Recipies() {
    const [recipies, setRecipies] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
   const cahceRef = useRef({
        "all": null,
        "last-7-days": null,
        "recent-10": null
   });
 
    useEffect(() => {
        const fetchRecipies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipe/get-recipies');
                setRecipies(response.data);
            } catch (error) {
                console.error('Error fetching recipies:', error);
            }
        };

        fetchRecipies();
    }, []);
 
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (cahceRef.current[tab]) {
            setRecipies(cahceRef.current[tab]);
            return;
        }
        axios.get('http://localhost:5000/recipe/get-recipies?type=' + tab)
            .then(response => {
                setRecipies(response.data);
                cahceRef.current[tab] = response.data;
            })
            .catch(error => {
                console.error('Error fetching recipies:', error);
            });
    };

    return (
        <>
          <div className='min-h-screen'>
              <div><ImageSlider /></div>
            <div id="allRecipes" className='flex justify-center sm:justify-start gap-1 mx-4 md:mx-24 mt-12'>
                <button onClick={() => handleTabClick("all")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "all" ? "bg-black text-white" : ""}`}>All</button>
                <button onClick={() => handleTabClick("last-7-days")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "last-7-days" ? "bg-black text-white" : ""}`}>Last 7 days</button>
                <button onClick={() => handleTabClick("recent-10")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "recent-10" ? "bg-black text-white" : ""}`}>Recent 10 recipies</button>
            </div>
            <div  className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center gap-4 md:px-24 px-4 my-12'>
                {recipies && recipies.map(recipe => {
                    return <div key={recipe._id}>
                        <Link to={"/read-recipe/" + recipe._id}>
                            <div className='flex flex-col gap-2 p-4 bg-gray-100 hover:bg-gray-300 duration-300 hover:scale-[1.01] rounded-md'>
                                <h1 className='text-2xl '> {recipe.name} </h1>
                                <img src={recipe.imageUrl} alt="recipe" className="w-68 aspect-square object-cover" />
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

export default Recipies
