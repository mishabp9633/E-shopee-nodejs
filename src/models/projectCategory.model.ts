import { model, Schema, Document } from 'mongoose';
import { ProjectCategory } from '@interfaces/projectCategory.interface';



export const projectCategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        }
      }
    ]

  },
  { timestamps: true },
);

const projectCategoryModel = model<ProjectCategory & Document>('ProjectCategory', projectCategorySchema);

export default projectCategoryModel;
