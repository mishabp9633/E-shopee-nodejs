import { Product } from '@/interfaces/product.interface';
import { timeStamp } from 'console';
import { model, Schema, Document, Types } from 'mongoose';

export const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
    },
    category: {
      type: String,
      // required: true,
    },
    color: {
      type: String,
      // required: true,
    },
    price: {
      actualPrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
      offer: {
        type: Number,
        default: 0,
      },
      purchasePrice: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
    },
    brand: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
