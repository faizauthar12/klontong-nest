import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorySchema } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategorySchema)
    private categoryRepository: Repository<CategorySchema>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategorySchema> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<CategorySchema[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<CategorySchema> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException('Category does not exist!');
    } else {
      return category;
    }
  }

  async update(
    id: number,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<CategorySchema> {
    const category = await this.findById(id);
    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<CategorySchema> {
    const category = await this.findById(id);
    return this.categoryRepository.remove(category);
  }
}
