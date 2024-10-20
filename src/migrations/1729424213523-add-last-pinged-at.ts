import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastPingedAt1729424213523 implements MigrationInterface {
    name = 'AddLastPingedAt1729424213523';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "lastPingedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "lastPingedAt"`);
    }
}
