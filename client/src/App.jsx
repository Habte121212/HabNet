import './App.css'
import Register from './register/Register'
import Login from './login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ProtectedRoute'

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem' }}>
      Welcome to HabNet!
    </div>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000, style: { fontSize: '1rem' } }}
      />
    </>
  )
}

export default App
