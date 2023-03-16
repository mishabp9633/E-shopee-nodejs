import { NextFunction, Request, Response } from 'express';
import { CreateEnquiryDto } from '@/dtos/enquiry.dto';
import { Enquiry } from '@/interfaces/enquiry.interface';
import UserBannerService from '@/services/user/user-banner.service';

class UserEnquiryController {
  public enquiryService = new UserBannerService();

  public createEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiryData: CreateEnquiryDto = req.body;
      const createEnquiryData: Enquiry = await this.enquiryService.createEnquiry(enquiryData);

      res.status(200).json( createEnquiryData );
    } catch (error) {
      next(error);
    }
  };

  // public getUserBanners = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllBannersData: Banner[] = await this.bannerService.findAllUserBanners();

  //     res.status(200).json( findAllBannersData );
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getUserBannerById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const bannerId: string = req.params.id;
  //     const findOneBannerData: Banner = await this.bannerService.findUserBannerById(bannerId);

  //     res.status(200).json( findOneBannerData );
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default UserEnquiryController;
