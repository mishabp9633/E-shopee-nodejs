import { NextFunction, Request, Response } from 'express';
import productImageService from '@services/admin/productImage.service';
import { CreateProductDto } from '@/dtos/product.dto';
import { Product } from '@/interfaces/product.interface';
import AdminProductImageService from '@services/admin/productImage.service';
import { CreateProductImageDto } from '@/dtos/productImage.dto';
import AdminProductService from '@/services/admin/product.service';
import cloudinary from '@/utils/cloudinary';

class AdminProductImageController {
  public productImageService = new AdminProductImageService();
  public adminProductService = new AdminProductService();

  public createProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const files: any = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const createProductImageData: Product = await this.productImageService.createProductImage(productId, files);

      res.status(200).json({ message: 'image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateProductImage = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const productId: string = req.params.id;
    //   const files: any = req.files;
      
    //   if (!files) {
    //     return res.status(400).json({ message: 'No files were uploaded.' });
    //   }
    //   const updateProductImageData: Product = await this.productImageService.updateProductImage(productId, files);

    //   res.status(200).json({message:"Updated product image"});
    // } catch (error) {
    //   next(error);
    // }

    try {
      const productId: string = req.params.id;
      const files: any = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const updateProductImage: Product = await this.productImageService.updateProductImage(productId, files);

      res.status(200).json({ message: 'image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.productId;
      const publicId: string = req.query.publicId as string;

      const updatedProduct: Product = await this.productImageService.deleteProductImage(productId, publicId);

      res.status(200).json({ message: 'image deleted successfully', product: updatedProduct });
    } catch (error) {
      next(error);
    }
  };
}
export default AdminProductImageController;
