import { NextFunction, Request, Response } from 'express';
import { UpdateUserByAdminDto } from '@dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import UserService from '@/services/admin/admin-user.service';

class UsersAdminController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = req.query.page as string;
      const limit: string = (req.query.limit || '10') as string;
      const findAllUsersData = await this.userService.findAllUsers(page,limit,query);
      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };
  
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const { name, email, role, phone, isPrime } = req.body as UpdateUserByAdminDto;
      const updateUserData: User = await this.userService.updateUserByAdmin(userId, {
        name, email, role, phone, isPrime
      });
      res.status(200).json( updateUserData );
    } catch (error) {
      next(error);
    }
  };

}

export default UsersAdminController;
