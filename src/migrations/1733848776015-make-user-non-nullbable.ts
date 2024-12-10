import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUserNonNullbable1733848776015 implements MigrationInterface {
    name = 'MakeUserNonNullbable1733848776015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "system_pulse" DROP CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a"`);
        await queryRunner.query(`ALTER TABLE "system_pulse" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monitor" DROP CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c"`);
        await queryRunner.query(`ALTER TABLE "monitor" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "system_pulse" ADD CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monitor" ADD CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" DROP CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c"`);
        await queryRunner.query(`ALTER TABLE "system_pulse" DROP CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a"`);
        await queryRunner.query(`ALTER TABLE "monitor" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monitor" ADD CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "system_pulse" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "system_pulse" ADD CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
