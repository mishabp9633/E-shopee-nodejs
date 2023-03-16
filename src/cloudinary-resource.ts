import cloudinary from 'cloudinary';

import { Env } from '@/configs/env';

export class CloudinaryResource {
  static initialize() {
    cloudinary.v2.config({
      cloud_name: Env.CLOUDINARY_CLOUD_NAME,
      api_key: Env.CLOUDINARY_API_KEY,
      api_secret: Env.CLOUDINARY_API_SECRET,
    });
  }

  static getResource() {
    return cloudinary.v2;
  }
}
