import cloudinary from 'cloudinary';
import _ from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RecentView } from '@/interfaces/recentView.interface';
import { CreateRecentViewDto } from '@/dtos/recentView.dto';
import recentViewModel from '@/models/recentView.model';


class AdminRecentViewService {
    public recentView = recentViewModel;
  
    public async findAllRecentViews(): Promise<RecentView[]> {
      const recentViews: RecentView[] = await this.recentView.find().sort({createdAt:-1});
      
      return recentViews;
    }
  
    public async findRecentViewById(recentViewId: string): Promise<RecentView> {
      if (isEmpty(recentViewId)) throw new HttpException(400, "This is not a valid recentViewId.");
  
      const findRecentView: RecentView = await this.recentView.findOne({ _id: recentViewId });
      if (!findRecentView) throw new HttpException(409, "This is not a valid recentView.");
  
      return findRecentView; 
    }
  
    public async createRecentView(recentViewData: CreateRecentViewDto, userId: string): Promise<any> {
      recentViewData.userId = userId
      const createRecentViewData: RecentView = await this.recentView.create({ ...recentViewData });
  
      return createRecentViewData;
    }
  
    public async updateRecentView(recentViewId: string, recentViewData: CreateRecentViewDto): Promise<any> {  

      const updateRecentViewById: RecentView = await this.recentView.findByIdAndUpdate(recentViewId, recentViewData, {new:true});
      if(!updateRecentViewById) throw new HttpException(400, "This is not a valid recentView Updation.");
  
      return updateRecentViewById;
    }
  
    public async deleteRecentView(recentViewId: string): Promise<RecentView> {
      const deleteRecentViewById: RecentView = await this.recentView.findByIdAndDelete(recentViewId);
      if (!deleteRecentViewById) throw new HttpException(400, "The Data has not been found.")
  
      return deleteRecentViewById;
    }
  }
  
  export default AdminRecentViewService;

