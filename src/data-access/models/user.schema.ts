import mongoose from 'mongoose';
import { UserDocument, UserStatus } from '../../types/user.types';
import { paginate } from '../../utils/paginate';
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: function getUUID() {
        return uuid.v4();
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    annualIncome: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    pin: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'], // Specific values
      required: false,
    },
    isSalaried: {
      type: Boolean,
      required: false,
    },
    smoking: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

userSchema.plugin(paginate);

export const userModel = mongoose.model<UserDocument>('User', userSchema);
