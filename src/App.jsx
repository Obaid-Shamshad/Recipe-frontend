import React, { useEffect, useState} from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Nav from './Nav'
import Recipies from './Pages/Recipies'
import CreateRecipe from './Pages/CreateRecipe'
import ReadRecipe from './Pages/ReadRecipe'
import MyRecipe from './Pages/MyRecipe'
import SavedRecipies from './Pages/SavedRecipies'
import ProtectedRoutes from './ProtectedRoutes'
import EditRecipe from './Pages/EditRecipe' 
import ImageSlider from './ImageSlider'
import NotFound from './Pages/NotFound'
import Footer from './Footer'
import About from './Pages/About'
import Contact from './Pages/Contact'
import ScrollToTop from './ScrollToTop'
import ScrollToView from './ScrollToView'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [checkedLogin, setCheckedLogin] = useState(false);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/check-login', { withCredentials: true }  );
                if (response.data === "unauthorized") {
                    window.localStorage.removeItem("userId");
                }
                setCheckedLogin(true);
            } catch (error) {
                console.error('Error checking login status:', error);
                setCheckedLogin(true);
            }
        }
        checkLoginStatus();
    }, []);
     
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToView />
      <Nav checkedLogin={checkedLogin} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Recipies />} />
        <Route path="/imageslider" element={<ImageSlider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/read-recipe/:recipeId" element={<ReadRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-recipes" element={
          <ProtectedRoutes>
            <MyRecipe />
          </ProtectedRoutes>
        } />
        <Route path="/saved-recipes" element={
          <ProtectedRoutes>
            <SavedRecipies />
          </ProtectedRoutes>
        } />
        <Route path="/edit-recipe/:recipeId" element={
          <ProtectedRoutes>
            <EditRecipe />
          </ProtectedRoutes>
        } />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
