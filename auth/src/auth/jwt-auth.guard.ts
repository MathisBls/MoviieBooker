import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Authorization header:', request.headers.authorization); // ✅ Vérifie l'en-tête
    return super.canActivate(context);
  }
}
