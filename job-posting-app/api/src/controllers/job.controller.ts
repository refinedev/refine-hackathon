import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { JobEntity } from '../entities/job.entity';
import { JobService } from '../services/job.service';

import { JobCreateDto } from './dto/job-create.dto';
import { JobGetManyDto } from './dto/job-getMany.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { JobDto } from './dto/job.dto';

@ApiTags('jobs')
@ApiBearerAuth()
@Crud({
  model: {
    type: JobEntity,
  },
  dto: {
    create: JobCreateDto,
    update: JobUpdateDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      company: {
        eager: true,
      },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: JobGetManyDto,
    create: JobDto,
    update: JobDto,
    get: JobDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@UseGuards(JwtAuthGuard, ACGuard)
@Controller('jobs')
export class JobController implements CrudController<JobEntity> {
  constructor(public service: JobService) {}

  get base(): CrudController<JobEntity> {
    return this;
  }

  @Override()
  @UseRoles({
    resource: 'jobs',
    action: 'create',
  })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: JobCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <JobEntity>dto);
  }

  @Override()
  @UseRoles({
    resource: 'jobs',
    action: 'update',
  })
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: JobUpdateDto,
  ) {
    return this.base.updateOneBase(req, <JobEntity>dto);
  }

  @Override()
  @UseRoles({
    resource: 'jobs',
    action: 'delete',
  })
  deleteOne(req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}
