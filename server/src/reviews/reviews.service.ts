import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { uploadReviewHtml } from './reviews.multerOptions';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}

  /*최신순으로 리뷰 불러오기
  async loadReviews(p: any): Promise<[Review[], number]> {
    const page = parseInt(p.p);
    const reviews = await this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: page === 1 ? 0 : page - 1,
      take: 12,
    });
    return reviews;
  }*/

  //하나의 리뷰 자세히 불러오기
  async detailReview(reviewid: any): Promise<any> {
    const id = parseInt(reviewid.reviewid);
    const review = await this.reviewRepository.find({
      where: { id },
      relations: ['tags', 'user'],
    });
    if (review.length === 0)
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    const comm = await this.commentRepository.find({
      where: { review: id },
      relations: ['user'],
    });
    //comment가공
    const comment = [];
    for (let i = 0; i < comm.length; i++) {
      comment[i] = {
        ...comm[i],
        user: {
          nickname: comm[i].user.nickname,
          profileImg: comm[i].user.profileImg,
        },
      };
    }
    return { review, comment };
  }

  //태그 삽입
  async createTag(data: any): Promise<Tag[]> {
    const review = new Review();
    review.tags = [];
    const dataarr = data.split(',');
    for (data of dataarr) {
      const exTag = await this.tagRepository.findOne({ where: { tag: data } });
      if (exTag) {
        review.tags.push(exTag);
      } else {
        const tag = new Tag();
        tag.tag = data;
        const newtag = await this.tagRepository.save(tag);
        review.tags.push(newtag);
      }
    }
    return review.tags;
  }

  //리뷰 작성
  async writeReview(
    reviewfile,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const review = new Review();
    review.text = await uploadReviewHtml(reviewfile);
    review.coverImg = createReviewDto.coverImg;
    review.book_info = createReviewDto.bookInfo;
    review.score = parseFloat(createReviewDto.score);
    review.isPublic = Boolean(parseInt(createReviewDto.isPublic));
    review.summary = createReviewDto.summary;
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({
      nickname: createReviewDto.writer,
    });
    return this.reviewRepository.save(review);
  }

  // 좋아요 기능
  async likeReview(reviewid: any): Promise<Like> {
    const like = new Like();
    const r_id = parseInt(reviewid.reviewid);
    const u_id = parseInt(reviewid.userid);
    like.review = await this.reviewRepository.findOne({ where: { id: r_id } });
    like.user = await this.userRepository.findOne({ where: { id: u_id } });
    console.log(like.review);
    console.log(like.user); // 왜 안 되지....
    return this.likeRepository.save(like);
  }
}
