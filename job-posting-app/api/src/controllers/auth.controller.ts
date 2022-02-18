import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard } from 'nest-access-control';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto);
  }

  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ACGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
