import _ from 'lodash'
import { toNumber } from 'lodash'
import { UpdateUserByAdminDto, UpdateUserDto, USER_CUSTOM } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/user.interface';
import userModel, { ROLE } from '@/models/user.model';
import { isEmpty } from '@utils/util';
import mongoose from 'mongoose';

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

  public async findAllRawUsers(query): Promise<{
    users: User[],
    total: number}> {
    const users: User[] = await this.user.find({
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]
    }, {name:1, phone:1})
    .sort({ createdAt: -1 })
    .limit(toNumber(10))

    const total = await this.user.find().countDocuments()

    return {
      users,
      total
    };
  }


  public async findAllCustomUsers(page: string, limit: string, custom: string, query): Promise<{
    users: User[],
    total: number,
    page: string}> {

    if(custom === USER_CUSTOM.ALL) {
      const users: User[] = await this.user.find({
        $or: [
          {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
          {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
          {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
        ]
      },{
        name:1, phone:1, email:1, role:1, createdAt:1, lastLogin:1, isPrime:1, 
      }).sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
      const total = await this.user.find({
        $or: [
          {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
          {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
          {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
        ]
      }).countDocuments()
      return {
        users,
        total,
        page,
      };
    }
    else if(custom === USER_CUSTOM.USER) {
      const users: User[] = await this.user.find({ role: "user", 
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]},
      {
        name:1, phone:1, email:1, role:1, createdAt:1, lastLogin:1, isPrime:1, currentStore:1,
      })
      .populate({
        path: "currentStore",
        select: { storeName:1 },
      })
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
      const total = await this.user.find({ role: "user", 
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]}).countDocuments()
      return {
        users,
        total,
        page,
      };
    }
    else if(custom === USER_CUSTOM.PRIME_USER) {
      const users: User[] = await this.user.find({ role: "user", isPrime: true,
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]},
      {
        name:1, phone:1, email:1, role:1, createdAt:1, lastLogin:1, isPrime:1, currentStore:1,
      })
      .populate({
        path: "currentStore",
        select: { storeName:1 },
      })
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
      const total = await this.user.find({ role: "user", isPrime: true,
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]}).countDocuments()
      return {
        users,
        total,
        page,
      };
    }
    else if(custom === USER_CUSTOM.STORE_ADMIN) {
      const users: User[] = await this.user.find({ role: "storeAdmin",
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]},
      {
        name:1, phone:1, email:1, role:1, createdAt:1, lastLogin:1, isPrime:1, adminStore:1,
      })
      .populate({
        path: "adminStore",
        select: { storeName:1 },
      })
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
      const total = await this.user.find({ role: "storeAdmin",
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]}).countDocuments()
      return {
        users,
        total,
        page,
      };
    }
    else if(custom === USER_CUSTOM.ADMIN) {
      const users: User[] = await this.user.find({ role: "admin",
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]
    },
      {
        name:1, phone:1, email:1, role:1, createdAt:1, lastLogin:1, isPrime:1,
      }).sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
      
      const total = await this.user.find({ role: "admin",
      $or: [
        {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {email : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        {phone : { $regex: query?.search ? query?.search : '', $options: 'i' }}
      ]}).countDocuments()
      return {
        users,
        total,
        page,
      };
    }
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

  public async isAdmin(userId: any): Promise<boolean> {
    const user = await this.user.findOne({ _id: userId })
    if (!user) throw new HttpException(400, 'Not a user')

    return user.role === ROLE.ADMIN
  }


  // public async isSuperadmin(userId: any): Promise<boolean> {
  //   const user = await this.user.findOne({ _id: userId })
  //   if (!user) throw new HttpException(400, 'Not a user')

  //   return user.role === ROLE.SUPERADMIN
  // }
}

export default AdminUserService;
