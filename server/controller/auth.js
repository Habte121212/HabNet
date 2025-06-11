const User = require('../models/User')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER USER

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // Validate input
    const schema = Joi.object({
      name: Joi.string().min(3).max(39).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    })
    const { error } = schema.validate({
      name: name?.trim(),
      email: email?.trim(),
      password: password?.trim(),
    })
    if (error) {
      return res
        .status(400)
        .json({ message: 'Validation error', details: error.details })
    }


    // Check for existing user
    const existingUser = await User.findOne({ email: email.trim() })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password.trim(), salt)
    // Create user
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    })
    await user.save()
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    )
    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// LOGIN USER

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // Validate input
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    })
    const { error } = schema.validate({
      email: email?.trim(),
      password: password?.trim(),
    })
    if (error) {
      return res
        .status(400)
        .json({ message: 'Validation error', details: error.details })
    }
    // Find user
    const user = await User.findOne({ email: email.trim() })
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' })

    // Prevent login if registered with social provider
    if (user.provider && user.provider !== 'local') {
      return res
        .status(400)
        .json({ message: `Please log in with ${user.provider}` })
    }

    // Check password
    const isMatch = await bcrypt.compare(password.trim(), user.password)
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' })

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    )
    
    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.status(200).json({ message: 'User logged in successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// logout user 
const logoutuser = async (req, res) => {
  try {
    res.clearCookie('access_token', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    })
    .status(200)
    .json({ message: 'user logged out successfully' })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error'})
    
  }
}

module.exports = { registerUser, loginUser, logoutuser }
