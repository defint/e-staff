import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getList() {
    return this.employeeService.getList();
  }

  @Post()
  create(@Body() item: Employee) {
    return this.employeeService.createEmployee(item);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: Employee) {
    return this.employeeService.editEmployee(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
