import { Document } from "mongoose";

export interface Cart extends Document{
    products: Array<any>;
    user: string;
}

export interface CartItem extends Document{
    product: string;
    quantity: number;
    status: string;
}