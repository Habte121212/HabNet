// Social login redirect handlers

exports.googleLogin = (req, res, next) => next()
exports.googleCallback = (req, res) => {
  res.redirect('/app') 
}

exports.githubLogin = (req, res, next) => next()
exports.githubCallback = (req, res) => {
  res.redirect('/app')
}
