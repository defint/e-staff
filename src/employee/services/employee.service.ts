import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';
import { EMPLOYEE_REPOSITORY } from 'src/constants';
import { EmployeeDto } from '../dto/employee.dto';
import { OfficeService } from './office.service';
import { TagDto } from '../dto/tag.dto';
import { TagService } from './tag.service';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: Repository<Employee>,
    private readonly officeService: OfficeService,
    private readonly tagService: TagService,
  ) {}

  async getList(): Promise<Array<Employee>> {
    return this.employeeRepository.find({ relations: ['office', 'tags'] });
  }

  async getOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id, {
      relations: ['office', 'tags'],
    });

    if (!employee) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Employee does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return employee;
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
    return this.getOne(id);
  }

  async deleteEmployee(id: number): Promise<number> {
    const result = await this.employeeRepository.delete(id);
    return result.affected;
  }

  async createTag(id: number, itemTag: TagDto): Promise<Tag> {
    const tag = await this.tagService.findOrCreateTag(itemTag);
    const employee = await this.getOne(id);

    const isTagExist = employee.tags.some(t => t.id === tag.id);
    if (!isTagExist) {
      employee.tags.push(tag);
    }

    await this.employeeRepository.save(employee);

    return tag;
  }

  async removeTag(id: number, idTag: number): Promise<Employee> {
    const tag = await this.tagService.getOne(idTag);
    const employee = await this.getOne(id);

    const index = employee.tags.findIndex(t => t.id === tag.id);
    if (index >= 0) {
      employee.tags.splice(index, 1);
    }

    await this.employeeRepository.save(employee);

    return employee;
  }
}
