import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';
import { google } from 'googleapis';
import { User } from '@/interfaces/user.interface';

export const sendMail = async (user: User): Promise<Transporter> => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID as string,
    process.env.GMAIL_CLIENT_SECRETE as string,
    process.env.GMAIL_REDIRECT_URI as string,
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN as string,
  });
  const token = crypto.randomBytes(20).toString('hex');
  const frontendURl = 'http://localhost:3000';
  const resetLink = `${frontendURl}/resetpassword/${token}`;

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'mishabp9633@gmail.com',
      clientId: process.env.GMAIL_CLIENT_ID as string,
      clientSecret: process.env.GMAIL_CLIENT_SECRETE as string,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN as string,
      accessToken: await oAuth2Client.getAccessToken(),
    },
  });

  const mailOptions = {
    from: 'mishabp9633@gmail.com',
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Please click <a href="${resetLink}">here</a> to reset your password</p>`,
  };

  // Generate a unique token and send password reset link via email
  const result = await transporter.sendMail(mailOptions);

  console.log(`Password reset email sent: ${result.response}`);

  return result;
};


// abstract class AbstractMailSender {
//     private toUser: string;

//     constructor(toUser: string) {
//         this.toUser = toUser
//       }

//   // implement connection here
//   //   from

//   public async send(to: string, subject: string, html: string): Promise<void> {
//     // implement sending logic
//   }
// }

// class ForgotPasswordMailSender extends AbstractMailSender {
//   constructor(toUser: string) {
//     super(toUser)
//   }
// }
