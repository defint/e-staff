import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeProviders } from './providers/employee.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [...employeeProviders, EmployeeService],
})
export class EmployeeModule {}
