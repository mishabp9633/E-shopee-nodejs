import { Request } from 'express';

export interface IRequestWithUser extends Request {
  uid: string
  email?: string
  phoneNumber?: string
}
