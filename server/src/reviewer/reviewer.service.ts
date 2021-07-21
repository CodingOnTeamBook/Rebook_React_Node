import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { getSignedUrlofProfileImg } from 'src/users/users.multerOptions';
import { Repository } from 'typeorm';

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
      if (value['profileImg'] !== null)
        value['profileImg'] = getSignedUrlofProfileImg(value['profileImg']);
      //리뷰수, 팔로우 수 카운트 후 본래 배열 제거
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
      select: ['id', 'nickname', 'genres', 'info', 'profileImg'],
      relations: ['reviews', 'reviews.tags', 'followers', 'followings'],
    });

    if (reviewer === undefined) return '1';

    reviewer['reviews'] = reviewer['reviews'].filter(
      (review) => review.isPublic === true
    );
    if (reviewer['profileImg'] !== null)
      reviewer['profileImg'] = getSignedUrlofProfileImg(reviewer['profileImg']);
    //리뷰수, 팔로, 팔로잉수 카운트 후 followers, followings 제거
    reviewer['countUserReviews'] = reviewer['reviews'].length;
    reviewer['countFollowers'] = reviewer['followers'].length;
    reviewer['countFollowings'] = reviewer['followings'].length;
    delete reviewer['followers'];
    delete reviewer['followings'];

    reviewer['reviews'].map((value) => {
      const bookInfo = JSON.parse(value['book_info']);
      value['bookTitle'] = bookInfo['title'];
      value['bookCover'] = bookInfo['cover'];
      [
        'createdAt',
        'updatedAt',
        'view_count',
        'isPublic',
        'book_info',
        'text',
      ].forEach((item) => delete value[item]);
    });

    return reviewer;
  }
}
