import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { UploadService } from './upload.service';
import { UploadDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body: UploadDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    const fileName = this.uploadService.saveFile(file, body.module);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'File has been uploaded successfully',
      fileName: fileName,
    });
  }
}
