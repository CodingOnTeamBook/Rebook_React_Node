import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtKEY } from '../config/jwt.config';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const authHeaders = req.headers.cookie;
    if (authHeaders && (authHeaders as string).split('=')[1]) {
      try {
        const arr = authHeaders.split(';');
        const temp = arr.map((item) => item.split('='));
        const token = temp.filter((item) => item[0] == 'user_Access')[0][1];
        const decoded: any = jwt.verify(token, jwtKEY.secretKey);
        const user = await this.usersRepository.findOne({
          where: { userId: decoded.id },
        });
        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }
        req.user = user;
        next();
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          throw new HttpException(
            'Sorry, your token expired',
            HttpStatus.UNAUTHORIZED
          );
        }
        next();
      }
    } else {
      next();
    }
  }
}
