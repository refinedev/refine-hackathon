import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { AppService } from './services/app.service';
import { CompanyRepository } from './repositories/company.repository';
import { UserRepository } from './repositories/user.repository';
import { JobRepository } from './repositories/job.repository';
import { CompanyController } from './controllers/company.controller';
import { JobController } from './controllers/job.controller';
import { CompanyService } from './services/company.service';
import { JobService } from './services/job.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

import { roles } from './app.roles';
import { jwtConstants } from './constants/jwt';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('TYPEORM_CONNECTION') as any,
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        entities: [configService.get<string>('TYPEORM_ENTITIES')],
        synchronize: false,
        dropSchema: false,
        migrations: [configService.get<string>('TYPEORM_MIGRATIONS')],
        cli: {
          migrationsDir: configService.get<string>('TYPEORM_MIGRATIONS_DIR'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      CompanyRepository,
      JobRepository,
      UserRepository,
    ]),
    AccessControlModule.forRoles(roles),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AppController,
    CompanyController,
    JobController,
    AuthController,
  ],
  providers: [
    AppService,
    CompanyService,
    JobService,
    UserService,
    AuthService,
    JwtAuthStrategy,
  ],
  exports: [],
})
export class AppModule {}
