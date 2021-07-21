import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { AuthMiddleware } from 'src/users/auth.middleware';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review, Comment])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/comment');
  }
}
