import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OFFICE_REPOSITORY } from 'src/constants';
import { Office } from '../entities/office.entity';

@Injectable()
export class OfficeService {
  constructor(
    @Inject(OFFICE_REPOSITORY)
    private readonly officeRepository: Repository<Office>,
  ) {}

  async getList(): Promise<Array<Office>> {
    return this.officeRepository.find();
  }
}
