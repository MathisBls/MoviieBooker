import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'testtest' })
  @IsNotEmpty()
  password: string;
}
