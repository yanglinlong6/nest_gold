import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Minio from 'minio';
import { Users } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly minioClient: Minio.Client;
  logger: Logger = new Logger(UserService.name, { timestamp: true });

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
    this.minioClient = new Minio.Client({
      // endPoint: 'minio.linux008.com',
      endPoint: '149.129.78.23',
      port: 9000,
      useSSL: false,
      // useSSL: true,
      accessKey: 'gold',
      secretKey: 'r4285613u8t#2!',
    });
  }

  async getUser() {
    // return 'User Service';
    // let data = await this.userRepository.find();
    let data = await this.userRepository.query('select id from users');
    console.log(data);
    return data;
  }

  async createUser(user: Users) {
    this.userRepository.query('select id from users');
    this.userRepository.save(user);
  }

  async uploadFile(bucketName: string, objectName: string, data: Buffer) {
    console.log('uploadFile NIAHO');
    this.logger.log('uploadFile NIAHO');
    let address = await this.minioClient.putObject(
      bucketName,
      objectName,
      data,
    );
    console.log(address);
  }

  async download(bucketName: string, objectName: string, data: Buffer) {
    console.log('uploadFile NIAHO');
    this.logger.log('uploadFile NIAHO');
    let address = await this.minioClient.putObject(
      bucketName,
      objectName,
      data,
    );
    console.log(address);
  }

  async deleteFile(fileName: string) {
    return await this.minioClient.removeObject(
      'gold',
      fileName,
      async (err) => {
        if (err) {
          throw new HttpException('删除失败，请重试', HttpStatus.BAD_REQUEST);
        }
      },
    );
  }

  async listAllFilesByBucket() {
    const tmpByBucket = await this.minioClient.listObjectsV2('gold', '', true);
    return this.readData(tmpByBucket);
  }

  readData = async (stream) =>
    new Promise((resolve, reject) => {
      const a = [];
      stream
        .on('data', function (row) {
          a.push(row);
        })
        .on('end', function () {
          resolve(a);
        })
        .on('error', function (error) {
          reject(error);
        });
    });
}
