import { model, Schema, Document, Types } from 'mongoose';
import { User } from '@/interfaces/user.interface';


export const recentViewSchema: Schema = new Schema({
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
  resetPasswordExpires: Number
},

  {
    timestamps: true
  });

const recentViewModel = model<User & Document>('RecentView', recentViewSchema);

export default recentViewModel;


// resetToken:{
//   type:String
//     },

//     resetPasswordToken:{
//       type:String
//     },

//     resetPasswordExpires:{
//       type:Number
//     },