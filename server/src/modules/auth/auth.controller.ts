import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/login-body-dto';

@Controller('auth')
@ApiTags('鉴权')
export class AuthController {
  constructor(private readonly _authSer: AuthService) { }

  @ApiOperation({ summary: '登录' })
  @Public()
  @Post()
  public async login(@Body() body: LoginBodyDto) {
    return this._authSer.login(body)
  }
}
