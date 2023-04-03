import _ from 'lodash'
import { toNumber } from 'lodash'
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/product.interface';
import productModel from '@/models/product.model';
import { CreateProductDto } from '@/dtos/product.dto';
import cloudinary from '@/utils/cloudinary';

class AdminProductService {
  public product = productModel;

  public async findProductById(productId: string): Promise<Product> {
    console.log('productId in service:', productId);
    const findProduct: Product = await this.product.findById({ _id: productId },
       );
    if (!findProduct) throw new HttpException(409, "You're not user");

    return findProduct;
  }
  
  public async findAllProducts(page: string, limit: string, query): Promise<{ Products: Product[]; total: number; page: string }> {
    let queryData = {};

    if (query?.search) {
      queryData['$or'] = [{ name: { $regex: query?.search ? query?.search : '', $options: 'i' } }];
    }

    const Products: Product[] = await this.product
      .find(queryData)
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
    const total = await this.product.find().countDocuments();
    return { Products, page, total };
  }


  public async createProduct(productData: CreateProductDto): Promise<any> {
    const createProductData: Product = await this.product.create({ ...productData });
    return createProductData;
  }

public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    const updateProductById: Product = await this.product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updateProductById) throw new HttpException(409, "You're not product");

    return updateProductById;
  }
  
  
  public async deleteProduct(id: string): Promise<Product> {
    const product: Product = await this.product.findById(id);
  
    if (!product) {
      throw new HttpException(404, "Product not found");
    }
  
    // Delete all images associated with the product from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  
    // Delete the product from the database
    const deleteProductById: Product = await this.product.findByIdAndDelete(id);
  
    if (!deleteProductById) {
      throw new HttpException(409, "Product not found");
    }
  
    return deleteProductById;
  }
  
}

export default AdminProductService;
