import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
import { User } from 'src/entities/user.entity';
import { Review } from 'src/entities/review.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  //댓글 작성
  async writeComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    comment.text = createCommentDto.text;
    comment.user = await this.userRepository.findOne({
      userId: createCommentDto.userId,
    });
    return this.commentRepository.save(comment);
  }

  //댓글 수정
  async updateComment(
    commentid: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { commentid },
    });
    console.log(comment);
    if (updateCommentDto.text) {
      comment.text = updateCommentDto.text;
    }
    return this.commentRepository.save(comment);
  }

  //댓글 삭제
  async deleteComment(commentid: number) {
    const comment = await this.commentRepository.findOne({
      where: { commentid },
    });
    if (comment) {
      return this.commentRepository.delete(commentid);
    }
  }
  // //댓글 수정
  // async updateComment(
  //   id: number,
  //   commentid: number,
  //   updateCommentDto: UpdateCommentDto
  // ): Promise<Comment> {
  //   const comment = await this.commentRepository.findOne({
  //     where: { commentid },
  //     relations: ['user'],
  //   });
  //   console.log(comment.user.userId);
  //   if (parseInt(comment.user.userId) !== id) {
  //     console.log(comment.user.userId);
  //     throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
  //   }

  //   if (updateCommentDto.text) {
  //     comment.text = updateCommentDto.text;
  //   }
  //   return this.commentRepository.save(comment);
  // }

  // //댓글 삭제
  // async deleteComment(id: number, commentid: number) {
  //   const comment = await this.commentRepository.findOne({
  //     where: { commentid },
  //     relations: ['user'],
  //   });
  //   if (comment.user.id !== id)
  //     throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
  //   return this.commentRepository.delete(commentid);
}
