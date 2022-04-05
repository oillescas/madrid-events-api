import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrationsRun: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: ['error'],
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
