import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'test',
    description: 'Nom d’utilisateur unique',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'Adresse e-mail unique',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'testtest',
    description: 'Mot de passe sécurisé (minimum 6 caractères)',
  })
  @MinLength(6)
  password: string;
}
