import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';
import { AuthUser } from '../users/users.decorator';

@Controller('/api/review')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  loadreviews(@Body() skipnum: string) {
    return this.reviewService.loadReviews(skipnum);
  }

  @Post('/write')
  write(
    @AuthUser() data: any,
    @Body() createReviewDto: CreateReviewDto,
    tag: string,
    @Res() res
  ) {
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
  }

  //@Post('/update')
  //update(@Body())
  @Patch('/update/:id')
  update(
    // @AuthUser() data: any,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res
  ) {
    this.reviewService
      .updateReview(id, updateReviewDto)
      .then((value: Review) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          review: value,
        });
      });
  }

  //@Delete('/')
  //deleteReview(@Body())
}
