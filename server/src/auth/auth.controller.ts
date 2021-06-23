import { Body, Controller, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  auth(@Body() user, @Request() req) {
    return this.authService.isAuth(user, req.headers.authorization);
  }
}
