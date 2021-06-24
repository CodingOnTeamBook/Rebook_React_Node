import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtKEY } from '../config/jwt.config';
import { UsersService } from './users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const authHeaders = req.headers.cookie;
    if (authHeaders && (authHeaders as string).split('=')[1]) {
      const token = authHeaders.split('=')[1];
      const decoded: any = jwt.verify(token, jwtKEY.secreteKey);
      const user = await this.userService.findOne(decoded.id);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      next();
    }
  }
}
