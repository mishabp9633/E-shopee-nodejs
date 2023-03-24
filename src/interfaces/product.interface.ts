import { Document } from "mongoose";


export interface Product extends Document {
  name?: string;
  description?:string
  quantity?: string;
  price?: Price;
  isActive: Boolean;
  brand?: string;
  images?:Array<Photo>
  
}


export interface Photo extends Document {
    public_id: string;
    url: string;
    _id: string
  }
  

  export interface Price extends Document {
    actualPrice: string;
    previousPrice: string;
    offerPrice: string;
  }