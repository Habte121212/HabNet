import React, { useState } from 'react'
import './register.scss'

const Register = () => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate registration delay
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      // After animation, redirect to login
      setTimeout(() => {
        window.location.href = '/login'
      }, 1400) // Show success for 1.4s
    }, 1200) // Simulate API call
  }

  return (
    <div className="register">
      <div className="registerContainer">
        <h1>Register</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            required
            className={success ? 'success' : ''}
            disabled={loading || success}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={success ? 'success' : ''}
            disabled={loading || success}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={success ? 'success' : ''}
            disabled={loading || success}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className={success ? 'success' : ''}
            disabled={loading || success}
          />
          <button
            type="submit"
            className={success ? 'success' : ''}
            disabled={loading || success}
          >
            {loading ? (
              <span className="loader"></span>
            ) : success ? (
              <span className="checkmark">&#10003;</span>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="socialLogin">
          <button
            type="button"
            className="socialBtn facebook"
            disabled={loading || success}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"
                fill="#1877F2"
              />
              <path
                d="M16.671 24v-9.294h3.12l.467-3.622h-3.587V8.771c0-1.048.293-1.763 1.797-1.763l1.918-.001v-3.24c-.334-.044-1.472-.143-2.797-.143-2.766 0-4.659 1.688-4.659 4.788v2.127H9.692v3.622h3.128V24h3.851z"
                fill="#fff"
              />
            </svg>
            Continue with Facebook
          </button>
          <button
            type="button"
            className="socialBtn google"
            disabled={loading || success}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              style={{ marginRight: '8px' }}
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.36 30.77 0 24 0 14.82 0 6.73 5.1 2.69 12.55l7.98 6.2C12.36 13.13 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.04l7.19 5.59C43.98 37.36 46.1 31.45 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.67 28.75c-1.01-2.97-1.01-6.18 0-9.15l-7.98-6.2C.99 17.1 0 20.43 0 24c0 3.57.99 6.9 2.69 10.1l7.98-6.2z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.59c-2.01 1.35-4.6 2.15-8.71 2.15-6.26 0-11.64-3.63-13.33-8.7l-7.98 6.2C6.73 42.9 14.82 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
        <p>
          Already have an account? <a href="/login">sign in</a>
        </p>
      </div>
      <footer className="authFooter">
        <small>&copy; 2025 HabNet. Developed by Habtamu Amare.</small>
      </footer>
    </div>
  )
}

export default Register
