import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationExpires: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    premiumExpiresAt: {
      type: Date,
    },
    googleId: {
      type: String,
      required: false,
    },
    authMethod: {
      type: String,
      enum: ['google', 'local'],
      required: true,
      default: 'local',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate token for account verification
userSchema.methods.generateAccVerificationToken = async function () {
  const buf = crypto.randomBytes(20).toString('hex');
  const emailToken = crypto.createHash('sha256').update(buf).digest('hex');
  this.accountVerificationToken = emailToken;
  this.accountVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return emailToken;
};

// Generate token for password reset
userSchema.methods.generatePasswordResetToken = async function () {
  const buf = crypto.randomBytes(20).toString('hex');
  const emailToken = crypto.createHash('sha256').update(buf).digest('hex');
  this.passwordResetToken = emailToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return emailToken;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
});

const User = mongoose.model('User', userSchema);

export default User;
