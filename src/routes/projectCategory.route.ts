import { BaseRoute, Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AdminProjectCategoryController from '@/controllers/admin/admin-projectCategory.controller ';
import { CreateProjectCategoryDto } from '@/dtos/projectCategory.dto';
import { authorizeRoles } from '@/middlewares/singleAuthCheck.middlware';
import { ROLE } from '@/models/user.model';

class ProjectCategoryRoute extends BaseRoute implements Routes {
  public path = '/project-category';
  public adminProjectCategoryController = new AdminProjectCategoryController();
 
  constructor() {
    super()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //admin
    this.router.get(`${this.path}/admin/all`, authorizeRoles([ROLE.ADMIN]), this.adminProjectCategoryController.getProjectCategory);
    this.router.get(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.adminProjectCategoryController.getProjectCategoryById);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateProjectCategoryDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.adminProjectCategoryController.createProjectCategory);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateProjectCategoryDto, 'body', false), authorizeRoles([ROLE.ADMIN]), this.adminProjectCategoryController.updateProjectCategory);
    this.router.delete(`${this.path}/admin/:id`, authorizeRoles([ROLE.ADMIN]), this.adminProjectCategoryController.deleteProjectCategory);
  }
}

export default ProjectCategoryRoute;

