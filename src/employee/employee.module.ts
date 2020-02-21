import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { employeeProviders } from './employee.provider';
import { DatabaseModule } from '../database/database.module';
import { OfficeController } from './controllers/office.controller';
import { OfficeService } from './services/office.service';
import { TagService } from './services/tag.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController, OfficeController],
  providers: [...employeeProviders, EmployeeService, OfficeService, TagService],
})
export class EmployeeModule {}
