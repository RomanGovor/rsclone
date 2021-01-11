const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        console.log(`we have a problem with email in User`);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  data: {
    numberOfGames: {
      'type': String,
      'default': '0',
    },
    maximumNumberOfWins: {
      'type': String,
      'default': '0',
    },
    points: {
      'type': String,
      'default': '0',
    },
    averagePoints: {
      'type': String,
      'default': '0',
    },
    averagePlayTime: {
      'type': String,
      'default': '0',
    },
    maximumPlayTime: {
      'type': String,
      'default': '0',
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    console.log(`problem with email in User 2`);
    // throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    // throw new Error({ error: 'Invalid login credentials' })
    console.log(`problem with password in User`);
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
