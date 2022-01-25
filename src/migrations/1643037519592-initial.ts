import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1643037519592 implements MigrationInterface {
  name = 'initial1643037519592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "free" boolean NOT NULL, "price" character varying NOT NULL, "link" character varying NOT NULL, "time" character varying NOT NULL, "recurrence" character varying, "type" character varying, "area" character varying, "district" character varying, "locationName" character varying, "locationId" character varying, "locationLat" character varying, "locationLng" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
