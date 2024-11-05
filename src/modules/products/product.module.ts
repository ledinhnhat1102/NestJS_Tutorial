import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsEntity } from 'src/entities/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductsEntity])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
