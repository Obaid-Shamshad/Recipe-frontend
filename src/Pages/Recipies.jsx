import React, { useState, useEffect, useRef, lazy } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ImageSlider from '../components/ImageSlider'
import LazyImage from '../components/Lazyimage'



function Recipies() {
    const [recipes, setRecipes] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const cahceRef = useRef({
        "all": null,
        "last-7-days": null,
        "recent-10": null
    });

    useEffect(() => {
        const fetchRecipes = async (tab) => {
            if (cahceRef.current[tab]) {
                setRecipes(cahceRef.current[tab]);
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/recipe/get-recipies?type=' + tab);
                const result = response.data;
                if (tab == "all") {
                    for (let i = result.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * (i + 1));
                        [result[i], result[j]] = [result[j], result[i]];
                    }
                }
                setRecipes(result);
                cahceRef.current[tab] = response.data;
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes(activeTab);
    }, [activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className='min-h-screen'>
                <div><ImageSlider /></div>
                <div id="allRecipes" className='flex justify-center sm:justify-start gap-1 sm:px-4 md:mx-20 mt-12'>
                    <button onClick={() => handleTabClick("all")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "all" ? "bg-black text-white" : ""}`}>All</button>
                    <button onClick={() => handleTabClick("last-7-days")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "last-7-days" ? "bg-black text-white" : ""}`}>Last 7 days</button>
                    <button onClick={() => handleTabClick("recent-10")} className={`cursor-pointer sm:p-2 sm:px-4 p-1 px-2 font-semibold border rounded-4xl hover:bg-black hover:text-white ${activeTab === "recent-10" ? "bg-black text-white" : ""}`}>Recent 10 recipes</button>
                </div>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center gap-4 md:px-24 px-4 my-12'>
                    {recipes && recipes.map(recipe => {
                        return <div key={recipe._id} className='w-full'>
                            <Link to={"/read-recipe/" + recipe._id}>
                                <div className='flex flex-col gap-2 p-4 bg-gray-200 max-w-120 hover:bg-gray-300 duration-300 hover:scale-[1.01] rounded-md'>
                                    <h1 className='text-xl '> {recipe.name} </h1>
                                    <div className="w-full bg-gray-300 aspect-square object-cover">
                                        <LazyImage src={recipe.imageUrl} className="w-full aspect-square object-cover" />
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

export default Recipies
