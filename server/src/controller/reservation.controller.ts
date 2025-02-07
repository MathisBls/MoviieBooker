import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: 'Créer une réservation' })
  @Post()
  async createReservation(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.createReservation(
      req.user.id,
      createReservationDto,
    );
  }

  @ApiOperation({ summary: 'Récupérer les réservations de l’utilisateur' })
  @Get()
  async getUserReservations(@Request() req) {
    return this.reservationService.getUserReservations(req.user.id);
  }

  @ApiOperation({ summary: 'Annuler une réservation' })
  @Delete(':id')
  async cancelReservation(@Param('id') id: number, @Request() req) {
    return this.reservationService.cancelReservation(id, req.user.id);
  }
}
