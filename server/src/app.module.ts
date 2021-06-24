import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevDBConfg } from './config/db.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DevDBConfg,
      type: 'mysql',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, //서버 처음에 켤 때 true고 그 이후론 false로 하는 듯
    }),
    ConfigModule.forRoot({
      //process.env 전역에서 사용가능?
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
