import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext)
  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  // Otherwise, render the child routes
  return <Outlet />
}

export default ProtectedRoute
