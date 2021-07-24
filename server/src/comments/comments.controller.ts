import {
  Body,
  Controller,
  HttpStatus,
  Delete,
  Post,
  Patch,
  Res,
  Param,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { AuthUser } from 'src/users/users.decorator';

@Controller('/api/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //댓글 작성
  @Post('/write/:reviewid')
  writeComment(
    @AuthUser() data: any,
    @Body() createCommentDto: CreateCommentDto,
    @Res() res
  ) {
    if (!data.id) {
      throw new HttpException(
        '유효하지 않은 요청입니다.',
        HttpStatus.UNAUTHORIZED
      );
    }
    this.commentsService
      .writeComment(createCommentDto)
      .then((value: Comment) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          comment: value,
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          error: err,
        });
      });
  }

  @Patch('/update/:commentid')
  updateComment(
    @Param('commentid', ParseIntPipe) commentid: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() res
  ) {
    this.commentsService
      .updateComment(commentid, updateCommentDto)
      .then((value: Comment) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          comment: value,
        });
      });
  }

  @Delete('/delete/:commentid')
  deleteComment(
    @Param('commentid', ParseIntPipe) commentid: number,
    @Res() res
  ) {
    this.commentsService.deleteComment(commentid).then((value) => {
      return res.status(HttpStatus.OK).json({
        data: { commentid },
        tatusCode: 201,
        result: value,
      });
    });

    // @Patch('/update/:commentid')
    // updateComment(
    //   @AuthUser() data: any,
    //   @Param('commentid', ParseIntPipe) commentid: number,
    //   @Body() updateCommentDto: UpdateCommentDto,
    //   @Res() res
    // ) {
    //   this.commentsService
    //     .updateComment(data.id, commentid, updateCommentDto)
    //     .then((value: Comment) => {
    //       return res.status(HttpStatus.OK).json({
    //         success: true,
    //         comment: value,
    //       });
    //     });
    // }

    // @Delete('/delete/:commentid')
    // deleteComment(
    //   @AuthUser() data: any,
    //   @Param('commentid', ParseIntPipe) commentid: number,
    //   @Res() res
    // ) {
    //   this.commentsService.deleteComment(data.id, commentid).then((value) => {
    //     return res.status(HttpStatus.OK).json({
    //       data: { commentid },
    //       tatusCode: 201,
    //       statusMsg: `deleted successfully`,
    //       result: value,
    //     });
    //   });
  }
}
