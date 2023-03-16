import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateUserDto, LoginUserDto} from '@/dtos/users.dto';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from '@/models/user.model';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register/mail`, validationMiddleware(CreateUserDto, 'body', false), this.authController.registerWithMail);

    this.router.post(`${this.path}login/mail`, validationMiddleware(LoginUserDto, 'body', false), this.authController.login);
    
    this.router.get(`${this.path}logout`, authorizeRoles([ROLE.USER]),  this.authController.logout);
    this.router.get(`${this.path}me`, authorizeRoles([ROLE.USER]), this.authController.getuserProfile);
    
    // this.router.post(`${this.path}password/update`, validationMiddleware(UpdateUserPasswordDto, 'body', false),  userAuthMiddleware,this.authController.updatePassword);
    // this.router.post(`${this.path}forgot`, validationMiddleware(ForgotUserPasswordDto, 'body', false), this.authController.forgotPassword);
    // this.router.post(`${this.path}password/reset/:token`, validationMiddleware(ResetUserPasswordDto, 'body', false), this.authController.resetPassword);

    //admin
    this.router.post(`${this.path}admin/login`, validationMiddleware(LoginUserDto, 'body', false), this.authController.adminLogin);

  }
}

export default AuthRoute;
