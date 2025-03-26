import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { LogSchema } from '../log/log.entity';
import { CategorySubscriber } from './category.subscriber';
import { LogService } from '../log/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategorySchema, LogSchema])],
  controllers: [CategoryController],
  providers: [CategoryService, CategorySubscriber, LogService],
  exports: [CategoryService],
})
export class CategoryModule {}
