import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/jwt/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data){
    const user= await this.authService.validateUser(data.username,data.password)
    if(!user){
      throw new UnauthorizedException();
    }
    return this.authService.login(user)
  }


}
