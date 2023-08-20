const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword, 'Password not valid'],
      minlength: [8, 'Min 8 characters'],
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    rol: { type: String, enum: ['admin', 'manager', 'user'], required: true },
    photo: { type: String },
    confirmationCode: { type: Number, required: true },
    check: { type: Boolean, default: false },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  } catch (error) {
    next('Error hashing password', error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
