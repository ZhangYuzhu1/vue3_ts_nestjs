import { Body, Controller, Get, Inject, Post, Req, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/login-body-dto';
import { UserService } from '../user/user.service';
import { responseSuccess } from 'src/utils/response';

@Controller('auth')
@ApiTags('鉴权')
export class AuthController {
  constructor(
    private readonly _authSer: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly _userSer: UserService
  ) { }

  @ApiOperation({ summary: '登录' })
  @Public()
  @Post()
  public async login(@Body() body: LoginBodyDto) {
    return this._authSer.login(body)
  }

  @ApiOperation({ summary: '根据token获取用户信息' })
  @ApiBearerAuth()
  @Get('info')
  async getUserByToken(@Req() req) {
    const res = await this._userSer.repo().findOne({ where: { id: req.user.id } })
    return responseSuccess(res)
  }
}
