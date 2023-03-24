import { model, Schema, Document, Types } from 'mongoose';
import { Wishlist } from '@/interfaces/wishlist.interface';

const WishlistSchema :  Schema = new Schema ({
    products: [{
        type: String,
        ref: "Products"
    }],
    userId: {
      type: String,
      ref: 'User'
    }
});

const wishlistModel = model<Wishlist & Document>('Wishlist', WishlistSchema);

export default wishlistModel
