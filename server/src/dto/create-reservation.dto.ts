import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: 550, description: 'ID du film à réserver' })
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @ApiProperty({ example: 'Inception', description: 'Titre du film' })
  @IsString()
  @IsNotEmpty()
  movieTitle: string;

  @ApiProperty({
    example: '2025-02-07T14:00:00Z',
    description: 'Heure de début de la réservation (format ISO)',
  })
  @IsNotEmpty()
  startTime: Date;
}
