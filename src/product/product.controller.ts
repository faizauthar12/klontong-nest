import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
  async findAll(
    @Res() response: Response,
    @Query('page') page: number = 1,
    @Query('per_page') per_page: number = 10,
    @Query('search') search: string,
  ) {
    const productsResponse = await this.productService.findAll(
      page,
      per_page,
      search,
    );

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Products have been retrieved successfully',
      data: productsResponse.data,
      total: productsResponse.total,
      page: page,
      per_page: per_page,
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
