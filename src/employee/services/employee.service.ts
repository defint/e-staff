import { Inject, Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';
import { EMPLOYEE_REPOSITORY } from 'src/constants';
import { EmployeeDto } from '../dto/employee.dto';
import { OfficeService } from './office.service';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: Repository<Employee>,
    private readonly officeService: OfficeService,
  ) {}

  async getList(): Promise<Array<Employee>> {
    return this.employeeRepository.find({ relations: ['office'] });
  }

  async createEmployee(item: EmployeeDto): Promise<Employee> {
    const office = await this.officeService.getOne(item.officeId);

    const employee = new Employee();
    employee.age = item.age;
    employee.name = item.name;
    employee.phone = item.phone;
    employee.office = office;

    const entity = this.employeeRepository.create(employee);
    await this.employeeRepository.save(entity);
    return entity;
  }

  async editEmployee(id: number, item: EmployeeDto): Promise<Employee> {
    const office = await this.officeService.getOne(item.officeId);

    const employee = new Employee();
    employee.id = id;
    employee.age = item.age;
    employee.name = item.name;
    employee.phone = item.phone;
    employee.office = office;

    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne(id, { relations: ['office'] });
  }

  async deleteEmployee(id: string): Promise<number> {
    const result = await this.employeeRepository.delete(id);
    return result.affected;
  }
}
