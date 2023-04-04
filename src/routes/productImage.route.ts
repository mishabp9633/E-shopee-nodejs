import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from "@/models/user.model";
import { CreateProductImageDto } from '@/dtos/productImage.dto';
import AdminProductImageController from '@/controllers/admin/productImage.controller';
import multer from 'multer';
class ProductImageRoute implements Routes {
  public path = '/productImage';
  public router = Router();
  public productImageController = new AdminProductImageController();
public upload = multer({ storage : multer.diskStorage({})})
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
   // admin
    // this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.productImageController.getProductImages);
    // this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.productImageController.getProductImageById);
    this.router.post(`${this.path}/admin/new/:id`,this.upload.array("photo"), validationMiddleware(CreateProductImageDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.productImageController.createProductImage);
    // this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateProductImageDto, 'body', false), authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.productImageController.updateProductImage);
    this.router.delete(`${this.path}/admin/delete/:productId`, authorizeRoles([ROLE.ADMIN]), this.productImageController.deleteProductImage);
  }
}

export default ProductImageRoute;