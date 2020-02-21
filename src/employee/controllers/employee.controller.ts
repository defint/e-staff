import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getList() {
    return this.employeeService.getList();
  }

  @Post()
  create(@Body() item: EmployeeDto) {
    return this.employeeService.createEmployee(item);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() item: EmployeeDto,
  ) {
    return this.employeeService.editEmployee(id, item);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
