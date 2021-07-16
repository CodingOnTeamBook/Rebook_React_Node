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

  //param과 맞는 장르를 가진 리뷰어를 불러옴
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

    //review는 isPublic===true인것만 카운트함
    reviewer[0].map((value) => {
      const tempArray = value['reviews'].filter(
        (review) => review.isPublic === true
      );
      value['countUserReview'] = tempArray.length;
      value['countFollowers'] = value['followers'].length;
      delete value['reviews'];
      delete value['followers'];
    });

    //팔로우 수 내림차순으로 정렬
    reviewer[0].sort((a, b) => {
      return b['countFollowers'] - a['countFollowers'];
    });

    return reviewer[0];
  }

  //reviewer detail page
  async reviewerDetail(nickname: string): Promise<any> {
    const reviewer = await this.userRepository.findOne({
      where: { nickname },
      select: ['id', 'nickname', 'genres', 'info'],
      relations: ['reviews', 'reviews.tags', 'followers', 'followings'],
    });

    reviewer['reviews'] = reviewer['reviews'].filter(
      (review) => review.isPublic === true
    );

    reviewer['reviews'].map((value, index) => {
      value['book_info'] = JSON.parse(value['book_info']);
      ['createdAt', 'updatedAt', 'view_count', 'isPublic'].forEach(
        (item) => delete value[item]
      );
    });

    reviewer['countUserReviews'] = reviewer['reviews'].length;
    reviewer['countFollowers'] = reviewer['followers'].length;
    reviewer['countFollowings'] = reviewer['followings'].length;
    delete reviewer['followers'];
    delete reviewer['followings'];

    console.log(reviewer);
    return reviewer;
  }
}
