import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    stockQuantity: number;
}