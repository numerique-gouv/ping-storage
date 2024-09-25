import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniquenessToName1727270950252 implements MigrationInterface {
    name = 'AddUniquenessToName1727270950252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_480f88a019346eae487a0cd7f0c" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_480f88a019346eae487a0cd7f0c"`);
    }

}
