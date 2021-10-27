import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private jwtService: JwtService) { }
  signInLocal() {
    return this.jwtService.sign({});
  }
}
