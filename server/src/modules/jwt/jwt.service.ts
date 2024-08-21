import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _jwtSev: JwtService,
    private readonly _cfgSrv: ConfigService,

    @Inject(forwardRef(() => AuthService))
    private readonly _authSrv: AuthService,
  ) { }

  /**根据用户登录成功签发token */
  public async signLoginAuthToken(user: Partial<User>) {
    const expiresIn = this._cfgSrv.get<number>('jwt.loginAuthExpireInSeconds')
    const secret = this._cfgSrv.get<string>('jwt.loginAuthSecret')
    const signObj = {
      id: user.id,
      username: user.username,
      timestamp: Date.now()
    }

    const access_token = this._jwtSev.sign(signObj, { secret, expiresIn })

    return { access_token, expireAt: Date.now() + expiresIn }
  }

  /**检查token是否有效 */
  public async validateLoginAuthToken(token: string) {
    return this._jwtSev.verifyAsync(token,
      { secret: this._cfgSrv.get('jwt.loginAuthSecret') }
    )
  }
}