import { Document } from "mongoose";


export interface Product extends Document {
  name?: string;
  description?:string
  stock?: number;
  category?: string;
  color?:string;
  price?: Price;
  isActive: Boolean;
  brand?: string;
  images?:Array<Photo>
  
}


export interface Photo extends Document {
    public_id: string;
    url: string;
  }
  

  export interface Price extends Document {
    actualPrice: string;
    previousPrice: string;
    offerPrice: string;
  }