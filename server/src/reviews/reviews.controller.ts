import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';
import { AuthUser } from '../users/users.decorator';

@Controller('/api/review')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get(':page')
  loadreviews(@AuthUser() data: any, @Param() page: number) {
    return this.reviewService.loadReviews(page);
  }
  /*
  @Post('/write')
  write(
    @AuthUser() data: any,
    @Body() createReviewDto: CreateReviewDto,
    tag: string,
    @Res() res
  ) {
    console.log(data);
    if (!data.userId) {
      throw new HttpException(
        '유효하지 않은 요청입니다.',
        HttpStatus.BAD_REQUEST
      );
    }
    console.log(data);
    this.reviewService
      .writeReview(data.userId, createReviewDto)
      .then((value: Review) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          review: value,
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          error: err,
        });
      });
  }*/

  //@Post('/update')
  //update(@Body())
}
