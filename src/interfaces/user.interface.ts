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
  lastLogin: Date;
  
  resetPasswordToken: string;
  resetPasswordExpires: number;
}