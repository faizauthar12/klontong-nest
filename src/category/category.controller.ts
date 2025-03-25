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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() response: Response,
  ) {
    const category = await this.categoryService.create(createCategoryDto);

    response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Category has been created successfully',
      data: category,
    });
  }

  @Get()
  async findAll(@Res() response: Response) {
    const categories = await this.categoryService.findAll();

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Categories have been retrieved successfully',
      data: categories,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() response: Response) {
    const category = await this.categoryService.findById(id);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Category has been retrieved successfully',
      data: category,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
    @Res() response: Response,
  ) {
    const category = await this.categoryService.update(id, updateCategoryDto);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Category has been updated successfully',
      data: category,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() response: Response) {
    const category = await this.categoryService.remove(id);

    response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Category has been deleted successfully',
      data: category,
    });
  }
}
