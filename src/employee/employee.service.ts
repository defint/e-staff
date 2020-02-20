import { Inject, Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EMPLOYEE_REPOSITORY } from 'src/constants';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getList(): Promise<Array<Employee>> {
    return this.employeeRepository.find();
  }

  async createEmployee(item: Employee): Promise<Employee> {
    const entity = this.employeeRepository.create(item);
    await this.employeeRepository.save(entity);
    return entity;
  }

  async editEmployee(id: string, item: Employee): Promise<Employee> {
    await this.employeeRepository.update(id, item);
    return this.employeeRepository.findOne(id);
  }

  async deleteEmployee(id: string): Promise<number> {
    const result = await this.employeeRepository.delete(id);
    return result.affected;
  }
}
