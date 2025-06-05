import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// ProtectedRoute component for guarding routes
function ProtectedRoute() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status (cookie-based)
    axios
      .get('http://localhost:8500/api/auth/check', { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
    )
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
