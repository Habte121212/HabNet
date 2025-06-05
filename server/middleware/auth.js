const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = (req, res, next) => {
  // Passport session-based auth
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next()
  }
  // JWT auth
  const authHeader = req.headers['authorization']
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      return next()
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
module.exports = auth
