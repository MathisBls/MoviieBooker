import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth-service.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.authService.getUsers();
  }
}
