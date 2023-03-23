import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { CreateRecentViewDto } from '@/dtos/recentView.dto';
import AdminRecentViewController from '@/controllers/recentView.controller';
import { ROLE } from "@/models/user.model";

class RecentViewRoute implements Routes {
  public path = '/recentView';
  public router = Router();
  public adminRecentViewController = new AdminRecentViewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
   // admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.adminRecentViewController.getRecentViews);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.adminRecentViewController.getRecentViewById);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateRecentViewDto, 'body', false), authorizeRoles([ROLE.ADMIN, ROLE.USER]), this.adminRecentViewController.createRecentView);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateRecentViewDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.adminRecentViewController.updateRecentView);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.adminRecentViewController.deleteRecentView);
  }
}

export default RecentViewRoute;
