import { Document } from "mongoose";

export interface Wishlist extends Document{
    products: Array<any>;
    userId: string;
}
