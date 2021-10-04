import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { CompanyEntity } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyGetManyDto } from './dto/company-getMany.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { CompanyDto } from './dto/company.dto';

@Crud({
  dto: {
    create: CompanyCreateDto,
    update: CompanyUpdateDto,
  },
  model: {
    type: CompanyEntity,
  },
  query: {
    alwaysPaginate: true,
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  serialize: {
    getMany: CompanyGetManyDto,
    create: CompanyDto,
    update: CompanyDto,
    get: CompanyDto,
  },
})
@Controller('companies')
export class CompanyController implements CrudController<CompanyEntity> {
  constructor(public service: CompanyService) {}
}
