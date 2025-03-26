import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @ApiProperty({ example: 'Snacks', description: 'Category Name' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  @ApiProperty({
    example: 'Snacks category',
    description: 'Category Description',
  })
  description: string;
}
