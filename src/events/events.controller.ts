import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViewEventDto } from './dto/view-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.eventsService.create(createEventDto);
  // }

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventsService.update(+id, updateEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
