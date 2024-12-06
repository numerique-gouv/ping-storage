import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastCall1733506046286 implements MigrationInterface {
    name = 'AddLastCall1733506046286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" ADD "lastCall" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "lastCall"`);
    }

}
