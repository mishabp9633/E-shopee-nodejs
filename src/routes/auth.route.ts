import AuthController from '@controllers/auth.controller';
import { BaseRoute, Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateUserDto, ForgotUserPasswordDto, LoginUserDto, ResetUserPasswordDto} from '@/dtos/users.dto';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from '@/models/user.model';

class AuthRoute extends BaseRoute implements Routes  {
  public path = '/';
  public authController = new AuthController();

  constructor() {
    super()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register/mail`, validationMiddleware(CreateUserDto, 'body', false), this.authController.registerWithMail);

    this.router.get(`${this.path}username`, this.authController.checkUsername);

    this.router.post(`${this.path}login/mail`, validationMiddleware(LoginUserDto, 'body', false), this.authController.login);
    
    this.router.get(`${this.path}logout`, authorizeRoles([ROLE.USER]),  this.authController.logout);
    this.router.get(`${this.path}me`, authorizeRoles([ROLE.USER]), this.authController.getuserProfile);

    this.router.post(`${this.path}forgot`, validationMiddleware(ForgotUserPasswordDto, 'body', false), this.authController.forgotPassword);
    this.router.post(`${this.path}password/reset/:id`, validationMiddleware(ResetUserPasswordDto, 'body', false), this.authController.resetPassword);

    //admin
    this.router.post(`${this.path}admin/login`, validationMiddleware(LoginUserDto, 'body', false), this.authController.adminLogin);

  }
}

export default AuthRoute;
