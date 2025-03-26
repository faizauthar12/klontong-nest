import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductSchema } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { CategorySchema } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { LogSchema } from './log/log.entity';
import { LogModule } from './log/log.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'klontong',
      entities: [ProductSchema, CategorySchema, LogSchema],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    CategoryModule,
    LogModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
