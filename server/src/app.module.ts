import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  //데코레이터: 클래스에 함수 기능을 추가할 수 있음
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: DB 유저 네임
      password: DB 유저 비밀번호
      database: DB 테이블 명
      models: [User],
      autoLoadModels: true, //
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  //controllers: [UsersController],
  //providers: [UsersService],
})
export class AppModule {}
