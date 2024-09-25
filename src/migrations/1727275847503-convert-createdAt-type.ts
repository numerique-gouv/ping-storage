import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertCreatedAtType1727275847503 implements MigrationInterface {
    name = 'ConvertCreatedAtType1727275847503';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "ping"`);
        await queryRunner.query(`ALTER TABLE "ping" DROP COLUMN "createdAt"`);
        await queryRunner.query(
            `ALTER TABLE "ping" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "ping"`);
        await queryRunner.query(`ALTER TABLE "ping" DROP COLUMN "createdAt"`);
        await queryRunner.query(
            `ALTER TABLE "ping" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        );
    }
}
