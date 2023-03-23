import { NextFunction, Request, Response } from 'express';
import { CreateRecentViewDto } from '@/dtos/recentView.dto';
import { RecentView } from '@/interfaces/recentView.interface';
import AdminRecentViewService from '@/services/recentView.service';

class AdminRecentViewController {
  public recentViewService = new AdminRecentViewService();

  public getRecentViews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRecentViewsData: RecentView[] = await this.recentViewService.findAllRecentViews();
      res.status(200).json( findAllRecentViewsData );
    } catch (error) {
      next(error);
    }
  };

  public getRecentViewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recentViewId: string = req.params.id;
      const findOneRecentViewData: RecentView = await this.recentViewService.findRecentViewById(recentViewId);

      res.status(200).json( findOneRecentViewData );
    } catch (error) {
      next(error);
    }
  };

  public createRecentView = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body.user._id as string
      const recentViewData: CreateRecentViewDto = req.body;
      const createRecentViewData: RecentView = await this.recentViewService.createRecentView(recentViewData, user);

      res.status(200).json( createRecentViewData );
    } catch (error) {
      next(error);
    }
  };

  public updateRecentView = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recentViewId: string = req.params.id;
      const recentViewData: CreateRecentViewDto = req.body;
      const updateRecentViewData: RecentView = await this.recentViewService.updateRecentView(recentViewId, recentViewData);

      res.status(200).json( updateRecentViewData );
    } catch (error) {
      next(error);
    }
  };

  public deleteRecentView = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recentViewId: string = req.params.id;
      const deleteRecentViewData: RecentView = await this.recentViewService.deleteRecentView(recentViewId);

      res.status(200).json( deleteRecentViewData );
    } catch (error) {
      next(error);
    }
  };
}

export default AdminRecentViewController;
