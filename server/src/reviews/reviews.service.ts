import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Review } from 'src/entities/review.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  processingReview,
  processingReviewISBN,
} from './reviews.exportFunction';
import {
  uploadReviewTxt,
  deleteReviewTxt,
  getReviewTxt,
} from './reviews.multerOptions';
import * as fs from 'fs';
import { getSignedUrlofProfileImg } from 'src/users/users.multerOptions';

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

  //책에 대한 리뷰 불러오기: 최신순, 인기순 5개 로드
  async loadReviewbyIsbn(isbn: string, orderby: string) {
    const ISBN = isbn['isbn'];
    const ORDERBY = orderby['orderby'];
    if (ORDERBY === 'created') {
      const review = await this.reviewRepository.findAndCount({
        where: { isbn: ISBN },
        select: ['id', 'summary', 'user', 'createdAt', 'like_count'],
        relations: ['user', 'comments'],
        order: {
          createdAt: 'DESC',
        },
        skip: 0,
        take: 5,
      });
      return await processingReviewISBN(review[0]);
    } else if (ORDERBY === 'popularity') {
      const review = await this.reviewRepository.findAndCount({
        where: { isbn: ISBN },
        select: ['id', 'summary', 'user', 'createdAt', 'like_count'],
        relations: ['user', 'comments'],
        order: {
          like_count: 'DESC',
        },
        skip: 0,
        take: 5,
      });
      return await processingReviewISBN(review[0]);
    }
  }

  //하나의 리뷰 자세히 불러오기
  async detailReview(reviewid: any): Promise<any> {
    const id = parseInt(reviewid.reviewid);
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['tags', 'user'],
    });
    if (!review) throw new HttpException('Not found', HttpStatus.BAD_REQUEST);

    review.text = await getReviewTxt(review.text);
    if (review['user']['profileImg'] !== null)
      review['user']['profileImg'] = getSignedUrlofProfileImg(
        review['user']['profileImg']
      );

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
          profileImg: getSignedUrlofProfileImg(comm[i].user.profileImg),
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
    const isbn = JSON.parse(createReviewDto.bookInfo).isbn;
    const review = new Review();
    review.text = await uploadReviewTxt(reviewfile);
    review.book_info = createReviewDto.bookInfo;
    review.score = parseFloat(createReviewDto.score);
    review.isPublic = Boolean(parseInt(createReviewDto.isPublic));
    review.summary = createReviewDto.summary;
    review.tags = await this.createTag(createReviewDto.tag);
    review.user = await this.userRepository.findOne({
      nickname: createReviewDto.writer,
    });
    review.isbn = isbn;
    return this.reviewRepository.save(review);
  }

  //리뷰 수정
  async updateReview(
    userId: string,
    reviewfile,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: parseInt(updateReviewDto.reviewid) },
      relations: ['tags', 'user'],
    });
    if (review.user.userId !== userId) {
      throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
    }
    await deleteReviewTxt(review.text);
    review.text = await uploadReviewTxt(reviewfile);
    review.summary = updateReviewDto.summary;
    if (updateReviewDto.score) {
      review.score = parseFloat(updateReviewDto.score);
    }
    if (updateReviewDto.isPublic) {
      review.isPublic = Boolean(parseInt(updateReviewDto.isPublic));
    }
    if (updateReviewDto.tag) {
      review.tags = [];
      review.tags = await this.createTag(updateReviewDto.tag);
    }
    return this.reviewRepository.save(review);
  }

  async deleteReview(userId: string, reviewid: string) {
    const id = parseInt(reviewid['reviewid']);
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (review.user.userId !== userId)
      throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
    return this.reviewRepository.delete({ id });
  }
}
