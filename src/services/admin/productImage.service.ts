import _ from 'lodash'
import { toNumber } from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/product.interface';
import productModel from '@/models/product.model';
import { CreateProductDto } from '@/dtos/product.dto';
import { CreateProductImageDto } from '@/dtos/productImage.dto';

class AdminProductImageService {
  public productImage = productModel;

  public async findProductImageById(productImageId: string): Promise<Product> {
    console.log('productImageId in service:', productImageId);
    const findProductImage: Product = await this.productImage.findById({ _id: productImageId },
       );
    if (!findProductImage) throw new HttpException(409, " There is no image ");

    return findProductImage;
  }
  
  public async findAllProductImages(page: string, limit: string, query): Promise<{ ProductImages: Product[]; total: number; page: string }> {
    let queryData = {};

    if (query?.search) {
      queryData['$or'] = [{ name: { $regex: query?.search ? query?.search : '', $options: 'i' } }];
    }

    const ProductImages: Product[] = await this.productImage
      .find(queryData)
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
    const total = await this.productImage.find().countDocuments();
    return { ProductImages, page, total };
  }


  public async createProductImage(productImageData: CreateProductImageDto): Promise<any> {
    const createProductImageData: Product = await this.productImage.create({ ...productImageData });
    return createProductImageData;
  }

public async updateProductImage(productImageId: string, productImageData: CreateProductImageDto): Promise<Product> {
    const updateProductImageById: Product = await this.productImage.findByIdAndUpdate(productImageId, productImageData, { new: true });
    if (!updateProductImageById) throw new HttpException(409, "You're not product");

    return updateProductImageById;
  }
  
  public async deleteProductImage(productImageId: string): Promise<Product> {
    const deleteProductImageById: Product = await this.productImage.findByIdAndDelete(productImageId);
    if (!deleteProductImageById) throw new HttpException(409, "You're not product");

    return deleteProductImageById;
  }

}

export default AdminProductImageService;
