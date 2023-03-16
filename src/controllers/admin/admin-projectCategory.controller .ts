import { NextFunction, Request, Response } from 'express';
import { ProjectCategory } from '@/interfaces/projectCategory.interface';
import { CreateProjectCategoryDto } from '@/dtos/projectCategory.dto';
import AdminProjectCategoryService from '@/services/admin/admin-projectCategory.service';

class AdminProjectCategoryController {
  public projectCategoryService = new AdminProjectCategoryService();

  public getProjectCategory = async (req: Request, res:Response, next: NextFunction) => {
    try {
      const findAllProjectCategoryData: ProjectCategory[] = await this.projectCategoryService.findAllProjectCategories();
      res.status(200).json( findAllProjectCategoryData )
    } catch (error) {
      next(error)
    }
  }

  public getProjectCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCategoryId: string = req.params.id
      const findOneProjectCategoryData: ProjectCategory = await this.projectCategoryService.findProjectCategoryById(projectCategoryId);

      res.status(200).json(findOneProjectCategoryData)
    } catch (error) {
      next(error)
    }
  }

  public createProjectCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCategoryData: CreateProjectCategoryDto = req.body;
      const createProjectCategoryData: ProjectCategory = await this.projectCategoryService.createProjectCategory(projectCategoryData);

      res.status(200).json( createProjectCategoryData )
    } catch (error) {
      next(error)
    }
  }

  public updateProjectCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCategoryId: string = req.params.id;
      const projectCategoryData: CreateProjectCategoryDto = req.body;
      const updateProjectCategoryData: ProjectCategory = await this.projectCategoryService.updateProjectCategory(projectCategoryId, projectCategoryData)

      res.status(200).json(updateProjectCategoryData)
    } catch (error) {
      next(error)
    }
  }

  public deleteProjectCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCategoryId: string = req.params.id; 
      const deleteProjectCategoryData: ProjectCategory = await this.projectCategoryService.deleteProjectCategory(projectCategoryId)

      res.status(200).json(deleteProjectCategoryData)
    } catch (error) {
      next(error)
    }
  };
}

export default AdminProjectCategoryController;
