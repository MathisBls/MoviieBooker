import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const existingUser = await this.dataSource.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      throw new BadRequestException('Email déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.dataSource.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    return { message: 'Utilisateur inscrit avec succès' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.dataSource.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const token = this.jwtService.sign({ id: user[0].id, email: user[0].email });

    return { access_token: token };
  }
}
