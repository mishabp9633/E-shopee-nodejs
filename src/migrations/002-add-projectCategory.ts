import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';


export class ProjectCategory implements MigrationInterface {
  
  async up(db: Db): Promise<any> {

    const projectCategories = [
      {
        title: 'Mobile development',
        description: 'This is for mobile applications'
      },
      {
        title: 'Web development',
        description: 'This is for web applications'
      },
      {
        title: 'Branding',
        description: 'This is for Branding products'
      }
    ];

    for (const category of projectCategories) {
      const projectCategoryExists = await db.collection('ProjectCategory').findOne({ title: category.title });
      if (!projectCategoryExists) {
        const projectCategory = await db.collection('ProjectCategory').insertOne(category);
        if (projectCategory) console.log(`Added project category ${category.title} successfully`);
      } else {
        console.log(`Project category already exists with title ${category.title}`);
      }
    }
  }
}