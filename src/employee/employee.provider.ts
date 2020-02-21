import { Connection } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Office } from './entities/office.entity';
import {
  EMPLOYEE_REPOSITORY,
  DATABASE_CONNECTION,
  OFFICE_REPOSITORY,
} from 'src/constants';

export const employeeProviders = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Employee),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: OFFICE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Office),
    inject: [DATABASE_CONNECTION],
  },
];
