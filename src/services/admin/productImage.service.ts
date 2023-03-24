import _ from 'lodash';
import { toNumber } from 'lodash';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@/interfaces/product.interface';
import productModel from '@/models/product.model';
import { CreateProductImageDto } from '@/dtos/productImage.dto';
import cloudinary from '@/utils/cloudinary';

class AdminProductImageService {
  public product = productModel;

  public async createProductImage(productId: string, files: any): Promise<any> {
    const Product: Product = await this.product.findById(productId);
    const images = [];

    for (const file of files) {
      const publicId = `product/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id: publicId });
      images.push({
        publicId: result.public_id,
        url: result.secure_url,
      });
    }
    Product.images.push(...images);
    const productImage = await Product.save();
    return productImage;
  }

  public async updateProductImage(productImageId: string, productImageData: CreateProductImageDto): Promise<Product> {
    const updateProductImageById: Product = await this.product.findByIdAndUpdate(productImageId, productImageData, { new: true });
    if (!updateProductImageById) throw new HttpException(409, "You're not product");

    return updateProductImageById;
  }

  public async deleteProductImage(productId: string,productImageId:string): Promise<Product> {
    // const findProductId =
    const product: Product = await this.product.findOne({ productId })
    if (!product) throw new HttpException(404, 'Product not found');

    const deletedProduct: Product = await this.product.findByIdAndUpdate(product._id, { $pull: { images: { _id: productImageId } } }, { new: true });
    if (!deletedProduct) throw new HttpException(409, "You're not product");

    return deletedProduct;
  }
}

export default AdminProductImageService;
