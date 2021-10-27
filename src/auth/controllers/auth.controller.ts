import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) { }

  @Post()
  signInLocal() {
    const token = this.authService.signInLocal();
    return {
      access_token: token,
    };
  }
}
