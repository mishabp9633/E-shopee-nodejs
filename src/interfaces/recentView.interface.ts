import { Document } from "mongoose";

export interface RecentView extends Document{
    userId: string;
    products: Array<string>;
}