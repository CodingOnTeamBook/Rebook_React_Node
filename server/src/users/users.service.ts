import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.userId = createUserDto.kakaoId;
    user.nickname = createUserDto.nickName;
    user.gender = createUserDto.gender;
    user.genres = createUserDto.genre;
    user.ageRange = createUserDto.ageRange;
    return user.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { userId: id } });
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userModel.findOne({ where: { nickname } });
  }

  async checkNick(nickname: string): Promise<boolean> {
    const exNick = await this.userModel.findOne({ where: { nickname } });
    if (exNick) return true;
    return false;
  }

  async Login(id: string): Promise<boolean> {
    const CheckUser = await this.userModel.findOne({ where: { userId: id } });
    if (CheckUser) return true;
    return false;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ where: { userId: id } });
    if (updateUserDto.info) {
      user.info = updateUserDto.info;
    }
    if (updateUserDto.genre) {
      user.genres = updateUserDto.genre;
    }
    if (updateUserDto.imgUrl) {
      user.profileImg = updateUserDto.imgUrl;
    }
    return user.save();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async generateToken(id: string): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
