import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import Leftbar from './components/leftbar/LeftBar.jsx'
import RightBar from './components/rightbar/RightBar.jsx'
import Home from './components/home/Home.jsx'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <div className="main-content">
                    <Leftbar />
                    <Home />
                    <RightBar />
                  </div>
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000, style: { fontSize: '1rem' } }}
      />
    </AuthContextProvider>
  )
}

export default App
