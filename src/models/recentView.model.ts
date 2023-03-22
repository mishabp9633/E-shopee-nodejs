import { model, Schema, Document, Types } from 'mongoose';
import { RecentView } from '@/interfaces/recentView.interface';


export const recentViewSchema: Schema = new Schema({
  userId: {
    type: String,
    ref: "User"
  },
  products: [{
    type: String,
    ref: "Product"
  }]
},
  {
    timestamps: true
  });

const recentViewModel = model<RecentView & Document>('RecentView', recentViewSchema);

export default recentViewModel;
