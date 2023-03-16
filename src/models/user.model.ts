import { model, Schema, Document, Types } from 'mongoose';
import { User } from '@/interfaces/user.interface';

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export const userSchema: Schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    maxLength: [15, 'Your phone number cannot exceed 15 characters']
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: [6, 'Your password must be longer than 6 characters'],
  },
  role: {
    type: String,
    enum: {
      values: [
        ROLE.ADMIN,
        ROLE.USER,
      ],
      message: 'Please select correct role'
    },
    default: ROLE.USER,
  },
  token: {
    type: String
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  lastLogin:{
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
},
  {
    timestamps: true
  });

const userModel = model<User & Document>('User', userSchema);

export default userModel;
