import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret',
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
