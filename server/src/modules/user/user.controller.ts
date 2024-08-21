import { Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(
    private readonly _userSer: UserService
  ) { }

  @ApiOperation({ summary: '获取所有用户' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this._userSer.findAll()
  }

  @ApiOperation({ summary: '获取某一用户' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this._userSer.findOne(id)
  }
}
