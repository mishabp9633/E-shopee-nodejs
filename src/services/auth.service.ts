import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import userModel from '../models/user.model';
import { HttpException } from '../exceptions/HttpException';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendMail } from '@/utils/mail.service';
import { toString } from 'lodash';

class AuthService {
  public users = userModel;

  public async registerWithMail(userData: CreateUserDto): Promise<any> {
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) {
      const user: User = await this.users.create({ ...userData });

      // Create Jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      });

      // Generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      user.token = token;

      await user.save({ validateBeforeSave: false });

      let role = user.role
      return { token, role };
    } else {
      throw new HttpException(400, `user ${userData.email} already exists`);
    }
  }

  public async adminRegister(userData: CreateUserDto): Promise<any> {
    const user: User = await this.users.create({ ...userData });

    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.token = token;

    await user.save({ validateBeforeSave: false });
    return { token };
  }

  public async adminLogin(userData: CreateUserDto): Promise<any> {
    const { email, password } = userData;

    // Checks if email and password is entered by user
    if (!email || !password) {
      throw new HttpException(404, 'Please enter email & password');
    }

    // Finding user in database
    const user: User = await this.users.findOne({ email }).select('+password');

    if (!user) {
      throw new HttpException(404, `user ${userData.email} doesn't exist`);
    }

    if (user.role !== 'admin') {
      throw new HttpException(404, `Unauthorized access denied!`);
    }

    // Checks if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpException(401, `Password doesn't match`);
    }

    if (!user.token) {
      // Create Jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      });
      user.token = token;
      await user.save({ validateBeforeSave: false });

      return { token };
    }

    return { token: user.token };
  }

  public async login(userData: CreateUserDto): Promise<any> {
    const { email, password } = userData;

    // Checks if email and password is entered by user
    if (!email || !password) {
      throw new HttpException(404, 'Please enter email & password');
    }

    // Finding user in database
    const user: User = await this.users.findOne({ email }).select('+password');

    if (!user) {
      throw new HttpException(404, `user ${userData.email} doesn't exist`);
    }

    // Checks if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpException(401, `Password doesn't match`);
    }

    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
    user.token = token;
    await user.save({ validateBeforeSave: false });

    const role = user.role
    return { token, role };
  }

  public async logout(userData: User): Promise<any> {
    const user: User = await this.users.findOne({ _id: userData._id });
    if (!user) {
      throw new HttpException(204, `user ${userData.phone} doesn't exist`);
    } else {
      //Remove the token
      user.token = '';
      await user.save({ validateBeforeSave: false });

      return { token: user.token };
    }
  }

  public async forgot(email: string): Promise<any> {
    const user: User = await this.users.findOne({ email });

    console.log("userrr.....",user);
    
    if (!user) throw new HttpException(204, `Verify entered email`);
    const result = await sendMail(user);

    console.log("result.....",result);
    
    return result 
  }

  public async reset(password: string, confirmPassword: string, token: string): Promise<any> {
    // Check if the token is valid and has not expired
    const user: User = await this.users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new HttpException(400, 'Password reset has expired please make another request');
    }

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const Password = await bcrypt.hash(password, salt);

      // Update the user's password
      user.password = Password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return { user };
    } else {
      throw new HttpException(400, 'password dose not match each other');
    }
  }

  public async usernameCheck(nameCheckText: string, userId: string): Promise<any> {
    const user: User = await this.users.findOne({ username: nameCheckText });
    return userId
      ? toString(user?._id) === userId
      : !user;
  }
}

export default AuthService;
