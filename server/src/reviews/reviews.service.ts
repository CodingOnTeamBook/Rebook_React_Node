import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { processingReview } from './reviews.exportFunction';
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
    private commentRepository: Repository<Comment>
  ) {}
  //인기리뷰 6개 불러오기
  async orderbyLike(): Promise<any> {
    const temp = await this.reviewRepository.findAndCount({
      order: {
        like_count: 'DESC',
        createdAt: 'DESC',
      },
      where: { isPublic: 1 },
      relations: ['user'],
      select: [
        'id',
        'book_info',
        'score',
        'isPublic',
        'summary',
        'user',
        'like_count',
        'createdAt',
      ],
      skip: 0,
      take: 6,
    });

    return await processingReview(temp[0], false);
  }

  //최신순or인기순으로 리뷰 12개 불러오기
  async loadReviews(orderby: string): Promise<any> {
    //const page = parseInt(p.p);
    if (orderby === 'popularity') {
      const temp = await this.reviewRepository.findAndCount({
        order: {
          like_count: 'DESC',
          createdAt: 'DESC',
        },
        select: [
          'id',
          'book_info',
          'score',
          'summary',
          'isPublic',
          'like_count',
          'createdAt',
          'user',
        ],
        where: { isPublic: 1 },
        relations: ['tags', 'user'],
        //skip: page === 1 ? 0 : page - 1,
        skip: 0,
        take: 12,
      });
      return await processingReview(temp[0], true);
    } else if (orderby === 'created') {
      const temp = await this.reviewRepository.findAndCount({
        order: {
          createdAt: 'DESC',
        },
        select: [
          'id',
          'book_info',
          'score',
          'summary',
          'isPublic',
          'createdAt',
          'user',
        ],
        where: { isPublic: 1 },
        relations: ['tags', 'user'],
        //skip: page === 1 ? 0 : page - 1,
        skip: 0,
        take: 12,
      });
      return await processingReview(temp[0], true);
    }
  }

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
}
