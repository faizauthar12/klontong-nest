import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategorySchema } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema,CategorySchema])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
