import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '149.129.78.23',
      port: 13306,
      username: 'root',
      password: 'shuibeieiriv!v4FV!',
      database: 'gva',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
      synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
    }),
    // UsersModule,
    // TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
