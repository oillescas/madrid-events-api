import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const ssl_options = {};
        if (configService.get('DISABLE_DATABASE_SSL') === 'true') {
          ssl_options['ssl'] = false;
        }
        return {
          ...ormconfig,
          ...ssl_options,
          url: configService.get('DATABASE_URL'),
          keepConnectionAlive: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
