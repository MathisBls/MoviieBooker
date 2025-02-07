import { Module } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { ReservationController } from 'src/controller/reservation.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
