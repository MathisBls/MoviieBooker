import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Inscription d’un utilisateur' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @ApiOperation({ summary: 'Connexion d’un utilisateur' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtenir le profil de l’utilisateur' })
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
