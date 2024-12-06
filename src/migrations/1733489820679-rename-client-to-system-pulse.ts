import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameClientToSystemPulse1733489820679 implements MigrationInterface {
    name = 'RenameClientToSystemPulse1733489820679';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "event" DROP CONSTRAINT "FK_332ae914d279c823c7ae4197d5d"`,
        );
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "clientId" TO "systemPulseId"`);
        await queryRunner.query(`ALTER TABLE client RENAME TO system_pulse`);
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_9576b16effef64ef2676b9a8d69" FOREIGN KEY ("systemPulseId") REFERENCES "system_pulse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "event" DROP CONSTRAINT "FK_9576b16effef64ef2676b9a8d69"`,
        );
        await queryRunner.query(`ALTER TABLE "system_pulse" RENAME TO "client"`);

        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "systemPulseId" TO "clientId"`);
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_332ae914d279c823c7ae4197d5d" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }
}
