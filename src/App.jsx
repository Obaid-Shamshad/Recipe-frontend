import React, { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Recipies from './Pages/Recipies'
import Footer from './components/Footer'
import NotFound from './Pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import ScrollToView from './components/ScrollToView'
import ProtectedRoutes from './components/ProtectedRoutes'
const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
const CreateRecipe = lazy(() => import('./Pages/CreateRecipe'));
const ReadRecipe = lazy(() => import('./Pages/ReadRecipe'));
const MyRecipe = lazy(() => import('./Pages/MyRecipe'));
const SavedRecipies = lazy(() => import('./Pages/SavedRecipies'));
const EditRecipe = lazy(() => import('./Pages/EditRecipe'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const UserPage = lazy(() => import('./Pages/UserPage'));
const TopRated = lazy(() => import('./Pages/TopRated'));
const Resetpass = lazy(() => import('./Pages/Resetpass'));
const Forgetpass = lazy(() => import('./Pages/Forgetpass'));
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'


function App() {
  const [checkedLogin, setCheckedLogin] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check-login', { withCredentials: true });
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
      <Nav checkedLogin={checkedLogin} />
      <Suspense fallback={<div className='flex justify-center items-center h-screen text-3xl'>Loading...</div>}>
        <ScrollToTop />
        <ScrollToView />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Recipies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/read-recipe/:recipeId" element={<ReadRecipe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/top-rated-recipes" element={<TopRated />} />
          <Route path="/reset-password/:id/:token" element={<Resetpass />} />
          <Route path="/forgot-password" element={<Forgetpass />} />
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
          <Route path="/create-recipe" element={
            <ProtectedRoutes>
              <CreateRecipe />
            </ProtectedRoutes>
          } />
          <Route path="/user" element={
            <ProtectedRoutes>
              <UserPage />
            </ProtectedRoutes>
          } />

        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
