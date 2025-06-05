import React, { useState } from 'react'
import axios from 'axios'
import '../register/register.scss'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format.')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required'),
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')
  const navigate = useNavigate()

  // Social login handlers (fixed for OAuth)
  const handleGitHubLogin = async () => {
    setSocialLoading('github')
    try {
      window.location.href = '/api/auth/github'
    } catch {
      setSocialLoading('')
      toast.error('GitHub login failed. Please try again.')
    }
  }
  const handleGoogleLogin = async () => {
    setSocialLoading('google')
    try {
      window.location.href = '/api/auth/google'
    } catch {
      setSocialLoading('')
      toast.error('Google login failed. Please try again.')
    }
  }

  // Generic error toast component (unified, no custom style)
  function ErrorToast({ id, error, touched, value }) {
    React.useEffect(() => {
      if (touched && error && value) {
        toast.dismiss(id)
        toast.error('❌ ' + error, {
          id,
          duration: 2200,
        })
      } else {
        toast.dismiss(id)
      }
    }, [error, touched, value, id])
    return null
  }

  return (
    <div className="register">
      <div className="registerContainer">
        <h1>Login</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (values, { setSubmitting }) => {
            toast.dismiss()
            setSubmitting(true)
            setLoading(true)
            try {
              await axios.post(
                'http://localhost:8500/api/auth/login',
                {
                  email: values.email,
                  password: values.password,
                },
                { withCredentials: true },
              )
              setLoading(false)
              setSuccess(true)
              toast.dismiss()
              toast.success('🎉 Login successful!...', {
                id: 'login-success',
                duration: 1800,
              })
              setTimeout(() => {
                navigate('/')
              }, 1400)
            } catch (err) {
              setLoading(false)
              toast.dismiss()
              let msg =
                err.response?.data?.message || 'Login failed. Please try again.'
              let icon = '❌'
              // Special case for social login required
              if (msg.toLowerCase().includes('log in with')) {
                msg = err.response?.data?.message
              }
              toast.error(`${icon} ${msg}`, {
                id: 'login-error',
                duration: 2600,
              })
            }
            setSubmitting(false)
          }}
        >
          {({ errors, touched, isSubmitting, handleBlur, values }) => (
            <>
              <ErrorToast
                id="validation-email"
                error={errors.email}
                touched={touched.email}
                value={values.email}
              />
              <ErrorToast
                id="validation-password"
                error={errors.password}
                touched={touched.password}
                value={values.password}
              />
              <Form className="registerForm" autoComplete="off">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  disabled={loading || success}
                  className={
                    success
                      ? 'success'
                      : errors.email && touched.email
                      ? 'error'
                      : ''
                  }
                  onBlur={handleBlur}
                  style={
                    !success && errors.email && touched.email
                      ? {
                          border: '1.5px solid #ff3b3b',
                          background: 'rgba(40,0,0,0.08)',
                        }
                      : {}
                  }
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={loading || success}
                  className={
                    success
                      ? 'success'
                      : errors.password && touched.password
                      ? 'error'
                      : ''
                  }
                  onBlur={handleBlur}
                  style={
                    !success && errors.password && touched.password
                      ? {
                          border: '1.5px solid #ff3b3b',
                          background: 'rgba(40,0,0,0.08)',
                        }
                      : {}
                  }
                />
                <button
                  type="submit"
                  onClick={() => {
                    if (errors.email && !touched.email) {
                      toast.dismiss('validation-email')
                      toast.error('❌ ' + errors.email, {
                        id: 'validation-email',
                      })
                    }
                    if (errors.password && !touched.password) {
                      toast.dismiss('validation-password')
                      toast.error('❌ ' + errors.password, {
                        id: 'validation-password',
                      })
                    }
                  }}
                  className={
                    !success && (errors.email || errors.password)
                      ? 'registerBtn errorBtn'
                      : success
                      ? 'registerBtn success'
                      : 'registerBtn'
                  }
                  disabled={loading || success || isSubmitting}
                  style={
                    !success && (errors.email || errors.password)
                      ? {
                          border: '2px solid #ff2222',
                          background:
                            'linear-gradient(90deg, #ff2222 0%, #ff5555 100%)',
                          color: '#fff',
                          boxShadow: '0 0 0 2px #ff222288',
                          transition: 'all 0.2s',
                        }
                      : {
                          background:
                            'linear-gradient(90deg, #1e2a3a 0%, #2e3b4e 100%)',
                          color: '#fff',
                          border: 'none',
                          boxShadow: '0 2px 12px 0 rgba(30,32,40,0.12)',
                          transition: 'all 0.2s',
                        }
                  }
                >
                  {loading || isSubmitting ? (
                    <span className="loader"></span>
                  ) : success ? (
                    <span className="checkmark">&#10003; Login Success</span>
                  ) : (
                    'Login'
                  )}
                </button>
              </Form>
            </>
          )}
        </Formik>
        <div className="socialLogin">
          <button
            type="button"
            className={`socialBtn github${
              socialLoading === 'github' ? ' loading' : ''
            }`}
            disabled={loading || success || socialLoading}
            onClick={handleGitHubLogin}
            style={{
              background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 12px 0 rgba(30,32,40,0.12)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0.7rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '12px',
              transition: 'all 0.2s',
              opacity: socialLoading === 'github' ? 0.7 : 1,
              cursor:
                loading || success || socialLoading ? 'not-allowed' : 'pointer',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <circle cx="12" cy="12" r="12" fill="#181717" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                fill="#fff"
              />
            </svg>
            {socialLoading === 'github' ? (
              <span className="loader"></span>
            ) : (
              'Continue with GitHub'
            )}
          </button>

          <button
            type="button"
            className={`socialBtn google${
              socialLoading === 'google' ? ' loading' : ''
            }`}
            disabled={loading || success || socialLoading}
            onClick={handleGoogleLogin}
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
            {socialLoading === 'google' ? (
              <span className="loader"></span>
            ) : (
              'Continue with Google'
            )}
          </button>
        </div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <footer className="authFooter">
        <small>&copy; 2025 HabNet. Developed by Habtamu Amare.</small>
      </footer>
    </div>
  )
}

export default Login
