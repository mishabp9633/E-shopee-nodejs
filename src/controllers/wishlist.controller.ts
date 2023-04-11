import { NextFunction, Request, Response } from 'express';
import { CreateWishlistDto } from '@/dtos/wishlist.dto';
import { Wishlist } from '@/interfaces/wishlist.interface';
import WishlistService from '@/services/wishlist.service';


class WishlistController {
    public wishlistService = new WishlistService();
  
    public getWislists = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAllWishlistsData: Wishlist[] = await this.wishlistService.findAllWishlists();
        res.status(200).json( findAllWishlistsData );
      } catch (error) {
        next(error);
      }
    };
  
    public getWishlistById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistId: string = req.params.id;
        const findOneWishlistData: Wishlist = await this.wishlistService.findWishlistById(wishlistId);
  
        res.status(200).json( findOneWishlistData );
      } catch (error) {
        next(error);
      }
    };
  
    public createWishlist = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.body.user._id as string
        const wishlistData: CreateWishlistDto = req.body;
        const createWishlistData: Wishlist = await this.wishlistService.createWishlist(wishlistData, user);
  
        res.status(200).json( createWishlistData );
      } catch (error) {
        next(error);
      }
    };
  
    public updateWishlist = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistId: string = req.params.id;
        const wishlistData: CreateWishlistDto = req.body;
        const updateWishlistData: Wishlist = await this.wishlistService.updateWishlist(wishlistId, wishlistData);
  
        res.status(200).json( updateWishlistData );
      } catch (error) {
        next(error);
      }
    };
  
    public deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistId: string = req.params.id;
        const deleteWishlistData: Wishlist = await this.wishlistService.deleteWishlist(wishlistId);
  
        res.status(200).json( deleteWishlistData );
      } catch (error) {
        next(error);
      }
    };
  }

export default WishlistController;