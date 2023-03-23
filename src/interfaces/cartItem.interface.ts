import { Document } from "mongoose";

export interface CartItem extends Document{
    product: string;
    quantity: number;
    status: string;
}