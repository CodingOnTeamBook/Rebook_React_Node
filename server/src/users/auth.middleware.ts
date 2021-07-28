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
        const token = authHeaders.split('=')[1];
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
          res.status(HttpStatus.OK).json({
            success: true,
            isAuth: false,
            type: 1,
          });
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        next();
      }
    } else {
      next();
    }
  }
}
