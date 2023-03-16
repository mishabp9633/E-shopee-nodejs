import _ from 'lodash'
import { toNumber } from 'lodash'
import { CreateProjectDto } from '@/dtos/project.dto';
import { HttpException } from '@exceptions/HttpException';
import { Project } from '@/interfaces/project.interface';
import projectModel from '@/models/project.model';
import { isEmpty } from '@utils/util';


class AdminProjectService {
  public project = projectModel;

  public async findAllProjects(page: string, limit: string, category: string, status:string, dueDate:string, query): Promise<{
    projects: Project[],
    total: number,
    page: string}> {

      let queryData = {}

      //Sorted projects by category 
      if (category){
        queryData["category"] = category
      }

      //Sorted projects by status 
      if (status){
        queryData["status"] = status
      }

      //Sorted projects by due date 
      if (dueDate) {
        queryData["history.proposedEndDate"] = { $lte: new Date(dueDate) }
      }

      //Search for all projects list
      if(query?.search){
        queryData["$or"]=[
          {title : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
        ]
      }
      
    const projects: Project[] = await this.project.find()
    .sort({createdAt:-1})
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));

    const total = await this.project.find().countDocuments()
    
    return {
          projects,
          page,
          total
      }
  }

  public async findProjectById(projectId: string): Promise<Project> {
    if (isEmpty(projectId)) throw new HttpException(400, "You're not projectId");

    const findProject: Project = await this.project.findOne({ _id: projectId });
    if (!findProject) throw new HttpException(409, "You're not project");

    return findProject; 
  }

  public async createProject(projectData: CreateProjectDto): Promise<any> {
    const createProjectData: Project = await this.project.create({ ...projectData });

    return createProjectData;
  }

  public async updateProject(projectId: string, projectData: CreateProjectDto): Promise<any> {
    const updateProjectById: Project = await this.project.findByIdAndUpdate(projectId, projectData, {new:true});
    if(!updateProjectById) throw new HttpException(400, "You're not project");

    return updateProjectById;
  }

  public async deleteProject(projectId: string): Promise<Project> {
    const deleteProjectById: Project = await this.project.findByIdAndDelete(projectId);
    if (!deleteProjectById) throw new HttpException(400, "You're not project")

    return deleteProjectById;
  }
}

export default AdminProjectService;
