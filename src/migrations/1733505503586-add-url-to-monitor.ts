import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUrlToMonitor1733505503586 implements MigrationInterface {
    name = 'AddUrlToMonitor1733505503586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" ADD "url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "url"`);
    }

}
