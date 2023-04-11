import { NextFunction, Request, Response } from 'express';
import { CreateCartDto } from '@/dtos/cart.dto';
import { Cart } from '@/interfaces/cart.interface';
import CartService from '@/services/cart.service';


class CartController {
    public cartService = new CartService();
  
    public getCarts = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAllCartsData: Cart[] = await this.cartService.findAllCarts();
        res.status(200).json( findAllCartsData );
      } catch (error) {
        next(error);
      }
    };
  
    public getCartById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartId: string = req.params.id;
        const findOneCartData: Cart = await this.cartService.findCartById(cartId);
  
        res.status(200).json( findOneCartData );
      } catch (error) {
        next(error);
      }
    };
  
    public createCart = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.body.user._id as string
        const cartData: CreateCartDto = req.body;
        const createCartData: Cart = await this.cartService.createCart(cartData, user);
  
        res.status(200).json( createCartData );
      } catch (error) {
        next(error);
      }
    };
  
    public updateCart = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartId: string = req.params.id;
        const cartData: CreateCartDto = req.body;
        const updateCartData: Cart = await this.cartService.updateCart(cartId, cartData);
  
        res.status(200).json( updateCartData );
      } catch (error) {
        next(error);
      }
    };
  
    public deleteCart = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartId: string = req.params.id;
        const deleteCartData: Cart = await this.cartService.deleteCart(cartId);
  
        res.status(200).json( deleteCartData );
      } catch (error) {
        next(error);
      }
    };
  }

export default CartController;