import { CreateProjectDto } from '@/dtos/project.dto';
import { BaseRoute, Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AdminProjectController from '@/controllers/admin/admin-project.controller';
import { ROLE } from "@/models/user.model";
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';

class ProjectRoute extends BaseRoute implements Routes {
  public path = '/project';
  public adminProjectController = new AdminProjectController();
 
  constructor() {
    super()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN]), this.adminProjectController.getProjects);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.adminProjectController.getProjectById);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateProjectDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.adminProjectController.createProject);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateProjectDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.adminProjectController.updateProject);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.adminProjectController.deletePoject);
  }
}

export default ProjectRoute;

