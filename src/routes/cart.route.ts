import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { CreateCartDto } from '@/dtos/cart.dto';
import CartController from '@/controllers/cart.controller';
import { ROLE } from "@/models/user.model";

class CartRoute implements Routes {
  public path = '/cart';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
   // admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.cartController.getCarts);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.cartController.getCartById);
    this.router.get(`${this.path}/user/all`, authorizeRoles([ROLE.USER]), this.cartController.getCartsByToken);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateCartDto, 'body', false), authorizeRoles([ROLE.USER]), this.cartController.createCart);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateCartDto, 'body', false), authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.cartController.updateCart);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.cartController.deleteCart);
  }
}

export default CartRoute;
