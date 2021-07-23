import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async findOne(nickname: string): Promise<Comment> {
    return this.commentRepository.findOne({ where: { nickname } });
  }

  async find(commentid: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { commentid } });
  }

  //댓글 작성
  async writeComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    comment.text = createCommentDto.text;
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
  async deleteComment(commentid: number): Promise<void> {
    const comment = await this.find(commentid);
    await this.commentRepository.delete(comment);
  }
}
