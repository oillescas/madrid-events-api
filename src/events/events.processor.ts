import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Processor('new-events')
export class EventsProcessor {
  private readonly logger = new Logger(EventsProcessor.name);

  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
  ) {}

  @Process('new-events')
  async processNewEvents(job: Job) {
    this.logger.debug(
      `Processing new event ${job.data.id} ... ${job.data.title}`,
    );
    try {
      const event = await this.eventsRepository.findOne({
        where: { id: job.data.id },
      });
      if (event) {
        await this.eventsRepository.update(
          job.data.id,
          this.parseEvent(job.data),
        );
      } else {
        await this.eventsRepository.save(this.parseEvent(job.data));
      }
    } catch (error) {
      this.logger.error(
        `Failed to process event ${job.data.id} reason: ${error}`,
      );
    }
  }

  private parseEvent(event: any): Event {
    const {
      id,
      title,
      description,
      location,
      dtstart,
      dtend,
      free,
      price,
      link,
      address,
      time,
      recurrence,
      organization,
      relation,
      '@type': type,
    } = event;
    return {
      id,
      title,
      description,
      location: {
        name: (organization || {})['organization-name'],
        id: (relation || {})['@id']?.split('/')?.pop()?.split('-')[0],
        lat: location?.latitude,
        lng: location?.longitude,
      },
      startDate: dtstart,
      endDate: dtend,
      free: !!free,
      price,
      link,
      area: address?.area['@id'].split('/').pop(),
      district: address?.district['@id'].split('/').pop(),
      time,
      recurrence,
      type: type?.split('/').pop(),
    };
  }
}
