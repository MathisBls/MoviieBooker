import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Reservation } from '../entity/reservation.entity';
  import { CreateReservationDto } from 'src/dto/create-reservation.dto';
  
  @Injectable()
  export class ReservationService {
    constructor(
      @InjectRepository(Reservation)
      private readonly reservationRepository: Repository<Reservation>
    ) {}
  
    async createReservation(
      userId: number,
      createReservationDto: CreateReservationDto
    ) {
      const { movieId, movieTitle, startTime } = createReservationDto;
  
      const startTimeDate = new Date(startTime);
      const endTimeDate = new Date(startTimeDate.getTime() + 2 * 60 * 60 * 1000);
  
      const conflictingReservations = await this.reservationRepository.find({
        where: [
          { userId, startTime: startTimeDate },
          { userId, endTime: endTimeDate },
        ],
      });
  
      if (conflictingReservations.length > 0) {
        throw new BadRequestException(
          'Conflit de réservation : Vous avez déjà un film réservé à cette heure.'
        );
      }
  
      const reservation = this.reservationRepository.create({
        userId,
        movieId,
        movieTitle,
        startTime: startTimeDate,
        endTime: endTimeDate,
      });
  
      await this.reservationRepository.save(reservation);
  
      return { message: 'Réservation créée avec succès' };
    }
  
    async getUserReservations(userId: number) {
      const reservations = await this.reservationRepository.find({
        where: { userId },
      });
  
      return reservations;
    }
  
    async cancelReservation(reservationId: number, userId: number) {
      const reservation = await this.reservationRepository.findOne({
        where: { id: reservationId, userId },
      });
  
      if (!reservation) {
        throw new NotFoundException(
          'Réservation introuvable ou ne vous appartient pas.'
        );
      }
  
      await this.reservationRepository.remove(reservation);
  
      return { message: 'Réservation annulée avec succès' };
    }
  }
