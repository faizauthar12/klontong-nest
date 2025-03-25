import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSchema } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductSchema)
    private productRepository: Repository<ProductSchema>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductSchema> {
    const newMenu = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newMenu);
  }

  async findAll(): Promise<ProductSchema[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<ProductSchema> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
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
    const product = await this.findById(id);
    return this.productRepository.remove(product);
  }
}
