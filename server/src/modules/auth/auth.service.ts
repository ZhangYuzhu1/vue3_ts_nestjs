import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as md5 from 'md5'

import { ErrorCode } from 'src/types/enum/error-code.enum';
import { User } from 'src/entities/user';
import { responseError } from 'src/utils/response';
import { LoginBodyDto } from './dto/login-body-dto';
import { UserService } from '../user/user.service';
import { JwtAuthService } from '../jwt/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRep: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private readonly _userSer: UserService,
    @Inject(forwardRef(() => JwtAuthService))
    private readonly _jwtAuthSrv: JwtAuthService
  ) { }

  /**
   * 登录
   * @param body 
   * @returns 
   */
  public async login(body: LoginBodyDto) {
    const { username, password } = body

    const qb = await this._userSer.qb().addSelect('u.password')
    await qb.where('username=:username', { username })
    const user = await qb.getOne()
    console.log(user);

    if (!user)
      responseError(ErrorCode.USER_NOT_FOUND)

    const md5Password = md5(password).toUpperCase()
    if (user.password !== md5Password)
      responseError(ErrorCode.AUTH_PASSWORD_NOT_MATCHED)

    return await this.signLoginTicket(user)
  }

  /**
* 签发登录凭证
* @param user
* @returns
*/
  public async signLoginTicket(user: Partial<User>) {
    const sign = await this._jwtAuthSrv.signLoginAuthToken(user)
    return {
      sign,
      user: {
        ...user,
        password: !!user.password,
      },
    }
  }
}
