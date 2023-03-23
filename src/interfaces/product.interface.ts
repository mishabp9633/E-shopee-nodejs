import { Document } from "mongoose";


export interface Product extends Document {
  name?: string;
  quantity?: string;
  price?: Price;
  isActive: Boolean;
  brand?: string;
  image?:Photo
  
  resetPasswordToken: string;
  resetPasswordExpires: number;
}


export interface Photo extends Document {
    public_id: String;
    url: String;
  }
  

  export interface Price extends Document {
    actualPrice: string;
    previousPrice: string;
    offerPrice: string;
  }