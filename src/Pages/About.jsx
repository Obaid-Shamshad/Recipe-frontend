import React,{useState} from 'react'
import StoryData from '../Data/Static'

function About() {
    const [storyData, setStoryData] = useState(StoryData);
   
  return (
    <div>
        <h1 className='text-4xl font-bold text-center mt-20'>About Recipe App</h1>
        <div className='grid md:grid-cols-2 grid-cols-1 p-2 place-items-center gap-4 sm:p-16 md:px-8 my-6'>
        <img src="./foodimg1.png" alt="food image" className='md:order-1 w-full md:w-auto'/>
        <p className='text-lg text-gray-700 md:order-2'>{StoryData[0]}</p>
        <img src="./foodimg2.png" alt="food image" className='md:order-4 w-full md:w-auto'/>
        <p className='text-lg text-gray-700 md:order-3'>{StoryData[1]}</p>
        <img src="./foodimg3.png" alt="food image" className='md:order-5 w-full md:w-auto'/>
        <p className='text-lg text-gray-700 md:order-6'>{StoryData[2]}</p>
        <img src="./foodimg4.png" alt="food image" className='md:order-8 w-full md:w-auto'/>
        <p className='text-lg text-gray-700 md:order-7'>{StoryData[3]}</p>
        <img src="./foodimg5.png" alt="food image" className='md:order-9 w-full md:w-auto'/>
        <p  className='text-lg text-gray-700 md:order-10'>{StoryData[4]}</p>
       </div>
    </div>
  )
} 

export default About

