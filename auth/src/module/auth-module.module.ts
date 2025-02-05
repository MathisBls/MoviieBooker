import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth-controller/auth-controller.controller';
import { AuthService } from '../service/auth-service.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ouioui',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
