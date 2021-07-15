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
    const decodedgenre = decodeURIComponent(genre);
    const r = await this.userRepository.findOne({
      select: ['id', 'nickname'],
      where: { genres: decodedgenre },
      relations: ['followers'],
    });
    console.log(r, ' ', r['followers'].length);
    const qb = await getRepository(User).createQueryBuilder('user');
    const reviewer = await qb
      .where('user.genres = :genres', { genres: genre })
      .select('user.nickname')
      .innerJoinAndSelect('user.followers', 'user_following_user')
      .andWhere(
        'user.id' + qb.subQuery().addSelect('COUNT(user.followers)', 'count')
      )
      //.addSelect('COUNT(user.followers)')
      .getMany();
    /*const reviewer = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.genres = :genres', { genres: genre })
      .select('user.nickname')
      .getMany();*/
    /*({
      order: {
        subQuery.followers: 'DESC',
        createdAt: 'DESC',
      },
      select: ['genres', 'id', 'nickname', 'info'],
      where: { genres: genre },
      skip: 0,
      take: 2,
    });*/
    console.log(reviewer);
    //return reviewer;
  }
}
