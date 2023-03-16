import { NextFunction, Request, Response } from 'express';
import { CreateGuestDto, CreateUserDto, ForgotUserPasswordDto, LoginWithMobileDto, ResetUserPasswordDto, SignUpWithMobileDto, UpdateUserPasswordDto, VerifyOtpDto } from '@dtos/users.dto';
import { IRequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import bcrypt from "bcryptjs";

class AuthController {
  public authService = new AuthService();

  public registerWithMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const userData: CreateUserDto = {
        email,
        password,
      }

      const registerUserData: User = await this.authService.registerWithMail(userData);

      res.status(200).json( registerUserData );
    } catch (error) {
      next(error);
    }
  };

  public registerStoreAdminWithMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const userData: CreateUserDto = {
        email,
        password,
      }

      const registerStoreAdminData: User = await this.authService.registerStoreAdminWithMail(userData);

      res.status(200).json( registerStoreAdminData );
    } catch (error) {
      next(error);
    }
  };

  public registerWithPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { phone, password } = req.body
      const userData: SignUpWithMobileDto = req.body

      const registerUserData: User = await this.authService.registerWithPhone(userData);

      res.status(200).json( registerUserData );
    } catch (error) {
      next(error);
    }
  };

  public registerGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const userData: CreateGuestDto = {
        email
      }

      const registerUserData: User = await this.authService.registerGuest(userData);

      res.status(200).json( registerUserData );
    } catch (error) {
      next(error);
    }
  };


  public verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: VerifyOtpDto = req.body
      const verifyOtpData: User = await this.authService.verifyOtp(userData);

      res.status(200).json( verifyOtpData );
    } catch (error) {
      next(error);
    }
  };


  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const userData: CreateUserDto = {
        email,
        password
      }
      const loginUserData: User = await this.authService.login(userData);

      res.status(200).json( loginUserData );
    } catch (error) {
      next(error);
    }
  };


  public loginWithPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginWithMobileDto = req.body
      const loginUserData: User = await this.authService.loginWithPhone(userData);

      res.status(200).json( loginUserData );
    } catch (error) {
      next(error);
    }
  };


  public adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const userData: CreateUserDto = {
        email,
        password
      }
      const loginUserData: User = await this.authService.adminLogin(userData);

      res.status(200).json( loginUserData );
    } catch (error) {
      next(error);
    }
  };


  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const userData = req.body.user
      console.log('userData: ',req.body);
      
      const logoutUserData: User = await this.authService.logout(userData);

      res.status(200).json( logoutUserData );
    } catch (error) {
      next(error);
    }
  };


  public getuserProfile = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body;

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };


  public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UpdateUserPasswordDto = req.body;
      console.log('userData in controller: ',userData);
      
      const user = req.body.user;
      console.log('user in controller: ',user);
      const updatePasswordData = await this.authService.updatePassword(userData, user);

      res.status(200).json(updatePasswordData);
    } catch (error) {
      next(error);
    }
  };


  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: ForgotUserPasswordDto = req.body;
      const forgotPasswordData = await this.authService.forgotPassword(userData);

      res.status(200).json(forgotPasswordData);
    } catch (error) {
      next(error);
    }
  };

  
  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: ResetUserPasswordDto = req.body;
      const resetToken = req.params.token
      const resetPasswordData = await this.authService.resetPassword(userData, resetToken);

      res.status(200).json(resetPasswordData);
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
