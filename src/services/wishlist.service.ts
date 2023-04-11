import _ from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Wishlist } from '@/interfaces/wishlist.interface';
import { CreateWishlistDto } from '@/dtos/wishlist.dto';
import  wishlistModel  from '@/models/wishlist.model';


class WishlistService {
    public wishlist = wishlistModel
  
    public async findAllWishlists(): Promise<Wishlist[]> {
      const Wishlists: Wishlist[] = await this.wishlist.find()
      .sort({createdAt:-1})
      
      return Wishlists;
    }
  
    public async findWishlistById(wishlistId: string): Promise<Wishlist> {
      if (isEmpty(wishlistId)) throw new HttpException(400, "This is not a valid wishlistId.");
  
      const findWishlist: Wishlist = await this.wishlist.findOne({ _id: wishlistId });
      if (!findWishlist) throw new HttpException(409, "This is not a valid wishlist.");
  
      return findWishlist; 
    }
  
    public async createWishlist(wishlistData: CreateWishlistDto, userId: string): Promise<any> {
      const wishlist: Wishlist = await this.wishlist.findOne({ userId : userId })
      if(!wishlist) {
        const createWishlistData: Wishlist = await this.wishlist.create({ ...wishlistData, userId:userId });
        return createWishlistData;
      }else{
        wishlist.products.push(wishlistData)
        const updatedWishlistData: Wishlist = await wishlist.save();
        return updatedWishlistData;
      } 
    }
  
    public async updateWishlist(wishlistId: string, wishlistData: CreateWishlistDto): Promise<any> {  

      const updateWishlistById: Wishlist = await this.wishlist.findByIdAndUpdate(wishlistId, wishlistData, {new:true});
      if(!updateWishlistById) throw new HttpException(400, "This is not a valid wishlist Updation.");
  
      return updateWishlistById;
    }
  
    public async deleteWishlist(productId: string): Promise<Wishlist> {
      const wishlist: Wishlist = await this.wishlist.findById(productId);

      const wishlistId: string = wishlist._id
      const deleteWishlistById: Wishlist = await this.wishlist.findByIdAndDelete(wishlistId);
      if (!deleteWishlistById) throw new HttpException(400, "The Data has not been found.")
  
      return deleteWishlistById;
    }
  }
  
  export default WishlistService;