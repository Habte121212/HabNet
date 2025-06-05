const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

// Controllers
const { registerUser, loginUser } = require('../controller/auth')

const social = require('../controller/social')

// Middleware
const auth = require('../middleware/auth')

// Register a new user (email/password)
router.post('/register', registerUser)

// Login existing user
router.post('/login', loginUser)

// Check if user is authenticated (for ProtectedRoute)
router.get('/check', auth, (req, res) => {
  res.status(200).json({ authenticated: true })
})

// Initiate Google login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

// Google callback (after login)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  social.googleCallback,
)

// Initiate GitHub login
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
)

// GitHub callback (after login)
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  social.githubCallback,
)

module.exports = router
