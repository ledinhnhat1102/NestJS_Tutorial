import { Body, Controller, Post, Get, Put, Delete, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { ProductDto } from "src/dto/product.dto";
import { ProductsEntity } from "src/entities/products.entity";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async postProduct(@Body() productDto: ProductDto): Promise<ResponseData<ProductsEntity>> {
        try {
            const product = await this.productService.postProduct(productDto);
            return new ResponseData<ProductsEntity>(product, 200, 'Sản phẩm đã được thêm thành công');
        } catch (error) {
            console.error('Error adding product:', error);
            return new ResponseData<ProductsEntity>(null, 500, 'Đã xảy ra lỗi khi thêm sản phẩm');
        }
    }

    @Get()
    async getProducts(): Promise<ResponseData<ProductsEntity[]>> {
        try {
            const products = await this.productService.getProducts();
            return new ResponseData<ProductsEntity[]>(products, 200, 'Danh sách sản phẩm');
        } catch (error) {
            console.error('Error fetching products:', error);
            return new ResponseData<ProductsEntity[]>(null, 500, 'Đã xảy ra lỗi khi lấy danh sách sản phẩm');
        }
    }

    @Get(':id')
    async getProductDetail(@Param('id') id: number): Promise<ResponseData<ProductsEntity>> {
        try {
            const product = await this.productService.getProductDetail(id);
            if (!product) {
                return new ResponseData<ProductsEntity>(null, 404, 'Sản phẩm không tìm thấy');
            }
            return new ResponseData<ProductsEntity>(product, 200, 'Chi tiết sản phẩm');
        } catch (error) {
            console.error('Error fetching product details:', error);
            return new ResponseData<ProductsEntity>(null, 500, 'Đã xảy ra lỗi khi lấy chi tiết sản phẩm');
        }
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number, @Body() productDto: ProductDto): Promise<ResponseData<ProductsEntity>> {
        try {
            const updatedProduct = await this.productService.updateProduct(id, productDto);
            if (!updatedProduct) {
                return new ResponseData<ProductsEntity>(null, 404, 'Sản phẩm không tìm thấy để cập nhật');
            }
            return new ResponseData<ProductsEntity>(updatedProduct, 200, 'Sản phẩm đã được cập nhật thành công');
        } catch (error) {
            console.error('Error updating product:', error);
            return new ResponseData<ProductsEntity>(null, 500, 'Đã xảy ra lỗi khi cập nhật sản phẩm');
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number): Promise<ResponseData<void>> {
        try {
            const result = await this.productService.deleteProduct(id);
            if (!result) {
                return new ResponseData<void>(null, 404, 'Sản phẩm không tìm thấy để xóa');
            }
            return new ResponseData<void>(null, 200, 'Sản phẩm đã được xóa thành công');
        } catch (error) {
            console.error('Error deleting product:', error);
            return new ResponseData<void>(null, 500, 'Đã xảy ra lỗi khi xóa sản phẩm');
        }
    }
}




