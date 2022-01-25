import { Column, Entity, PrimaryColumn } from 'typeorm';

export class Location {
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  id: string;
  @Column({ nullable: true })
  lat: string;
  @Column({ nullable: true })
  lng: string;
}

@Entity()
export class Event {
  @PrimaryColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column(() => Location)
  location: Location;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  free: boolean;
  @Column()
  price: string;
  @Column()
  link: string;
  @Column()
  time: string;
  @Column({ nullable: true })
  recurrence: string;
  @Column({ nullable: true })
  type: string;
  @Column({ nullable: true })
  area: string;
  @Column({ nullable: true })
  district: string;
}
