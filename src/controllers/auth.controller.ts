import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { IRequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public registerWithMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body

      const registerUserData: User = await this.authService.registerWithMail(userData);

      res.status(200).json( registerUserData );
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
}

export default AuthController;
