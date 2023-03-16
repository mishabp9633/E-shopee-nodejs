import { NextFunction, Request, Response } from 'express';
import { CreateProjectDto } from '@/dtos/project.dto';
import { Project } from '@/interfaces/project.interface';
import AdminProjectService from '@/services/admin/admin-project.service';

class AdminProjectController {
  public projectService = new AdminProjectService();

  public getProjects = async (req: Request, res:Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = req.query.page as string;
      const limit: string = (req.query.limit || '10') as string;
      const category: string = req.query.category as string;
      const status: string = req.query.status as string;
      const dueDate: string = req.query.dueDate as string;
      
      const findAllProjectData = await this.projectService.findAllProjects(page, limit, category, status, dueDate, query);
      res.status(200).json( findAllProjectData )
    } catch (error) {
      next(error)
    }
  }

  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id
      const findOneProjectData: Project = await this.projectService.findProjectById(projectId);

      res.status(200).json(findOneProjectData)
    } catch (error) {
      next(error)
    }
  }

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData: CreateProjectDto = req.body;
      const createProjectData: Project = await this.projectService.createProject(projectData);

      res.status(200).json( createProjectData )
    } catch (error) {
      next(error)
    }
  }


  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id;
      const projectData: CreateProjectDto = req.body;
      const updateProjectData: Project = await this.projectService.updateProject(projectId, projectData)

      res.status(200).json(updateProjectData)
    } catch (error) {
      next(error)
    }
  }


  public deletePoject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id; 
      const deleteProjectData: Project = await this.projectService.deleteProject(projectId)

      res.status(200).json(deleteProjectData)
    } catch (error) {
      next(error)
    }
  };
}

export default AdminProjectController;