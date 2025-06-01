import React, { useState } from 'react'
import './login.scss'

const Login = () => {
  const [showForgot, setShowForgot] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleForgot = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => {
        setShowForgot(false)
        setSent(false)
      }, 1800)
    }, 1200)
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Login</h1>
        <form className="loginForm">
          <input
            type="email"
            placeholder="Email"
            required
            disabled={showForgot}
          />
          <input
            type="password"
            placeholder="Password"
            required
            disabled={showForgot}
          />
          <button type="submit" disabled={showForgot}>
            Login
          </button>
        </form>
        <div className="socialLogin">
          <button
            type="button"
            className="socialBtn facebook"
            disabled={showForgot}
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
            disabled={showForgot}
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
          <button
            type="button"
            className="forgotBtn"
            onClick={() => setShowForgot(true)}
            disabled={showForgot}
            aria-label="Forgot password?"
            tabIndex={0}
            autoFocus={showForgot}
          >
            Forgot password?
          </button>
        </p>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
        {showForgot && (
          <div
            className="forgotModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resetPasswordTitle"
          >
            <form className="forgotForm" onSubmit={handleForgot}>
              <h2 id="resetPasswordTitle">Reset Password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || sent}
                className={sent ? 'success' : ''}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || sent}
                className={sent ? 'success' : ''}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : sent ? (
                  <span className="checkmark">&#10003;</span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              {sent && (
                <div className="successMsg">
                  Check your email for reset instructions!
                </div>
              )}
              <button
                type="button"
                className="closeBtn"
                onClick={() => setShowForgot(false)}
                disabled={loading}
                aria-label="Close forgot password dialog"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
      <footer className="authFooter">
        <small>&copy; 2025 HabNet. Developed by Habtamu Amare.</small>
      </footer>
    </div>
  )
}

export default Login
