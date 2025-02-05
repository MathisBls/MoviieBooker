import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return { email, password: hashedPassword };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        if (email !== '' && password !== '') {
            return this.jwtService.sign({ email });
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
