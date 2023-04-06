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
    if(!Product) throw new HttpException(404, "product not found")
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

  public async updateProductImage(productId: string, files: any): Promise<Product> {

    const Product: Product = await this.product.findById(productId);
    if(!Product) throw new HttpException(404, "product not found")
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

    // const photos = Product.images

    // // Delete photos in cloudinary
    // for (const photo of photos) {
    //   console.log(photo);
    //   await cloudinary.uploader.destroy(photo.public_id);
    // }

  }

  public async getPhotoById(id: string) {
    const product = await productModel.findOne({ _id: id });
    console.log('prodct::', product);

    if (!product) throw new HttpException(404, 'product not found');
    const images = product.images;
    return { images };
  }

  public async deleteProductImage(productId: string, publicId: string): Promise<any> {
    const product = await this.product.findById(productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    const imageIndex = product.images.findIndex(image => image.public_id === publicId);
    if (imageIndex === -1) {
      throw new Error('Image not found.');
    }
    product.images.splice(imageIndex, 1);
    await product.save();

    await cloudinary.uploader.destroy(publicId);

    return product;
  }
}

export default AdminProductImageService;
