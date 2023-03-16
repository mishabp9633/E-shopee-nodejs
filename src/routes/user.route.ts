import { Router } from 'express';
import UsersController from '@/controllers/user/user-user.controller';
import UsersAdminController from '@/controllers/admin/admin-user.controller';
import { UpdateUserByAdminDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from '@/models/user.model';

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
    this.router.get(`${this.path}`, authorizeRoles([ROLE.USER]), this.usersController.getUserByToken);
    this.router.put(`${this.path}/update`, validationMiddleware(UpdateUserDto, 'body', false), authorizeRoles([ROLE.USER]), this.usersController.updateUser);
    this.router.post(`${this.path}/email`, this.usersController.getUserByEmail);
    
    // for admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE. ADMIN]), this.usersAdminController.getUsers);
    this.router.get(`${this.path}/admin/raw/all`, authorizeRoles([ROLE.ADMIN]), this.usersAdminController.getRawUsers);
    this.router.get(`${this.path}/admin/custom/:custom`, authorizeRoles([ROLE.ADMIN]), this.usersAdminController.getCustomUsers);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.usersController.getUserById);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(UpdateUserByAdminDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.usersAdminController.updateUser);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.usersController.deleteUser);
  
  }
}

export default UserRoute;
