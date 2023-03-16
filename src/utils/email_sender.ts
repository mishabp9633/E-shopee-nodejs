import ejs from 'ejs';
import axios from 'axios';
import { companyName, emailApiKey, smsApiKey } from '@/utils/consts';
import { EmailDataDto, SmsDataDto } from '@/dtos/utils.dto';
import { HttpException } from '@/exceptions/HttpException';

const locals = {
    title: 'mail test'
}
const template = `<html><title></title> </html>`

let html = ejs.render(template, locals);

// export async function userEmailSender (emailData: StoreAdminEmailDataDto) {
  
//     try {
//         const htmlData = `Dear ${emailData.name}, your order has been placed successfully. Thanks for buying from 'Deals to Home'.` 
//         // using axios for sending email
//         await axios.post(`https://mail-sender.vingb.com/custom-mail/${osperbEmailApiKey}`, {
//         to_email: emailData.email,
//         subject: "Order Item Cancelled ",
//         html_data: htmlData,
//         })
//         console.log('User email sent successfully!');
    
//     } catch (error) {
//     console.log(error);
//     }
// }

export async function storeAdminEmailSender (emailData: EmailDataDto) {
  
    try {
        const htmlData = `Your store '${emailData.storeName}' have received an order with ${emailData.itemsCount} items and value of ₹${emailData.totalPrice} from ${emailData.customerName}.` 
        
        await axios.post(`https://mail-sender.vingb.com/custom-mail/${emailApiKey}`, {
        to_email: emailData.email,
        subject: "New Order Received",
        html_data: htmlData,
        })
        console.log('Store Admin email sent successfully!');
    
    } catch (error) {
    console.log(error);
    }
}

export async function adminEmailSender (emailData: EmailDataDto) {
  
    try {
        const htmlData = `Your store '${companyName}' have received an order with ${emailData.itemsCount} items and value of ₹${emailData.totalPrice} from ${emailData.customerName}.` 
        
        await axios.post(`https://mail-sender.vingb.com/custom-mail/${emailApiKey}`, {
        to_email: emailData.email,
        subject: "New Order Received",
        html_data: htmlData,
        })
        console.log('Admin email sent successfully!');
    
    } catch (error) {
    console.log(error);
    }
}