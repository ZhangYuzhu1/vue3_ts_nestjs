import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { JwtAuthService } from './jwt.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (_: ConfigService) => {
        return {}
      },
    })
  ],
  providers: [JwtAuthService, JwtService],
  exports: [JwtService, JwtAuthService],
})
export class JwtAuthModule { }
