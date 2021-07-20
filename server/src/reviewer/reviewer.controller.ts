import { Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';

@Controller('api/reviewer')
export class ReviewerController {
  constructor(private reviewerService: ReviewerService) {}

  @Get('/detail/:nickname')
  getReviwerDetail(@Param('nickname') nickname: string, @Res() res) {
    return this.reviewerService.reviewerDetail(nickname).then((value) => {
      if (value === '1') {
        res.status(HttpStatus.OK).json({
          success: true,
          error: 1,
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          reviewer: value,
        });
      }
    });
  }

  @Get('/:genres')
  getReviewers(@Param('genres') genres: string, @Res() res) {
    return this.reviewerService.getReviewer(genres).then((value) => {
      res.status(HttpStatus.OK).json({
        success: true,
        reviewers: value,
      });
    });
  }
}
