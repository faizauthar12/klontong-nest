import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Category id is required' })
  @IsNumber()
  categoryId: number;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Weight is required' })
  @IsNumber()
  weight: number;

  @IsNotEmpty({ message: 'Width is required' })
  @IsNumber()
  width: number;

  @IsNotEmpty({ message: 'Length is required' })
  @IsNumber()
  length: number;

  @IsNotEmpty({ message: 'Height is required' })
  @IsNumber()
  height: number;

  @IsNotEmpty({ message: 'Image is required' })
  @IsNumber()
  image: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  price: number;
}