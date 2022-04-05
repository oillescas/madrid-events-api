import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EventsService } from './events.service';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViewEventDto } from './dto/view-event.dto';
import { ConfigService } from '@nestjs/config';
import { EventsTasksService } from './events.tasks.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    private readonly eventsTaskService: EventsTasksService,
    private readonly eventsService: EventsService,
    private configService: ConfigService,
  ) {}

  @ApiResponse({
    type: ViewEventDto,
    isArray: true,
  })
  @Get()
  findAll(): Promise<ViewEventDto[]> {
    return this.eventsService.findAll();
  }

  @ApiOkResponse({
    type: ViewEventDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOkResponse({
    type: ViewEventDto,
    isArray: true,
  })
  @Get('area/:area')
  findByArea(@Param('area') area: string) {
    return this.eventsService.findByArea(area);
  }

  @ApiOkResponse({
    type: ViewEventDto,
    isArray: true,
  })
  @Get('location/:location')
  findByLocation(@Param('location') location: string) {
    return this.eventsService.findByLocation(location);
  }

  @Post()
  create(@Req() request: Request, @Res() res: Response) {
    const token = this.configService.get<string>('token');
    if (request?.headers?.authorization !== `T ${token}`) {
      res.status(HttpStatus.FORBIDDEN).send();
    } else {
      this.eventsTaskService.importEvents();
      res.status(HttpStatus.CREATED).send();
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventsService.update(+id, updateEventDto);
  // }

  @Delete()
  remove(@Req() request: Request, @Res() res: Response) {
    const token = this.configService.get<string>('token');
    if (request?.headers?.authorization !== `T ${token}`) {
      this.logger.error(`Failed to remove events reason: forbidden ${token}`);
      res.status(HttpStatus.FORBIDDEN).send();
    } else {
      this.eventsTaskService.deleteOldEvents();
      res.status(HttpStatus.CREATED).send();
    }
  }
}
