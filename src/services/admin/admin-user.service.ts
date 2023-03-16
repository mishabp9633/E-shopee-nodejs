import _ from 'lodash'
import { toNumber } from 'lodash'
import { UpdateUserByAdminDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';

class AdminUserService {
  public user = userModel;

  public async findAllUsers(page: string, limit: string, query): Promise<{
    users: User[],
    total: number,
    page: string}> {
    const users: User[] = await this.user.find({
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]
    }).sort({ createdAt: -1 })
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));

    const total = await this.user.find().countDocuments()

    return {
      users,
      total,
      page,
    };
  }

  public async updateUserByAdmin(userId: string, userData: UpdateUserByAdminDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const updateUserById: User = await this.user.findByIdAndUpdate(userId, userData, { new: true });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async getUserByToken(token: string): Promise<User> {

    const user: User = await this.user.findOne({ token: token })
    if (!user) throw new HttpException(400, 'Not a user')

    return user
  }
}

export default AdminUserService;
