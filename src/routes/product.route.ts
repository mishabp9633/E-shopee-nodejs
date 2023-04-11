import { BaseRoute, Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from '@/models/user.model';
import AdminProductController from '@/controllers/admin/product.controller';
import { Router } from 'express';
import { CreateProductDto } from '@/dtos/product.dto';


class ProductRoute extends BaseRoute implements Routes{
  public path = '/product';
  public AdminProductController = new AdminProductController();

  constructor() {
    super()
        this.initializeRoutes();
  }

  private initializeRoutes() {
    // for admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE. ADMIN,ROLE.USER]), this.AdminProductController.getProducts);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN,ROLE.USER]), this.AdminProductController.getProductById);
    this.router.post(`${this.path}/admin/new`, authorizeRoles([ROLE.ADMIN,ROLE.USER]), this.AdminProductController.createProduct);
    this.router.put(`${this.path}/update/admin/:id`, validationMiddleware(CreateProductDto, 'body', false), authorizeRoles([ROLE.ADMIN,ROLE.USER]), this.AdminProductController.updateProduct);
    this.router.delete(`${this.path}/delete/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.AdminProductController.deleteProduct);
    this.router.post(`${this.path}/admin/relatedProducts`, authorizeRoles([ROLE. ADMIN,ROLE.USER]), this.AdminProductController.relatedProducts);

  }
}

export default ProductRoute;
