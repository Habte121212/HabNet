const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/User')

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || ''
        let user = await User.findOne({ email })
        if (user) {

          // Update provider/providerId if needed
          if (user.provider !== 'google' || user.providerId !== profile.id) {
            user.provider = 'google'
            user.providerId = profile.id
            user.avatar = profile.photos?.[0]?.value || ''
            await user.save()
          }
        } else {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: 'google',
            providerId: profile.id,
            avatar: profile.photos?.[0]?.value || '',
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    },
  ),
)

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || ''
        let user = await User.findOne({ email })
        if (user) {
          
          // Update provider/providerId if needed
          if (user.provider !== 'github' || user.providerId !== profile.id) {
            user.provider = 'github'
            user.providerId = profile.id
            user.avatar = profile.photos?.[0]?.value || ''
            await user.save()
          }
        } else {
          user = await User.create({
            name: profile.displayName || profile.username,
            email,
            provider: 'github',
            providerId: profile.id,
            avatar: profile.photos?.[0]?.value || '',
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

module.exports = passport
