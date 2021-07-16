import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class ReviewerService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) {}

  //reviewer page
  async getReviewer(genre: string): Promise<any> {
    // , = %2C 공백은 +
    const reviewer = await this.userRepository.findAndCount({
      where: { genres: genre },
      select: ['id', 'nickname', 'genres', 'info', 'profileImg', 'createdAt'],
      relations: ['reviews', 'followers'],
      order: {
        createdAt: 'DESC',
      },
      take: 9,
    });

    reviewer[0].map((value) => {
      value['countUserReviews'] = value['reviews'].length;
      value['countFollowers'] = value['followers'].length;
      delete value['reviews'];
      delete value['followers'];
    });

    reviewer[0].sort((a, b) => {
      return b['countFollowers'] - a['countFollowers'];
    });

    return reviewer[0];
  }
}
