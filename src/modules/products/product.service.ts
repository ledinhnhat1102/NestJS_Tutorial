import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductDto } from "src/dto/product.dto";
import { ProductsEntity } from "src/entities/products.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>,
    ) {}

    async postProduct(productDto: ProductDto): Promise<ProductsEntity> {
        const newProduct = this.productsRepository.create(productDto);
        return await this.productsRepository.save(newProduct);
    }
       

    async getProducts(): Promise<ProductsEntity[]> {
        return await this.productsRepository.find(); 
    }

    async getProductDetail(id: number): Promise<ProductsEntity> {
        return await this.productsRepository.findOne({ where: { id } }); 
    }

    async updateProduct(id: number, productDto: ProductDto): Promise<ProductsEntity> {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            return null; 
        }
        Object.assign(product, productDto); 
        return await this.productsRepository.save(product); 
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productsRepository.delete(id);
        return result.affected > 0;
    }
}


