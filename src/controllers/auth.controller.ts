import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, CreateUsernameDto } from '@dtos/users.dto';
import { IRequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public registerWithMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;

      const registerUserData: User = await this.authService.registerWithMail(userData);

      res.status(200).json(registerUserData);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userData: CreateUserDto = {
        email,
        password,
      };
      const loginUserData: User = await this.authService.login(userData);

      res.status(200).json(loginUserData);
    } catch (error) {
      next(error);
    }
  };

  public adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userData: CreateUserDto = {
        email,
        password,
      };
      const loginUserData: User = await this.authService.adminLogin(userData);

      res.status(200).json(loginUserData);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body.user;
      console.log('userData: ', req.body);

      const logoutUserData: User = await this.authService.logout(userData);

      res.status(200).json(logoutUserData);
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

  public forgotPassword = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
      const email:string = req.body.email

      const result: User = await this.authService.forgot(email);
      res.status(200).json({ message: 'Checkout your mail' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token: string = req.params.id;
      const { password, confirmPassword } = req.body;

      const result: User = await this.authService.reset(password, confirmPassword, token);

      res.status(200).send({ message: 'password updated successfully' });
      console.log(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public checkUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.query.userId as string
      const username: string = req.body.username
      const registerUsernameData: User = await this.authService.usernameCheck(username, userId);

      res.status(200).json(registerUsernameData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
