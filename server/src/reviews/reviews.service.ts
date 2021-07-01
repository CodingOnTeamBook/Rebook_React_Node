import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

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

  //리뷰 불러오기
  async loadReviews(page: number): Promise<[Review[], number]> {
    const reviews = await this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: page,
      take: 12,
    });
    return reviews;
  }

  //태그 삽입
  async createTag(data: any): Promise<Tag[]> {
    const review = new Review();
    review.tags = [];
    const dataarr = data.split(' ');
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

  /* 수정필요~~~
  async writeReview(
    userId: string,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const review = new Review();
    review.text = createReviewDto.text;
    review.book_id = createReviewDto.bookId;
    review.score = parseFloat(createReviewDto.score);
    review.public = createReviewDto.public;
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({ where: { userId } });
    console.log(review);
    return this.reviewRepository.save(review);
  } */
}
