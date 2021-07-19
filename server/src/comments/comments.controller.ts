import {
  Body,
  Controller,
  HttpStatus,
  Delete,
  Post,
  Patch,
  Res,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

@Controller('/api/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/write/:reviewid')
  create(@Body() createCommentDto: CreateCommentDto, @Res() res) {
    this.commentsService
      .writeComment(createCommentDto)
      .then((value: Comment) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          comment: value,
        });
      });
  }

  @Patch('/update/:commentid')
  updateComment(
    @Param('commentid') commentid: number,
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
  deleteComment(@Param('commentid') commentid: number, @Res() res) {
    this.commentsService.deleteComment(commentid).then(() => {
      return res.status(HttpStatus.OK).json({
        data: { commentid },
        tatusCode: 201,
        statusMsg: `deleted successfully`,
      });
    });
  }
}
