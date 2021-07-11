import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { uploadProfileImg } from './users.multerOptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //쿼리 날리는 클래스
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  //회원가입
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.userId = createUserDto.kakaoId;
    user.nickname = createUserDto.nickName;
    user.gender = createUserDto.gender;
    user.genres = createUserDto.genre;
    user.ageRange = createUserDto.ageRange;
    return await this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { userId: id } });
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userRepository.findOne({ where: { nickname } });
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

  async update(
    id: string,
    imgfile,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (updateUserDto.info) {
      user.info = updateUserDto.info;
    }
    if (updateUserDto.genre) {
      user.genres = updateUserDto.genre;
    }
    if (imgfile) {
      user.profileImg = await uploadProfileImg(imgfile);
    } else {
      user.profileImg = updateUserDto.imgUrl;
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
}
