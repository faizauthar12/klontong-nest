import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor() {}

  saveFile(file: Express.Multer.File, module: string): string {
    const fileExtension = path.extname(file.originalname);
    let fileName = `${uuidv7()}${fileExtension}`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'files',
      'uploads',
      module,
      fileName,
    );

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the file to the local filesystem
    fs.writeFileSync(filePath, file.buffer);

    fileName = `files/uploads/${module}/${fileName}`;

    return fileName;
  }
}
