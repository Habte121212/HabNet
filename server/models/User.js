const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      // Only require password for local provider
      return !this.provider || this.provider === 'local'
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  Bio: {
    type: String,
    default: '',
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'github'],
    default: 'local',
  },
  providerId: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: '',
  },
})

const User = mongoose.model('User', UserSchema)
module.exports = User
