export enum STAGE {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export class Env {
  public static get STAGE(): STAGE {
    switch (process.env.NODE_ENV) {
      case 'development':
        return STAGE.DEVELOPMENT;
      case 'production':
        return STAGE.PRODUCTION;
    }
    throw new Error('Stage not supported');
  }

  public static get MONGO_URL(): string {
    switch (Env.STAGE) {
      case STAGE.DEVELOPMENT:
        return `mongodb://${process.env.MONGO_HOST_DEV}:${process.env.MONGO_PORT_DEV}/${process.env.MONGO_DB_DEV}`;
      case STAGE.PRODUCTION:
        return `mongodb://${process.env.MONGO_HOST_PROD}:${process.env.MONGO_PORT_PROD}/${process.env.MONGO_DB_PROD}`;
    }
  }

  // public static get FIREBASE_SERVICE_ACCOUNT_KEY_PATH(): string {
  //   return process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
  // }

  public static get PORT(): string | number {
    return process.env.PORT || 3000;
  }

  public static get CLOUDINARY_CLOUD_NAME(): string {
    return process.env.CLOUDINARY_CLOUD_NAME;
  }

  public static get CLOUDINARY_API_KEY(): string {
    return process.env.CLOUDINARY_API_KEY;
  }

  public static get CLOUDINARY_API_SECRET(): string {
    return process.env.CLOUDINARY_API_SECRET;
  }

  public static get CLOUDINARY_URL(): string {
    return process.env.CLOUDINARY_URL;
  }

  public static get GOOGLE_MAP_API_KEY(): string {
    return process.env.GOOGLE_MAP_API_KEY;
  }

  public static get MAPBOX_PUBLIC_KEY(): string {
    return process.env.MAPBOX_PUBLIC_KEY;
  }
}
