import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @ApiProperty({ example: 'Ciki', description: 'Product Name' })
  name: string;

  @IsNotEmpty({ message: 'Category id is required' })
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Category ID' })
  categoryId: number;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  @ApiProperty({
    example: 'Ciki is a snack',
    description: 'Product Description',
  })
  description: string;

  @IsNotEmpty({ message: 'Weight is required' })
  @IsNumber()
  @ApiProperty({ example: 100, description: 'Product Weight' })
  weight: number;

  @IsNotEmpty({ message: 'Width is required' })
  @IsNumber()
  @ApiProperty({ example: 10, description: 'Product Width' })
  width: number;

  @IsNotEmpty({ message: 'Length is required' })
  @IsNumber()
  @ApiProperty({ example: 10, description: 'Product Length' })
  length: number;

  @IsNotEmpty({ message: 'Height is required' })
  @IsNumber()
  @ApiProperty({ example: 10, description: 'Product Height' })
  height: number;

  @IsNotEmpty({ message: 'Image is required' })
  @IsNumber()
  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'Product Image',
  })
  image: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  @ApiProperty({ example: 10000, description: 'Product Price' })
  price: number;
}
