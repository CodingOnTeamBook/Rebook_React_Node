import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  Patch,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';
import { AuthUser } from '../users/users.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { reviewmulterOptions } from './reviews.multerOptions';

@Controller('/api/review')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  /*최신순으로 리뷰 불러오기
  @Get(':page')
  loadreviews(@Param() page: number) {
    return this.reviewService.loadReviews(page);
  }*/

  //하나의 리뷰 자세히 불러오기
  @Get('/detail')
  loadDetailReview(@Body() reviewid: string) {
    return this.reviewService.detailReview(reviewid);
  }

  //리뷰 작성
  @Post('/write')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'reviewHtml', maxCount: 1 },
        { name: 'coverImg', maxCount: 1 },
      ],
      reviewmulterOptions
    )
  )
  write(
    @AuthUser() data: any,
    @UploadedFiles() file: File[],
    @Body() createReviewDto: CreateReviewDto,
    @Res() res
  ) {
    if (!data.userId) {
      throw new HttpException(
        '유효하지 않은 요청입니다.',
        HttpStatus.UNAUTHORIZED
      );
    }
    this.reviewService
      .writeReview(file, createReviewDto)
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
