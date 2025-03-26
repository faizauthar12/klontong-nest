import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSchema } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategorySchema } from '../category/category.entity';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductSchema)
    private productRepository: Repository<ProductSchema>,
    @InjectRepository(CategorySchema)
    private categoryRepository: Repository<CategorySchema>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductSchema> {
    // Find Category
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    // Assign product with category
    const newProduct = this.productRepository.create({
      ...createProductDto,
      category: category,
    });

    return await this.productRepository.save(newProduct);
  }

  async findAll(
    page: number,
    per_page: number,
    search?: string,
  ): Promise<{ data: FindProductDto[]; total: number }> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      queryBuilder
        .where(`product.name LIKE '%${search}%'`)
        .orWhere(`product.description LIKE '%${search}%'`)
        .orWhere(`product.sku LIKE '%${search}%'`);
    }

    const total = await queryBuilder.getCount();

    const skip = (page - 1) * per_page;
    queryBuilder.skip(skip).take(per_page);

    const products = await queryBuilder.getMany();

    const productDtos = products.map((product) => {
      const response = new FindProductDto();

      response.id = product.id;
      response.sku = product.sku;
      response.name = product.name;
      response.description = product.description;
      response.weight = product.weight;
      response.width = product.width;
      response.length = product.length;
      response.height = product.height;
      response.image = product.image;
      response.price = product.price;
      response.categoryId = product.category?.id || null;
      response.categoryName = product.category?.name || null;

      return response;
    });

    // return the data and total
    return { data: productDtos, total };
  }

  async findById(id: number): Promise<FindProductDto> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      const response = new FindProductDto();

      response.id = product.id;
      response.sku = product.sku;
      response.name = product.name;
      response.description = product.description;
      response.weight = product.weight;
      response.width = product.width;
      response.length = product.length;
      response.height = product.height;
      response.image = product.image;
      response.price = product.price;
      response.categoryId = product.category?.id || null;
      response.categoryName = product.category?.name || null;

      return response;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductSchema> {
    const product = await this.findById(id);
    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<ProductSchema> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    return this.productRepository.remove(product);
  }
}
