import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFrequencyAndGracePeriod1729420898909 implements MigrationInterface {
    name = 'AddFrequencyAndGracePeriod1729420898909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "frequency" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "client" ADD "gracePeriod" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "gracePeriod"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "frequency"`);
    }

}
