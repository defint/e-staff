import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async getOne(id: number): Promise<Office> {
    const office = await this.officeRepository.findOne(id);

    if (!office) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Office does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return office;
  }
}
