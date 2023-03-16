import axios from 'axios';
import { companyName, smsApiKey } from '../utils/consts';
import { SmsDataDto } from '@/dtos/utils.dto';
import { HttpException } from '@/exceptions/HttpException';

export function generateOtp(otp_length: Number) {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export async function smsCarrierSender (smsData: SmsDataDto) {

  const phoneWithCode = `91${smsData.phone}`
  console.log('phoneWithCode: ',phoneWithCode);

  try {
      await axios.post(`https://mail-sender.vingb.com/send_sms_view/${smsApiKey}/`, {
        "phone":phoneWithCode,
        "message":`${smsData.otp} is the OTP to access \n${companyName}.\n\nPlease do not share this with anyone`,
        "sender":"OSPERB"
      })
      console.log('SMS sent successfully!');
  
  } catch (error) {
    console.log(error);
  }
}

