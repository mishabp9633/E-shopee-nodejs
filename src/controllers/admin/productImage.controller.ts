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
      const productId : string = req.params.id
      const files : any = req.files
      // const productImageData: CreateProductImageDto = req.body;
      const createProductImageData: Product = await this.productImageService.createProductImage(productId,files);

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

  // public deleteProductImage = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const productId: string = req.params.id;

  //     const deleteProductImageData: Product = await this.productImageService.deleteProductImage(productId);
  //     console.log("delete pro img:",deleteProductImageData);
      

  //     res.status(200).json( deleteProductImageData );
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public Delete = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const productId = req.params.id
        const {images} = await this.productImageService.getPhotoById(productId);
        console.log('photos:', images);
  
        // Delete photos in cloudinary

        for (const image of images) {
          console.log("image::",image);
          
          await cloudinary.uploader.destroy(image.public_id);
          console.log("image publicId:",image.public_id);
          
        }
        // Delete images from the database
    const imageIds = images.map(image => image._id);
    const result = await this.productImageService.deleteProductImage(productId, imageIds);
    console.log('result', result);

        
        // const imageId = req.body.images._id
        // const result = await this.adminProductService.deleteProduct(imageId)
        // console.log('result',result)
        res.status(200).send("success")
    }catch(err){
        console.log(err);
        next(err)
    }    
}

}
export default AdminProductImageController;
