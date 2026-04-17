import React, {useState, useEffect, useRef, use} from 'react'
import { useNavigate } from 'react-router-dom';

function ImageSlider() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [isPaused, setIsPaused] = useState(false);
 const sliderRef = useRef(null);
 const navigate = useNavigate();



  const images = [
    './food1.jpg',
    './food2.png',  
    './food3.png',
    './food4.png',
    './food5.png',
  ]

useEffect(() => { 
   if (!isPaused) {
    sliderRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    } 
  return () => {
    clearInterval(sliderRef.current);
  }
}, [isPaused])



  return (
  <>
    <div className='h-64 sm:h-96 overflow-hidden relative mt-20 mx-4 md:mx-24' onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      
      <div className='flex  h-full overflow-hidden'>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className='  object-cover aspect-9/3 transition-transform duration-1000' style={{ transform: `translateX(-${currentIndex * 100}%)` }} />
        ))}
      </div>
      <div className='flex justify-center gap-3 absolute bottom-4 left-1/2 transform -translate-x-1/2'>
        {images.map((_, index) => (
          <button key={index} className={`w-3 h-3 rounded-full mx-1 border border-white cursor-pointer ${currentIndex === index ? 'bg-blue-500' : 'bg-transparent'}`} onClick={() => setCurrentIndex(index)}></button>
        ))}
      </div>
      {isPaused && <p className='absolute top-4 left-2 sm:left-8 text-white '>Cook, share and enjoy world of flavors!</p>}
      {isPaused && <button className='absolute bottom-12 left-2 sm:left-8 sm:bottom-4  border border-white text-white px-2 py-1 rounded-md cursor-pointer hover:bg-white hover:text-black hover:block' onClick={() => navigate('/create-recipe')}>Create Recipe</button>}
    </div>
  </>
  
  )
}

export default ImageSlider
