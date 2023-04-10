import { model, Schema, Document, Types } from 'mongoose';
import { Cart,  CartItem } from '@/interfaces/cart.interface';

export enum CART_STATUS {
    NOT_PROCESSED = "not_processed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

const CartItemSchema : Schema = new Schema ({
    product: {
        type: String,
        ref: "Product"
    },
    quantity: {
        type: Number,
        purchasePrice: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        required: [true, 'Please select status type'],
      enum: {
        values: [
          CART_STATUS.NOT_PROCESSED, 
          CART_STATUS.PROCESSING, 
          CART_STATUS.SHIPPED, 
          CART_STATUS.DELIVERED, 
          CART_STATUS.CANCELLED
        ],
        message: 'Please select correct cart status type',
      },
      default: CART_STATUS.NOT_PROCESSED
    }, 
},
    {
        timestamps: true
    }
);

 export const cartItemModel= model<CartItem & Document>('CartItem', CartItemSchema)
 // Cart Schema
 const CartSchema :  Schema = new Schema ({
    products: [CartItemSchema],
    userId: {
      type: String,
      ref: 'User'
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    },
});

export const cartModel = model<Cart & Document>('Cart', CartSchema);

  
  