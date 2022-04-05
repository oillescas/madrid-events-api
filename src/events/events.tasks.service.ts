import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { Queue } from 'bull';
import { map } from 'rxjs';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsTasksService {
  private readonly logger = new Logger(EventsTasksService.name);
  private serviceUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectQueue('new-events') private readonly eventsQueue: Queue,
    private httpService: HttpService,
    private readonly eventsService: EventsService,
  ) {
    this.serviceUrl = this.configService.get('EVENTS_SERVICE_URL');
    //'https://datos.madrid.es/egob/catalogo/300107-0-agenda-actividades-eventos.json';
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  importEvents() {
    this.logger.log('Init load events');
    try {
      this.httpService
        .get(this.serviceUrl)
        .pipe(map((resp) => resp.data))
        .pipe(map((data) => data['@graph']))
        .subscribe({
          next: (data) => {
            data.forEach((event) => {
              this.pushEvent(event, 'new-events');
            });
          },
          error: (err) => {
            this.logger.error(`Error ${err}`);
          },
          complete: () => {
            this.logger.debug('Completed');
          },
        });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private pushEvent(event: any, quemeName) {
    this.logger.log(`Pushing event ${event.id} to queue ${quemeName}`);
    this.eventsQueue.add(quemeName, event);
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async deleteOldEvents() {
    this.logger.log('Init delete events');
    const events = await this.eventsService.findOld();
    events.forEach((event) => {
      this.pushEvent(event, 'old-event');
    });
  }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
