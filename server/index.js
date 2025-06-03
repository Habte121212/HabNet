const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const ConnectDB = require('./db/dbConfig')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Initialize express
const app = express()

// ====== Middleware ======
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Good for form submissions
app.use(cookieParser())

// CORS for frontend communication
app.use(
  cors({
    origin: 'http://localhost:3000', // Change to your frontend's origin
    credentials: true,
  }),
)

// ====== Session Config ======
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  }),
)

// ====== Passport Setup ======
app.use(passport.initialize())
app.use(passport.session())

// ====== Routes ======
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

// ====== DB Connection ======
ConnectDB()

// ====== Server Start ======
const PORT = process.env.PORT || 8500
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`)
})
