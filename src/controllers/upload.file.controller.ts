import { Controller, Post, UploadedFile, UsePipes } from '@nestjs/common';
import { FileSizeValidationPipe } from 'src/validators/pipes/uploadFile.pipe';

@Controller('upload')
export class UploadFileController {
  @Post()
  @UsePipes(new FileSizeValidationPipe())
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
