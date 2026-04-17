import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoutes({ children }) {
    const userId = window.localStorage.getItem("userId") || null;
    if (!userId) {
        return <Navigate to="/login" />;
        
    }
    return children;

}

export default ProtectedRoutes;
