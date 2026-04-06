import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoutes({ children }) {
    const userId = window.localStorage.getItem("userId") || null;
    if (!userId) {
        alert("Please login to access this page.")
        window.localStorage.removeItem("userId");
        return <Navigate to="/login" />;
        
    }
    return children;

}

export default ProtectedRoutes;
