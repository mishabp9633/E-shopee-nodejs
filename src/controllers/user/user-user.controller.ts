import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import UserUserService from '@/services/user/user-users.service';

class UserController {
  public userService = new UserUserService();

  public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.body.email;
      console.log('email: ',email);
      
      const checkUserByEmail = await this.userService.findUserByEmail(email);

      res.status(200).json( checkUserByEmail );
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json( findOneUserData );
    } catch (error) {
      next(error);
    }
  };

  public getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.user._id;      
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json(findOneUserData);
    } catch (error) {
      console.log('error', error)
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { name, email } = req.body as CreateUserDto;
      const user = req.body.user as User;
      const userData = req.body as UpdateUserDto;
      const updateUserData: User = await this.userService.updateUser(userData, user);

      res.status(200).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json( deleteUserData );
    } catch (error) {
      next(error);
    }
  }; 
}

export default UserController;
