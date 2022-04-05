import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ViewEventDto } from './dto/view-event.dto';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  serviceUrl: string;
  constructor(
    @InjectRepository(Event) private EventsRepository: Repository<Event>,
  ) {}

  // create(createEventDto: CreateEventDto) {
  //   return this.EventsRepository.save(createEventDto);
  // }

  findAll(): Promise<ViewEventDto[]> {
    return this.EventsRepository.find({
      where: {
        endDate: MoreThan(new Date()),
      },
    });
  }

  findOne(id: number) {
    return this.EventsRepository.findOne(id);
  }

  findByArea(area: string) {
    return this.EventsRepository.find({
      where: {
        area,
        endDate: MoreThan(new Date()),
      },
    });
  }

  findOld() {
    return this.EventsRepository.find({
      where: {
        endDate: LessThan(new Date()),
      },
    });
  }

  findByLocation(location: string) {
    return this.EventsRepository.find({
      where: {
        location: {
          id: location,
        },
        endDate: MoreThan(new Date()),
      },
    });
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
