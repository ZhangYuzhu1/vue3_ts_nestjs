import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from 'src/modules/auth/public.decorator';
import { JwtAuthService } from 'src/modules/jwt/jwt.service';
import { ErrorCode } from 'src/types/enum/error-code.enum';
import { responseError } from 'src/utils/response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => JwtAuthService))
    private readonly _jwtAuthSer: JwtAuthService
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      responseError(ErrorCode.AUTH_LOGIN_EXPIRED)

    //校验token
    const payload = await this._jwtAuthSer.validateLoginAuthToken(token)
    if (payload) {
      request['user'] = payload
      return true
    }

    return undefined;
  }

  public extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}