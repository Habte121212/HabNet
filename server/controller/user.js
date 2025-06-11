const db = require('../db/dbConfig')
const path = require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const User = require('../models/User')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

// upload profile Pic
const uploadProfilePic = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const file = req.file
    const ext = path.extname(file.originalname).toLowerCase()

    // Validate extension
    if (!allowedExtensions.includes(ext)) {
      return res.status(400).json({ message: 'Invalid file extension' })
    }
    if (!file.mimetype.startsWith('image/'))
      return res.status(400).json({ message: 'file must be an image' })
    if (file.size > 1024 * 1024 * 2)
      return res
        .status(400)
        .json({ message: 'file size must be less than 2MB' })

    // Upload to Cloudinary
    let result
    try {
      result = await cloudinary.uploader.upload(file.path, {
        folder: 'profilePics',
        public_id: `user_${req.user.id}_${Date.now()}`,
        resource_type: 'image',
      })
    } catch (cloudErr) {
      // Clean up local file if cloud upload fails
      try {
        await fs.promises.unlink(file.path)
      } catch (e) {}
      return res
        .status(500)
        .json({ message: 'Cloud upload failed', error: cloudErr.message })
    }
    // Delete local file after upload
    try {
      await fs.promises.unlink(file.path)
    } catch (e) {
      console.warn('File deletion failed:', e.message)
    }

    const profilePicUrl = result.secure_url
    const publicId = result.public_id
    const userId = req.user.id

    // Update user profilePic and profilePicId in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: profilePicUrl, profilePicId: publicId },
      { new: true },
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'user not found' })
    } else {
      res.status(200).json({
        message: 'Profile picture uploaded successfully',
        profilePic: profilePicUrl,
      })
    }
  } catch (error) {
    console.error('Error uploading profile pic:', error.message)
    res.status(500).json({ message: 'server error', error: error.message })
  }
}

// update user bio
const updateUserBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
    const { bio } = req.body
    if (typeof bio !== 'string' || bio.length > 500) {
      return res
        .status(400)
        .json({ message: 'Bio must be a string up to 500 characters.' })
    }
    const userId = req.user.id
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true },
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'user not found' })
    } else {
      res.status(200).json({
        message: 'Bio updated successfully',
        bio: updatedUser.bio,
      })
    }
  } catch (error) {
    console.error('Error updating bio:', error.message)
    res.status(500).json({ message: 'server error', error: error.message })
  }
}

module.exports = { uploadProfilePic, updateUserBio }
