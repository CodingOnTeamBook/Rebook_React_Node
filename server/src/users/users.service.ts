import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //쿼리 날리는 클래스
    private userRepository: Repository<User>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    private readonly jwtService: JwtService
  ) {}

  async usergenre(data: any): Promise<Genre[]> {
    const user = new User();
    user.genres = [];
    const dataarr = data.split(' ');
    for (data of dataarr) {
      const usergenre = await this.genreRepository.findOne({
        where: { id: data }, //id를 넘겨주냐, title을 넘겨주냐에따라 바뀐당
      });
      user.genres.push(usergenre);
    }
    return user.genres;
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    //const genres = this.usergenre(createUserDto.genre);
    const user = new User();
    user.userId = createUserDto.kakaoId;
    user.nickname = createUserDto.nickname;
    user.gender = createUserDto.gender;
    user.profileImg = createUserDto.profileImg;
    user.genres = await this.usergenre(createUserDto.genre);
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

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (updateUserDto.info) {
      user.info = updateUserDto.info;
    }
    if (updateUserDto.nickname) {
      user.nickname = updateUserDto.nickname;
    }
    if (updateUserDto.profileImg) {
      user.profileImg = updateUserDto.profileImg;
    }
    // if (updateUserDto.genre) {
    //   user.genre = updateUserDto.genre;
    // }
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
