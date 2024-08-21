import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { UserModule } from '../user/user.module';
import { JwtAuthModule } from '../jwt/jwt.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => JwtAuthModule),

    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [AuthService],
})
export class AuthModule { }
