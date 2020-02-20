import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'heroes_user',
      password: 'password',
      database: 'estaff',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
