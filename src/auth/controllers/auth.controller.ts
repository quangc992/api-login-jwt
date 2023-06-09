import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../service/auth.service';
import { CreateAccountDto, LoginAccountDto, refreshTokenDto } from '../dto/index.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body() createAccount: CreateAccountDto,
  ) {
    return await this.authService.register(createAccount);
  }

  @Post('login')
  async login(@Body() loginAccountDto: LoginAccountDto) {
    return await this.authService.login(loginAccountDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: any) {
    return await this.authService.logout(req.ClientLogin);
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: refreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
