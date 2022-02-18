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

import { CompanyEntity } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyGetManyDto } from './dto/company-getMany.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { CompanyDto } from './dto/company.dto';

@ApiTags('companies')
@ApiBearerAuth()
@Crud({
  dto: {
    create: CompanyCreateDto,
    update: CompanyUpdateDto,
  },
  model: {
    type: CompanyEntity,
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
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@UseGuards(JwtAuthGuard, ACGuard)
@Controller('companies')
export class CompanyController implements CrudController<CompanyEntity> {
  constructor(public service: CompanyService) {}

  get base(): CrudController<CompanyEntity> {
    return this;
  }

  @Override()
  @UseRoles({
    resource: 'companies',
    action: 'create',
  })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CompanyCreateDto,
  ) {
    console.log('create-dto', dto);
    return this.base.createOneBase(req, <CompanyEntity>dto);
  }

  @Override()
  @UseRoles({
    resource: 'companies',
    action: 'update',
  })
  updateOne(req: CrudRequest, dto: CompanyUpdateDto) {
    return this.base.updateOneBase(req, <CompanyEntity>dto);
  }

  @Override()
  @UseRoles({
    resource: 'companies',
    action: 'delete',
  })
  deleteOne(req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}
