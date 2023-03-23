import { NextFunction, Request, Response } from 'express';
import AdminProductService from '@/services/admin/product.service';
import { CreateProductDto } from '@/dtos/product.dto';
import { Product } from '@/interfaces/product.interface';

class AdminProductController {
  public productService = new AdminProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = req.query.page as string;
      const limit: string = (req.query.limit || '10') as string;
      // const name: string = req.query.name as string;
      const findAllProductData = await this.productService.findAllProducts(page,limit,query);
      res.status(200).json(findAllProductData);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findOneProductData: Product = await this.productService.findProductById(productId);

      res.status(200).json(findOneProductData);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(200).json(createProductData);
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json( updateProductData );
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: Product = await this.productService.deleteProduct(productId);

      res.status(200).json( deleteProductData );
    } catch (error) {
      next(error);
    }
  };
}
export default AdminProductController;
