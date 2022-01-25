import { ApiProperty } from '@nestjs/swagger';
export class LocationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  lat: string;
  @ApiProperty()
  lng: string;
}

export class ViewEventDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    type: LocationDto,
  })
  location: LocationDto;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  free: boolean;
  @ApiProperty()
  price: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  time: string;
  @ApiProperty()
  recurrence: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  area: string;
  @ApiProperty()
  district: string;
}
