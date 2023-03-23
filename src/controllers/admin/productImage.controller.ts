import { NextFunction, Request, Response } from 'express';
import productImageService from '@services/admin/productImage.service';
import { CreateProductDto } from '@/dtos/product.dto';
import { Product } from '@/interfaces/product.interface';
import AdminProductImageService from '@services/admin/productImage.service';
import { CreateProductImageDto } from '@/dtos/productImage.dto';

class AdminProductImageController {
  public productImageService = new AdminProductImageService();

  public getProductImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = req.query.page as string;
      const limit: string = (req.query.limit || '10') as string;
      // const name: string = req.query.name as string;
      const findAllProductImageData = await this.productImageService.findAllProductImages(page,limit,query);
      res.status(200).json(findAllProductImageData);
    } catch (error) {
      next(error);
    }
  };

  public getProductImageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productImageId: string = req.params.id;
      const findProductImageData: Product = await this.productImageService.findProductImageById(productImageId);

      res.status(200).json(findProductImageData);
    } catch (error) {
      next(error);
    }
  };

  public createProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productImageData: CreateProductImageDto = req.body;
      const createProductImageData: Product = await this.productImageService.createProductImage(productImageData);

      res.status(200).json(createProductImageData);
    } catch (error) {
      next(error);
    }
  };

  public updateProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productImageId: string = req.params.id;
      const productImageData: CreateProductImageDto = req.body;
      const updateProductImageData: Product = await this.productImageService.updateProductImage(productImageId, productImageData);

      res.status(200).json( updateProductImageData );
    } catch (error) {
      next(error);
    }
  };

  public deleteProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productImageId: string = req.params.id;
      const deleteProductImageData: Product = await this.productImageService.deleteProductImage(productImageId);

      res.status(200).json( deleteProductImageData );
    } catch (error) {
      next(error);
    }
  };
}
export default AdminProductImageController;
