import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private jwtService: JwtService) { }
  signInLocal() {
    const token = this.jwtService.sign({});

    return {
      status: 200,
      message: 'access_token generated!',
      access_token: token,
    };
  }
}
