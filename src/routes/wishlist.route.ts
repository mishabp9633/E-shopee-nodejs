import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { CreateWishlistDto } from '@/dtos/wishlist.dto';
import WishlistController from '@/controllers/wishlist.controller';
import { ROLE } from "@/models/user.model";

class WishlistRoute implements Routes {
  public path = '/wishlist';
  public router = Router();
  public wishlistController = new WishlistController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
   // admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.wishlistController.getWislists);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.wishlistController.getWishlistById);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateWishlistDto, 'body', false), authorizeRoles([ROLE.USER]), this.wishlistController.createWishlist);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateWishlistDto, 'body', false), authorizeRoles([ROLE.USER]), this.wishlistController.updateWishlist);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.USER]), this.wishlistController.deleteWishlist);
  }
}

export default WishlistRoute;
