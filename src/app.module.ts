import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { ProductsEntity } from './entities/products.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'nestjs-api-v1',
            entities: [ProductsEntity], 
            synchronize: true,
        }),
        ProductModule,
        AuthModule,
        JwtModule
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*'); // Áp dụng LoggerMiddleware cho tất cả các route
    }
}
