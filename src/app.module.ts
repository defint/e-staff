import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, EmployeeModule],
})
export class AppModule {}
