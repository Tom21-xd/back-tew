import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { authService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
