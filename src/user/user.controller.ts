import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  logger: Logger = new Logger(UserController.name, { timestamp: true });

  constructor(private readonly userService: UserService) {}

  @Get('/getUser')
  async getUser() {
    this.logger.log('getUser NIHAO');
    return this.userService.getUser(); // 返回一个字符串
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: any) {
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log('fileUploaded' + file.originalname);
    this.logger.log('fileUploaded NIHAO' + file.originalname);
    await this.userService.uploadFile('gold', file.originalname, file.buffer);
    return 'File uploaded successfully';
  }

  @Delete('deleteFile/:fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    return this.userService.deleteFile(fileName);
  }

  @Get('fileList')
  async fileList() {
    return this.userService.listAllFilesByBucket();
  }
}
