const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueName = `user_${
      req.user ? req.user.id : 'anon'
    }_${Date.now()}${ext}`
    cb(null, uniqueName)
  },
})

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Only images are allowed'))
  }
  cb(null, true)
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
})

// ...existing code...
module.exports = { upload }
