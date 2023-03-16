import { Router } from 'express';
import UsersController from '@/controllers/user/user-user.controller';
import UsersAdminController from '@/controllers/admin/admin-user.controller';
import { CreateUserDto, UpdateUserByAdminDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import firebaseAuthMiddleware, { adminMiddleware, userAuthMiddleware } from '@/middlewares/auth.middleware';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();
  public usersAdminController = new UsersAdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    // for users
    this.router.get(`${this.path}`, userAuthMiddleware, this.usersController.getUserByToken);
    this.router.put(`${this.path}/update`, validationMiddleware(UpdateUserDto, 'body', false), userAuthMiddleware, this.usersController.updateUser);
    this.router.post(`${this.path}/email`, this.usersController.getUserByEmail);
    
    // for admin
    this.router.get(`${this.path}/admin/all`, adminMiddleware, this.usersAdminController.getUsers);
    this.router.get(`${this.path}/admin/raw/all`, adminMiddleware, this.usersAdminController.getRawUsers);
    this.router.get(`${this.path}/admin/custom/:custom`, adminMiddleware, this.usersAdminController.getCustomUsers);
    this.router.get(`${this.path}/admin/:id`, adminMiddleware, this.usersController.getUserById);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(UpdateUserByAdminDto, 'body', false), adminMiddleware, this.usersAdminController.updateUser);
    this.router.delete(`${this.path}/admin/:id`, adminMiddleware, this.usersController.deleteUser);
  
  }
}

export default UserRoute;
