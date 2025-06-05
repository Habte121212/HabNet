// Social login redirect handlers

exports.googleLogin = (req, res, next) => next()
exports.googleCallback = (req, res) => {
  // Ensure session is established after OAuth
  req.login(req.user, (err) => {
    if (err) {
      return res.redirect('http://localhost:5173/login?error=oauth')
    }
    res.redirect('http://localhost:5173/')
  })
}

exports.githubLogin = (req, res, next) => next()
exports.githubCallback = (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      return res.redirect('http://localhost:5173/login?error=oauth')
    }
    res.redirect('http://localhost:5173/')
  })
}
