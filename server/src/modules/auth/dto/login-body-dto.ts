import { ApiProperty } from "@nestjs/swagger";

export class LoginBodyDto {
  @ApiProperty({
    description: '账号为数字字母组成',
    type: () => String,
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: '密码为数字大小写字母组成',
    type: () => String,
    example: 'ADJSAsakhdk67251',
  })
  password: string;
}