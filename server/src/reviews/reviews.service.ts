import { Injectable } from '@nestjs/common';
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

  /*
  async loadReviews(): Promise<[Review[], number]> {
    const [list, count] = this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: 
    })
  }
  */
  async createTag(data: any): Promise<Tag[]> {
    const tag = new Tag();
    const review = new Review();
    review.tags = [];
    const dataarr = data.trim().split(' ');
    console.log(dataarr);
    for (data of dataarr) {
      const exTag = await this.tagRepository.findOne({ where: { tag: data } });
      console.log(exTag);
      if (exTag) {
        review.tags.push(exTag);
      } else {
        tag.tag = data;
        const newtag = await this.tagRepository.save(tag);
        review.tags.push(newtag);
      }
    }
    return review.tags;
  }

  async writeReview(
    userId: string,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    //console.log(typeof createReviewDto.score);
    //console.log(typeof createReviewDto.public);
    const review = new Review();
    review.text = createReviewDto.text;
    review.book_id = createReviewDto.bookId;
    review.score = Number(createReviewDto.score);
    review.public = Boolean(createReviewDto.public);
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({ where: { userId } });
    console.log(review, 1123);
    return this.reviewRepository.save(review);
  }
}
