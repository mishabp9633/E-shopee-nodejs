import { CreateGuestDto, CreateUserDto, LoginWithMobileDto, SignUpWithMobileDto, UpdateUserDto, UpdateUserPasswordDto, VerifyOtpDto } from '@dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import userModel from '../models/user.model';
import { HttpException } from '../exceptions/HttpException'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import shortid from 'shortid';
import axios from 'axios';
import CryptoJS from "crypto-js";
import crypto from 'crypto';
import { generateOtp, smsCarrierSender } from '../utils/otp.utils';
import { Env, STAGE } from '@/configs/env';
import { emailApiKey } from '../utils/consts';

class AuthService {
  public users = userModel;

  public async registerWithMail(userData: CreateUserDto): Promise<any> {
    const findUser: User = await this.users.findOne({ email: userData.email })
    if (!findUser) {
      
      const user: User = await this.users.create({ ...userData });
       
      // Create Jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
        });
      
      // Generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      user.token = token;

      await user.save({ validateBeforeSave: false });

      //send confirmation mail
      // try {
      //   const htmlData = `مرحبا بكم في الحقباني للألعاب 
      //   Welcome to Deals to Home, 
      //   Dear ${user.email}` 
      //     // using axios for sending email
      //     await axios.post(`https://mail-sender.vingb.com/custom-mail/${emailApiKey}`, {
      //       to_email: user.email,
      //       subject: "Welcome",
      //       html_data: htmlData,
      //     })
      // } catch (error) {
      //   console.log(error);
      // }

      return {token};
    } else {
      throw new HttpException(400, `user ${userData.email} already exists`);
    }
  }

  public async adminRegister(userData: CreateUserDto): Promise<any> {

    const user: User = await this.users.create({ ...userData });
      
    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
      });
    
    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.token = token;

    await user.save({ validateBeforeSave: false });
    return {token};
  }

  public async registerStoreAdminWithMail(userData: CreateUserDto): Promise<any> {
    const findUser: User = await this.users.findOne({ email: userData.email })
    if (!findUser) {
      
      const user: User = await this.users.create({ ...userData, isVerified: true, role: 'storeAdmin' });

      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: process.env.JWT_EXPIRES_TIME
      //   });
      
      // Generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      // user.token = token;

      await user.save({ validateBeforeSave: false });

      //send confirmation mail
      // try {
      //   const htmlData = `    
      //   Welcome to Deals to Home, 
      //   Dear ${user.email}` 
      //     // using axios for sending email
      //     await axios.post(`https://mail-sender.vingb.com/custom-mail/${emailApiKey}`, {
      //       to_email: user.email,
      //       subject: "Welcome",
      //       html_data: htmlData,
      //     })
      // } catch (error) {
      //   console.log(error);
      // }

      // return {token};
      return user;
    } else {
      throw new HttpException(400, `user ${userData.email} already exists`);
    }
  }

  public async registerWithPhone(userData: SignUpWithMobileDto): Promise<any> {

    if(userData.phone && userData.phone.length!==10) throw new HttpException(400, `phone number ${userData.phone} is invalid!`);

    let user: User = await this.users.findOne({ phone: userData.phone })
    if (!user) {
      user = await this.users.create({ ...userData });
    }

    if(user.isVerified) throw new HttpException(400, `user with ${userData.phone} already exists`);

      const otp = generateOtp(4);
      console.log('otp: ',otp);
      await smsCarrierSender({phone: userData.phone, otp})

      user.otp = otp;
      user.otpExpiry = new Date(Date.now() + 10*60*60*1000);
      await user.save({ validateBeforeSave: false });

      // if(Env.STAGE === STAGE.DEVELOPMENT) {
      //   return {
      //     userId: user._id, 
      //     otp,
      //     message: 'OTP passed here #dev_env'
      //   };
      // }
      // else if(Env.STAGE === STAGE.PRODUCTION) {
      //   return {
      //     userId: user._id,
      //     message: 'OTP send to mobile number'
      //   };
      // }
      // TODO: change this to above for production

      return {
        userId: user._id, 
        // otp,
        // message: 'OTP passed here #dev_env'
        message: `OTP send to ${userData.phone ? userData.phone : 'your phone'}`
      };

    // } else {
    //   throw new HttpException(400, `user with ${userData.phone} already exists`);
    // }
  }

  public async verifyOtp(verifyOtpData: VerifyOtpDto): Promise<any> {
    const user: User = await this.users.findOne({ _id: verifyOtpData.userId })
    if (user) {
      // if(user.isVerified) {
      //   // new HttpException(400, `user already exists`);
      //   if(user.token){
      //     user.otp = '';
      //     await user.save({ validateBeforeSave: false });
      //     return {token: user.token, message:'OTP verified successfully!'};
      //   }

      //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //     expiresIn: process.env.JWT_EXPIRES_TIME
      //   });
        
      //   user.token = token;
      //   user.otp = '';
      //   await user.save({ validateBeforeSave: false });

      //   return {token, message:'OTP verified successfully!'};
      // } 

      if(user.otpExpiry < new Date(Date.now())) throw new HttpException(400, `OTP Expired`);

      if(user.otp === verifyOtpData.otp){

        if(user.token){
          user.otp = '';
          user.otpExpiry= null;
          user.lastLogin = new Date(Date.now())
          await user.save({ validateBeforeSave: false });
          return {token: user.token, message:'OTP verified successfully!'};
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_TIME
        });
        
        user.token = token;
        if(!user.isVerified) user.isVerified = true;
        user.otp = '';
        user.lastLogin = new Date(Date.now())
        await user.save({ validateBeforeSave: false });

        return {token, message:'OTP verified successfully!'};
      } else {
        throw new HttpException(400, `OTP is incorrect!`);
      }
    } else {
      throw new HttpException(400, `user doesn't exist`);
    }
  }

  
  public async registerGuest(userData: CreateGuestDto): Promise<any> {
    const findUser: User = await this.users.findOne({ email: userData.email })
    if (!findUser) {

      const password = shortid.generate();
      console.log('guest password: ',password);
      
      const user: User = await this.users.create({ email:userData.email, password: password, isGuest: true });
       
      // Create Jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
        });
      
      // Generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      
      user.token = token;

      await user.save({ validateBeforeSave: false });

      return {token};
    } else {
      throw new HttpException(400, `user ${userData.email} already exists`);
    }
  }
  

  public async verifyIdToken(token: string): Promise<any> {
    const findUser: User = await this.users.findOne({ token: token }, {_id:1});    
    return findUser;
  }

  public async adminLogin(userData: CreateUserDto): Promise<any> {

    const { email, password } = userData;

    // Checks if email and password is entered by user
    if (!email || !password) {
      throw new HttpException(404, "Please enter email & password");
    }

    // Finding user in database
    const user: User = await this.users.findOne({ email }).select("+password");
    
    if (!user) {
      throw new HttpException(404, `user ${userData.email} doesn't exist`);
    } 

    if (user.role !== 'admin') {
      throw new HttpException(404, `Unauthorized access denied!`);
    } 

    // Checks if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new HttpException(401, `Password doesn't match`);
    }

    if(!user.token){
      // Create Jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
        });
      user.token = token;      
      await user.save({ validateBeforeSave: false });

      return {token};
    }
    
    return {token: user.token};
  }


  public async login(userData: CreateUserDto): Promise<any> {

    const { email, password } = userData;

    // Checks if email and password is entered by user
    if (!email || !password) {
      throw new HttpException(404, "Please enter email & password");
    }

    // Finding user in database
    const user: User = await this.users.findOne({ email }).select("+password");
    
    if (!user) {
      throw new HttpException(404, `user ${userData.email} doesn't exist`);
    } 

    // Checks if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new HttpException(401, `Password doesn't match`);
    }
    
    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
      });
    user.token = token;      
    await user.save({ validateBeforeSave: false });

    return {token};
  }


  public async loginWithPhone(userData: LoginWithMobileDto): Promise<any> {

    const { phone } = userData;

    if (!phone) throw new HttpException(404, "Please enter mobile number");
    if(phone && phone.length!==10) throw new HttpException(400, `Phone number ${phone} is invalid!`);

    // Finding user in database
    let user: User = await this.users.findOne({ phone });
    
    if (!user) {
      user = await this.users.create({ ...userData });
    }

      const otp = generateOtp(4);
      console.log('otp: ',otp);
      await smsCarrierSender({phone: userData.phone, otp})

      user.otp = otp;
      user.otpExpiry = new Date(Date.now() + 10*60*60*1000);

      await user.save({ validateBeforeSave: false });

      // if(Env.STAGE === STAGE.DEVELOPMENT) {
      //   return {
      //     userId: user._id, 
      //     otp,
      //     message: 'OTP passed here #dev_env'
      //   };
      // }
      // else if(Env.STAGE === STAGE.PRODUCTION) {
      //   return {
      //     userId: user._id,
      //     message: 'OTP send to mobile number'
      //   };
      // }
      // TODO: change this to above for production

      return {
        userId: user._id, 
        // otp,
        // message: 'OTP passed here #dev_env'
        message: `OTP send to ${userData.phone ? userData.phone : 'your phone'}`
      };

    
    // Create Jwt token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_TIME
    //   });
    // user.token = token;      
    // await user.save({ validateBeforeSave: false });

    // return {token};
  }

  public async logout(userData: User): Promise<any> {
    const user: User = await this.users.findOne({ _id: userData._id })
    if (!user) {
      throw new HttpException(204, `user ${userData.phone} doesn't exist`);
    } 
    else {
      //Remove the token
      user.token = '';
      await user.save({ validateBeforeSave: false });

      return { token: user.token };
    }
  }

  public async updatePassword(userData: any, user: User): Promise<any> {
    
    if (!userData) {
      throw new HttpException(401, `user data doesn't exist`);
    }

    const findUser: User = await this.users.findOne({ _id: user._id });  
    if (!user) {
      throw new HttpException(404, `user doesn't exist`);
    } 

    // Checks if password is correct or not
    const isPasswordMatched = await bcrypt.compare(userData.oldPassword, findUser.password)

    if (!isPasswordMatched) {
      throw new HttpException(401, `Password doesn't match`);
    }
    
    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    });
    user.token = token;  

    console.log('token: ',token);

    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(userData.newPassword, salt);

    await user.save({ validateBeforeSave: false });

    console.log('password changed');
    
    return {token};
  }

  //forgort password 
  public async forgotPassword(userData: any): Promise<any> {

    const user: User = await this.users.findOne({ email: userData.email })

    if (!user) {
      throw new HttpException(404, `user ${userData.email} doesn't exist`);
    } 

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex'); 
    console.log('resetToken: ',resetToken);
    
    // Hash and set to resetPasswordToken
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log('resetPasswordToken: ',resetPasswordToken);
    
    // Set token expire time
    const resetPasswordExpire = new Date( Date.now() + 30 * 60 * 1000 );
    console.log('resetPasswordExpire: ',resetPasswordExpire);

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    console.log('resetUrl: ',resetUrl);

    //send confirmation mail
    try {
      const htmlData = ` 
      Forgot your password? Don't worry, We got you covered!, 

      Dear ${user.email}, user this link to reset your password.
      
      <a href='${resetUrl}'>${resetUrl}</a>
      
      ` 

        // using axios for sending email
        await axios.post(`https://mail-sender.vingb.com/custom-mail/${emailApiKey}`, {
          to_email: user.email,
          subject: "Reset your password",
          html_data: htmlData,
        })
    } catch (error) {
      console.log(error);
    }
    
    return {message: `Reset email has been send to ${user.email} successfully`};
  }

  public async resetPassword(resetData: any, resetToken: string): Promise<any> {

    // const user: User = await this.users.findOne({ email: userData.email })

    // Hash URL token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await this.users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new HttpException(401, `Password reset token is invalid or has been expired`);
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      throw new HttpException(401, "Password does not match");
    } 

    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set new user password to hashed password
    user.password = await bcrypt.hash(resetData.newPassword, salt);

    // Create Jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
      });
    user.token = token; 
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save({ validateBeforeSave: false });

    console.log('password reset');
    
    return {token};
  }

}

export default AuthService;
