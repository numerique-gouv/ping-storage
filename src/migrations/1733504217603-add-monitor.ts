import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonitor1733504217603 implements MigrationInterface {
    name = 'AddMonitor1733504217603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monitor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "frequency" integer NOT NULL DEFAULT '10', "lastSuccessfulCall" TIMESTAMP, CONSTRAINT "UQ_d18b0240048ed7dbfc92bdaeeb3" UNIQUE ("name"), CONSTRAINT "PK_2206b1127c3617bd63373acba74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "monitor"`);
    }

}
