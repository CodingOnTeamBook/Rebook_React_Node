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
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';
import { AuthUser } from '../users/users.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { reviewmulterOptions } from './reviews.multerOptions';

@Controller('/api/review')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  //하나의 리뷰 자세히 불러오기
  @Post('/detail')
  loadDetailReview(@Body() reviewid: string, @Res() res) {
    return this.reviewService.detailReview(reviewid).then((value) => {
      res.status(HttpStatus.OK).json({
        success: true,
        review: value,
      });
    });
  }

  //인기리뷰6개 불러오기
  @Get('/home')
  load6PopularReviews(@Res() res) {
    return this.reviewService.orderbyLike().then((value) => {
      res.status(HttpStatus.OK).json({
        success: true,
        reviews: value,
      });
    });
  }

  //리뷰 작성
  @Post('/write')
  @UseInterceptors(FileInterceptor('reviewHtml', reviewmulterOptions))
  write(
    @AuthUser() data: any,
    @UploadedFile() file: File[],
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

  @Patch('/update')
  @UseInterceptors(FileInterceptor('reviewHtml', reviewmulterOptions))
  updateReview(
    @AuthUser() data: any,
    @UploadedFile() file: File[],
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res
  ) {
    this.reviewService
      .updateReview(data.userId, file, updateReviewDto)
      .then((value: Review) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          review: value,
        });
      });
  }

  /*@Delete('/delete')
  deleteReview(@AuthUser() data: any, @Body() reviewid: string, @Res() res) {
    return this.reviewService
      .deleteReview(data.userId, reviewid)
      .then((value) => {
        res.status(HttpStatus.OK).json({
          success: true,
          result: value,
        });
      });
  }*/

  //api/review/:param이라 가장 뒤쪽에 배치!
  //최신순or인기순으로 리뷰 불러오기
  @Get('/:orderby')
  loadreviews(@Param('orderby') orderby: string, @Res() res) {
    return this.reviewService.loadReviews(orderby).then((value) => {
      res.status(HttpStatus.OK).json({
        success: true,
        reviews: value,
      });
    });
  }
}
