import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategorySchema } from '../category/category.entity';
import { ProductSubscriber } from './product.subscriber';
import { LogService } from '../log/log.service';
import { LogSchema } from '../log/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSchema, CategorySchema, LogSchema]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductSubscriber, LogService],
  exports: [ProductService],
})
export class ProductModule {}
