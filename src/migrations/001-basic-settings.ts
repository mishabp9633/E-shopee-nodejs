import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';
import bcrypt from "bcryptjs";
import AuthService from '../services/auth.service'

async function bcryptPassword (password: string) {
  const salt = await bcrypt.genSalt(10);
  const bcryptedPassword = await bcrypt.hash(password, salt);
  console.log();
  
  return bcryptedPassword;
}

export class BasicSettings implements MigrationInterface {
  
  async up(db: Db): Promise<any> {

    const adminEmail = 'dev.osperb@gmail.com';
    const pass = await bcryptPassword('admin123')
    const adminExists = await db.collection('users').findOne({email:adminEmail})

    if(!adminExists){
      const admin = await db.collection('users').insertOne(
        {
          name: 'Admin',
          role: 'admin',
          email: adminEmail,
          password: pass,
        },
      );
      if(admin) console.log(`Created Admin with email ${adminEmail} & id ${admin.insertedId}`);
    }
    else console.log(`Admin already exists with email ${adminEmail}`);
    

    await db.collection('settings').insertOne(
      {
      },
    );
    
  }

  async down(): Promise<any> {
    //
  }
}
