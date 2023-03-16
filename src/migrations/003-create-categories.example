import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';

export class CreateCategories2 implements MigrationInterface {
  async up(db: Db): Promise<any> {
    await db.collection('categories').insertMany([
      {
        name: 'Matresss',
        description: 'mattress',
      },
    ]);
  }

  async down(): Promise<any> {
    //
  }
}
