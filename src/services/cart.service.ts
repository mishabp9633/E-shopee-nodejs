import _ from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Cart } from '@/interfaces/cart.interface';
import { CreateCartDto } from '@/dtos/cart.dto';
import { cartModel } from '@/models/cart.model';


class CartService {
    public cart = cartModel
  
    public async findAllCarts(): Promise<Cart[]> {
      const carts: Cart[] = await this.cart.find()
      .populate("userId",["username","email","phone"])
      .populate("product",["images","price","name"])
      .sort({createdAt:-1})
      
      return carts;
    }

    public async findCartsByToken(userId: string): Promise<Cart[]> {
      const carts: Cart[] = await this.cart.find({ userId : userId })
      .populate("userId",["username","email","phone"])
      .populate("product",["images","price","name"])
      .sort({createdAt:-1})
      
      return carts;
    }
  
    public async findCartById(cartId: string): Promise<Cart> {
      if (isEmpty(cartId)) throw new HttpException(400, "This is not a valid cartId.");
  
      const findCart: Cart = await this.cart.findOne({ _id: cartId })
      .populate("userId",["username","email","phone"])
      .populate("product",["images","price","name"])
      if (!findCart) throw new HttpException(409, "This is not a valid cart.");
  
      return findCart; 
    }
  
    public async createCart(cartData: CreateCartDto, userId: string): Promise<any> {
        cartData.userId = userId
      const createCartData: Cart = await this.cart.create({ ...cartData });
  
      return createCartData;
    }
  
    public async updateCart(cartId: string, cartData: CreateCartDto): Promise<any> {  

      const updateCartById: Cart = await this.cart.findByIdAndUpdate(cartId, cartData, {new:true});
      if(!updateCartById) throw new HttpException(400, "This is not a valid cart Updation.");
  
      return updateCartById;
    }
  
    public async deleteCart(cartId: string): Promise<Cart> {
      const deleteCartById: Cart = await this.cart.findByIdAndDelete(cartId);
      if (!deleteCartById) throw new HttpException(400, "The Data has not been found.")
  
      return deleteCartById;
    }
  }
  
  export default CartService;