import { Document } from "mongoose";

import { ROLE } from "@/models/user.model";

export interface User extends Document {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  role: ROLE;
  token?: string;
  isVerified: Boolean;
  otp: string;
  otpExpiry: Date;
  lastLogin: Date;
  
  // otpSessionKey: String,
  // otpSessionExpire: Date,
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}