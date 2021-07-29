import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Like } from 'src/entities/like.entity';
import { AuthMiddleware } from 'src/users/auth.middleware';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review, Tag, Comment, Like])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/review/write', method: RequestMethod.POST },
        { path: '/api/review/update', method: RequestMethod.PATCH },
        { path: '/api/review/delete', method: RequestMethod.DELETE }
      );
  }
}
