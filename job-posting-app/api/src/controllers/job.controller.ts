import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { JobEntity } from '../entities/job.entity';
import { JobService } from '../services/job.service';

import { JobCreateDto } from './dto/job-create.dto';
import { JobGetManyDto } from './dto/job-getMany.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { JobDto } from './dto/job.dto';

@Crud({
  model: {
    type: JobEntity,
  },
  dto: {
    create: JobCreateDto,
    update: JobUpdateDto,
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
})
@Controller('jobs')
export class JobController implements CrudController<JobEntity> {
  constructor(public service: JobService) {}
}
