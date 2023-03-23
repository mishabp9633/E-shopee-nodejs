import _ from 'lodash'
import { toNumber } from 'lodash'
import { CreateUserDto, UpdateUserByAdminDto, UpdateUserDto, USER_CUSTOM } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';

class UserUserService {
  public user = userModel;

  public async findUserByEmail(email: string): Promise<any> {
    const user = await this.user.findOne({ email: email })
    // if (!user) throw new Error('User not found with firebaseUid')
    return (user && user.email ? true : false)
  }

  public async findUserById(userId: string): Promise<User> {
    console.log('userId in service:', userId);
    
    // if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.user.findOne({ _id: userId },
      //  {isGuest:1, email:1, createdAt:1, name:1, phone:1, shippingAddresses:1, adminStore:1, currentStore:1, storeDistance:1}
       );
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async updateUser(userData: UpdateUserDto, user: User): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    user.name = userData.name;
    user.phone = userData.phone;

    await user.save({ validateBeforeSave: false });

    // const updateUserById: User = await this.user.findByIdAndUpdate(user._id, userData, {new: true});
    // if (!updateUserById) throw new HttpException(409, "You're not user");

    return {
      _id: user._id,
      email: user.email,
      phone: user.phone,
    };
  }

  public async updateUserByAdmin(userData: CreateUserDto, user: User): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const updateUserById: User = await this.user.findByIdAndUpdate(user._id, userData, {new: true});
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  
  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.user.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }

}

export default UserUserService;
