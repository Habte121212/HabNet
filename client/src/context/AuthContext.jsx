import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  )

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:8500/api/auth/me', {
          withCredentials: true,
        })
        setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      } catch (e) {
        setCurrentUser(null)
        localStorage.removeItem('user')
      }
    }
    checkAuth()
  }, [])

  const login = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:8500/api/auth/login',
        formData,
        { withCredentials: true },
      )
      setCurrentUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login error:', error.response.data)
      }
      throw error
    }
  }

  // add logout

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  )
}
