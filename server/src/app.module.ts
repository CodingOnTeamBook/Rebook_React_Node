import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevDBConfig } from './config/db.config';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';
import { BookModule } from './book/book.module';
import { ReviewerModule } from './reviewer/reviewer.module';
import { animationFrameScheduler } from 'rxjs';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DevDBConfig,
      type: 'mysql',
      entities: [__dirname + 'entities/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: false, //서버 처음에 켤 때 true고 그 이후론 false로 하는 듯
    }),
    //ServeStaticModule.forRoot({
    //  rootPath: join(__dirname, '../../client/build')
    //}),
    ConfigModule.forRoot({
      //process.env 전역에서 사용가능?
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
    }),
    UsersModule,
    ReviewsModule,
    BookModule,
    ReviewerModule,
    CommentsModule,
  ],
})
export class AppModule {}
