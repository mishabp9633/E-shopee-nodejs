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
      const public_id = `product/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });
      images.push({
        public_id: result.public_id,
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

  // public async deleteProductImage(productId: string): Promise<Product> {
  //   // const findProductId =
  //   const product: Product = await this.product.findOne({ productId })
  //   if (!product) throw new HttpException(404, 'Product not found');

  //   const deletedProduct: Product = await this.product.findByIdAndUpdate(product._id, { $pull: { images: { _id: productImageId } } }, { new: true });
  //   if (!deletedProduct) throw new HttpException(409, "You're not product");

  //   return deletedProduct;
  // }

  public async getPhotoById(id: string) {
    const product = await productModel.findOne({ _id: id });
    console.log('prodct::', product);

    if (!product) throw new HttpException(404, 'product not found');
    const images = product.images;
    return { images };
  }


  public async deleteProductImage(productId: string, imageIds: string[]): Promise<Product> {
    const product: Product = await this.product.findById(productId);
    
    if (!product) {
      throw new HttpException(404,'not found');
    }
  
    // Filter out the images to be deleted
    product.images = product.images.filter(image => !imageIds.includes(image._id));
    console.log(" product.images:", product.images);
    
  
    // Save the updated product
    return await product.save();
  }
  
}

export default AdminProductImageService;
