import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import userAuthMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateUserDto, ForgotUserPasswordDto, LoginUserDto, LoginWithMobileDto, RegisterGuestDto, ResetUserPasswordDto, SignUpWithMobileDto, UpdateUserPasswordDto, VerifyOtpDto } from '@/dtos/users.dto';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register/mail`, validationMiddleware(CreateUserDto, 'body', false), this.authController.registerWithMail);
    this.router.post(`${this.path}register/mobile`, validationMiddleware(SignUpWithMobileDto, 'body', false), this.authController.registerWithPhone);
    this.router.post(`${this.path}register/guest`, validationMiddleware(RegisterGuestDto, 'body', false), this.authController.registerGuest);

    this.router.post(`${this.path}verify_otp`, validationMiddleware(VerifyOtpDto, 'body', false), this.authController.verifyOtp);
    this.router.post(`${this.path}login/mail`, validationMiddleware(LoginUserDto, 'body', false), this.authController.login);
    
    this.router.post(`${this.path}login/mobile`, validationMiddleware(LoginWithMobileDto, 'body', false), this.authController.loginWithPhone);

    this.router.get(`${this.path}logout`, userAuthMiddleware,  this.authController.logout);
    this.router.post(`${this.path}password/update`, validationMiddleware(UpdateUserPasswordDto, 'body', false),  userAuthMiddleware,this.authController.updatePassword);
    this.router.get(`${this.path}me`, userAuthMiddleware, this.authController.getuserProfile);
    this.router.post(`${this.path}forgot`, validationMiddleware(ForgotUserPasswordDto, 'body', false), this.authController.forgotPassword);
    this.router.post(`${this.path}password/reset/:token`, validationMiddleware(ResetUserPasswordDto, 'body', false), this.authController.resetPassword);

    //admin
    this.router.post(`${this.path}admin/login`, validationMiddleware(LoginUserDto, 'body', false), this.authController.adminLogin);
    this.router.post(`${this.path}register/store_admin/mail`, validationMiddleware(CreateUserDto, 'body', false), this.authController.registerStoreAdminWithMail);

    //store admin
    this.router.post(`${this.path}register/store_admin/mail`, validationMiddleware(CreateUserDto, 'body', false), this.authController.registerStoreAdminWithMail);

    //super admin
    // this.router.put(`${this.path}admin/role/:id`, validationMiddleware(AdminRoleDto, 'body', false), superadminMiddleware, this.authController.);

  }
}

export default AuthRoute;
