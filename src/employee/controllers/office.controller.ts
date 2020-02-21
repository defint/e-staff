import { Controller, Get } from '@nestjs/common';
import { OfficeService } from '../services/office.service';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  async getList() {
    return this.officeService.getList();
  }
}
