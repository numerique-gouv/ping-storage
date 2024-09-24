import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPingAndClient1727191265660 implements MigrationInterface {
    name = 'AddPingAndClient1727191265660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ping" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" uuid NOT NULL, CONSTRAINT "PK_b01cab9d614b77bac5973937663" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ping" ADD CONSTRAINT "FK_eaee4e2004faa8d8af53024ed8f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ping" DROP CONSTRAINT "FK_eaee4e2004faa8d8af53024ed8f"`);
        await queryRunner.query(`DROP TABLE "ping"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
