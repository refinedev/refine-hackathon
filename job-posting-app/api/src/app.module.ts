import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CompanyRepository } from './repositories/company.repository';
import { JobRepository } from './repositories/job.repository';
import { CompanyController } from './controllers/company.controller';
import { JobController } from './controllers/job.controller';
import { CompanyService } from './services/company.service';
import { JobService } from './services/job.service';

import { roles } from './app.roles';
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
    TypeOrmModule.forFeature([CompanyRepository, JobRepository]),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController, CompanyController, JobController],
  providers: [AppService, CompanyService, JobService],
  exports: [AppService, CompanyService, JobService],
})
export class AppModule {}
