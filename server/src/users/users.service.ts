import { Injectable } from '@nestjs/common';
import { Repository, Like as likes } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { deleteProfileImg, uploadProfileImg } from './users.multerOptions';
import { Review } from '../entities/review.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { string0To255 } from 'aws-sdk/clients/customerprofiles';
import { processingReview } from '../reviews/reviews.exportFunction';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //쿼리 날리는 클래스
    private userRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.userId = createUserDto.kakaoId;
    user.nickname = createUserDto.nickName;
    user.gender = createUserDto.gender;
    user.genres = createUserDto.genre;
    user.ageRange = createUserDto.ageRange;
    user.profileImg = createUserDto.profileImg;
    return await this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    return user;
  }

  async findByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { nickname } });
    return user;
  }

  async getAllComment(nickname: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { nickname } });
  }

  async checkNick(nickname: string): Promise<boolean> {
    const exNick = await this.userRepository.findOne({ where: { nickname } });
    if (exNick) return true;
    return false;
  }

  async Login(id: string): Promise<boolean> {
    const CheckUser = await this.userRepository.findOne({
      where: { userId: id },
    });
    if (CheckUser) return true;
    return false;
  }
  async updateImg(userId: number, imgfile): Promise<any> {
    const user = await this.userRepository.findOne({ where: { userId } });
    const oldProfileImg = user.profileImg;
    if (user.profileImg === 'users/defaultProfileImg.png')
      user.profileImg = await uploadProfileImg(imgfile);
    else if (user.profileImg.slice(0, 6) === 'users/') {
      deleteProfileImg(user.profileImg);
      user.profileImg = await uploadProfileImg(imgfile);
    } else {
      user.profileImg = await uploadProfileImg(imgfile);
    }
    await this.userRepository.save(user);
    if (user.profileImg === oldProfileImg) return false;
    else return user.profileImg;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (updateUserDto.info) {
      user.info = updateUserDto.info;
    }
    if (updateUserDto.genre) {
      user.genres = updateUserDto.genre;
    }
    if (updateUserDto.image) {
      user.profileImg = updateUserDto.image;
    }
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user);
  }

  async generateToken(id: string): Promise<string> {
    return this.jwtService.sign({ id });
  }

  // async getMyReviews(id: string): Promise<Review> {
  //   return this.reviewRepository.findAll({ where: { userId: id } });
  // });

  async getMyReviews(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    return this.reviewRepository.find({ where: { user: user } });
  }

  async getMyLikes(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    const likes = await this.likeRepository.find({
      where: { user: user },
      relations: ['review'],
    });
    const likeList = [];
    for (let i = 0; i < likes.length; i++) {
      const review = await this.reviewRepository.findOne({
        where: { id: likes[i].review.id },
        relations: ['user'],
      });
      const bookInfo = JSON.parse(review['book_info']);
      const temp = {
        id: review['id'],
        writer: review['user']['nickname'],
        score: review['score'],
        bookTitle: bookInfo['title'],
        bookCover: bookInfo['cover'],
      };
      likeList.push(temp);
    }
    return likeList;
  }

  //nickname으로 유저 서치
  async getUserByNickname(nickname: string) {
    const exUsers = await this.userRepository.findAndCount({
      where: { nickname: likes(`%${nickname}%`) },
      select: ['id', 'nickname', 'profileImg', 'genres', 'info'],
      relations: ['reviews', 'followers'],
      skip: 0,
      take: 12,
    });
    if (exUsers) {
      const users = [];
      exUsers[0].forEach((user) => {
        if (user['profileImg'].slice(0, 6) === 'users/')
          user['profileImg'] = user['profileImg'];
        user['countFollowers'] = user['followers'].length;
        user['countUserReviews'] = user['reviews'].length;
        delete user['followers'];
        delete user['reviews'];
        users.push(user);
      });
      return users;
    } else {
      return '1';
    }
  }

  //follow기능
  async followUser(currentUserId: string, nickname: string) {
    const I = await this.userRepository.findOne({ userId: currentUserId });

    const opponentUserNickname = nickname['nickname'];

    const opponent = await this.userRepository.findOne({
      nickname: opponentUserNickname,
    });

    if (opponent === undefined) return '1';

    I.followings = [opponent];

    opponent.followers = [I];

    const result1 = await this.userRepository.save(I);
    const result2 = await this.userRepository.save(opponent);

    if (result1 && result2) return true;
    else return false;
  }

  //unfollow기능
  async unfollowUser(currentUserId: string, nickname: string) {
    const I = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId: currentUserId })
      .innerJoinAndSelect('user.followings', 'followings')
      .getOne();

    const opponentUserNickname = nickname['nickname'];

    const opponent = await this.userRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: opponentUserNickname })
      .innerJoinAndSelect('user.followers', 'followers')
      .getOne();

    if (opponent === undefined) return '1';

    I.followings = I.followings.filter((following) => {
      following.id !== opponent.id;
    });

    opponent.followers = opponent.followers.filter((follower) => {
      follower.id !== I.id;
    });

    const result1 = await this.userRepository.save(I);
    const result2 = await this.userRepository.save(opponent);

    if (result1 && result2) return true;
    else return false;
  }

  //마이페이지 내 댓글 찾기
  async findAllMyComment(nickname: string) {
    const comment = await this.userRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname })
      .innerJoinAndSelect('user.comments', 'comments')
      .getMany();
    return comment;
  }

  async getMyPublicReviews(userid: number, p: any) {
    const page = parseInt(p.page);
    const skip = page === 1 ? 0 : (page - 1) * 4;
    const user = await this.userRepository.findOne({
      where: { userId: userid },
    });
    const publicReview = await this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: { user: user, isPublic: 1 },
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
      skip: skip,
      take: 4,
    });
    return await processingReview(publicReview[0], false);
  }

  async getMyPrivateReviews(userid: number, p: any) {
    const page = parseInt(p.page);
    const skip = page === 1 ? 0 : (page - 1) * 4;
    const user = await this.userRepository.findOne({
      where: { userId: userid },
    });
    const privateReview = await this.reviewRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: { user: user, isPublic: 0 },
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
      skip: skip,
      take: 4,
    });
    return await processingReview(privateReview[0], false);
  }
}
