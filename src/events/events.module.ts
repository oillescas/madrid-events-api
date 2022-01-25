import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsProcessor } from './events.processor';
import { EventsTasksService } from './events.tasks.service';
import { Event } from './entities/event.entity';

import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Event]),
    BullModule.registerQueue({
      name: 'new-events',
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsProcessor, EventsTasksService],
})
export class EventsModule {}
