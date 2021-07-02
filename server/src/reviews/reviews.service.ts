import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  async loadReviews(skipnum: string): Promise<[Review[], number]> {
    //console.log(skipnum); { 'skipnum': '0'} 이딴식으로나옴
    //console.log(parseInt(skipnum), ' ', typeof parseInt(skipnum));
    const reviews = await this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: 6,
      take: 3,
    });
    return reviews;
  }

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

  async writeReview(
    userId: string,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    //console.log(typeof createReviewDto.score);
    //console.log(typeof createReviewDto.public);
    const review = new Review();
    review.text = createReviewDto.text;
    review.book_id = createReviewDto.bookId;
    review.score = parseFloat(createReviewDto.score);
    review.public = createReviewDto.public;
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({ where: { userId } });
    console.log(review);
    return this.reviewRepository.save(review);
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { reviewId: id },
    });
    if (updateReviewDto.text) {
      review.text = updateReviewDto.text;
    }

    if (updateReviewDto.score) {
      review.score = parseFloat(updateReviewDto.score);
    }

    if (updateReviewDto.public) {
      review.public = updateReviewDto.public;
    }

    return this.reviewRepository.save(review);
  }

  async removeReview(id: string): Promise<void> {
    const review = await this.reviewRepository.findOne(id);
    await this.reviewRepository.delete(review);
  }
}
