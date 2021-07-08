import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { uploadBookCover, uploadReviewHtml } from './reviews.multerOptions';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private userRepository: Repository<User>
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
    reviewfiles,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const review = new Review();
    review.text = await uploadReviewHtml(reviewfiles['reviewHtml']);
    review.coverImg = await uploadBookCover(reviewfiles['coverImg']);
    review.book_info = createReviewDto.bookInfo;
    review.score = parseFloat(createReviewDto.score);
    review.isPublic = Boolean(parseInt(createReviewDto.isPublic));
    review.summary = createReviewDto.summary;
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({
      nickname: createReviewDto.writer,
    });
    console.log(review);
    return this.reviewRepository.save(review);
  }
}
