import {
    Injectable,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';

@Injectable()
export class ReservationService {
    constructor(private readonly dataSource: DataSource) {}

    async createReservation(
        userId: number,
        createReservationDto: CreateReservationDto,
    ) {
        const { movieId, movieTitle, startTime } = createReservationDto;

        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(startTimeDate.getTime() + 2 * 60 * 60 * 1000);

        const conflictingReservations = await this.dataSource.query(
            'SELECT * FROM reservations WHERE user_id = ? AND ((start_time BETWEEN ? AND ?) OR (end_time BETWEEN ? AND ?))',
            [userId, startTimeDate, endTimeDate, startTimeDate, endTimeDate],
        );

        if (conflictingReservations.length > 0) {
            throw new BadRequestException(
                'Conflit de réservation : Vous avez déjà un film réservé à cette heure.',
            );
        }

        await this.dataSource.query(
            'INSERT INTO reservations (user_id, movie_id, movie_title, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
            [userId, movieId, movieTitle, startTimeDate, endTimeDate],
        );

        return { message: 'Réservation créée avec succès' };
    }

    async getUserReservations(userId: number) {
        const reservations = await this.dataSource.query(
            'SELECT * FROM reservations WHERE user_id = ?',
            [userId],
        );

        return reservations;
    }

    async cancelReservation(reservationId: number, userId: number) {
        const reservation = await this.dataSource.query(
            'SELECT * FROM reservations WHERE id = ? AND user_id = ?',
            [reservationId, userId],
        );

        if (reservation.length === 0) {
            throw new NotFoundException(
                'Réservation introuvable ou ne vous appartient pas.',
            );
        }

        await this.dataSource.query('DELETE FROM reservations WHERE id = ?', [
            reservationId,
        ]);

        return { message: 'Réservation annulée avec succès' };
    }
}
