import _ from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import projectCategoryModel from '@/models/projectCategory.model';
import { ProjectCategory } from '@/interfaces/projectCategory.interface';
import { CreateProjectCategoryDto } from '@/dtos/projectCategory.dto';


class AdminProjectCategoryService {
  public projectCategory = projectCategoryModel;

  public async findAllProjectCategories(): Promise<ProjectCategory[]> {
    const projectCategories: ProjectCategory[] = await this.projectCategory.find().sort({createdAt:-1});
    
    return projectCategories;
  }

  public async findProjectCategoryById(projectCategoryId: string): Promise<ProjectCategory> {
    if (isEmpty(projectCategoryId)) throw new HttpException(400, "You're not project category id");

    const findProjectCategory: ProjectCategory = await this.projectCategory.findOne({ _id: projectCategoryId });
    if (!findProjectCategory) throw new HttpException(409, "You're not project category");

    return findProjectCategory; 
  }

  public async createProjectCategory(projectCategoryData: CreateProjectCategoryDto): Promise<any> {
    const createProjectCategoryData: ProjectCategory = await this.projectCategory.create({ ...projectCategoryData });

    return createProjectCategoryData;
  }

  public async updateProjectCategory(projectCategoryId: string, projectCategoryData: CreateProjectCategoryDto): Promise<any> {
    const updateProjectCategoryById: ProjectCategory = await this.projectCategory.findByIdAndUpdate(projectCategoryId, projectCategoryData, {new:true});
    if(!updateProjectCategoryById) throw new HttpException(400, "You're not project category");

    return updateProjectCategoryById;
  }

  public async deleteProjectCategory(projectCategoryId: string): Promise<ProjectCategory> {
    const deleteProjectCategoryById: ProjectCategory = await this.projectCategory.findByIdAndDelete(projectCategoryId);
    if (!deleteProjectCategoryById) throw new HttpException(400, "You're not project category")

    return deleteProjectCategoryById;
  }
}

export default AdminProjectCategoryService;
