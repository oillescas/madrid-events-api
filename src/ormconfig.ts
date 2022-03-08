import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // synchronize: true,
  migrationsRun: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: ['error', 'warn', 'info', 'query', 'schema'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl:
    process.env.DISABLE_DATABASE_SSL === 'true'
      ? false
      : {
          rejectUnauthorized: false,
        },
};

export = config;
