import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    public readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async login(payload: { username: string; password: string }) {
    const { username, password } = payload;

    // find user
    const user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new NotAcceptableException('User not found');
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new NotAcceptableException('User not found');
    }

    return await this.authService.login(user);
  }

  async register(payload: {
    username: string;
    password: string;
    roles: string[];
  }) {
    const { username, password, roles } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.roles = roles;
    user.password = hashPassword;

    return await user.save();
  }
}
