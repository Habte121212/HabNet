import './App.css'
import Register from './register/Register'
import Login from './login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
