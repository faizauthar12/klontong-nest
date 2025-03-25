import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() response: Response,
  ) {
    const product = await this.productService.create(createProductDto);

    response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Product has been created successfully',
      data: product,
    });
  }

  @Get()
  async findAll(@Res() response: Response) {
    const products = await this.productService.findAll();

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Products have been retrieved successfully',
      data: products,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() response: Response) {
    const product = await this.productService.findById(id);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product has been retrieved successfully',
      data: product,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
    @Res() response: Response,
  ) {
    const product = await this.productService.update(id, updateProductDto);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product has been updated successfully',
      data: product,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() response: Response) {
    const product = await this.productService.remove(id);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product has been deleted successfully',
      data: product,
    });
  }
}
