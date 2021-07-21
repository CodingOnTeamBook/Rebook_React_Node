import { Module } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';
import { ReviewerController } from './reviewer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Review } from 'src/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  providers: [ReviewerService],
  controllers: [ReviewerController],
})
export class ReviewerModule {}
