import { Connection } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { EMPLOYEE_REPOSITORY, DATABASE_CONNECTION } from 'src/constants';

export const employeeProviders = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Employee),
    inject: [DATABASE_CONNECTION],
  },
];
