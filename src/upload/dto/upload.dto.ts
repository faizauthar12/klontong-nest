import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @IsNotEmpty({ message: 'Module is required' })
  @IsString()
  @ApiProperty({
    example: 'Product',
    description: 'uploaded file to respective module',
  })
  module: string;

  @ApiProperty({
    example: 'file',
    description: 'file that will be uploaded',
  })
  @IsNotEmpty({ message: 'File is required' })
  file: Express.Multer.File;
}
