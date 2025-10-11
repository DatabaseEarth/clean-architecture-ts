import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ITokenService } from '@/application/ports/security';
import { IS_PUBLIC_KEY } from '../../../common/decorators';
import {
  UnauthorizedException,
  TokenExpiredException,
  InvalidTokenException,
  AccessTokenRequiredException,
} from '@/shared-kernel/exceptions';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new AccessTokenRequiredException();

    try {
      const payload = await this.tokenService.verify(token);

      if (!payload) throw new InvalidTokenException();

      // Kiểm tra token có expired không
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime)
        throw new TokenExpiredException();

      request.user = payload;

      return true;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof TokenExpiredException ||
        error instanceof InvalidTokenException ||
        error instanceof AccessTokenRequiredException
      ) {
        throw error;
      }
      throw new InvalidTokenException();
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
