import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeletePings1729425458873 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ping" DROP CONSTRAINT "FK_eaee4e2004faa8d8af53024ed8f"`,
        );
        await queryRunner.query(`DROP TABLE "ping"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "ping" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" uuid NOT NULL, CONSTRAINT "PK_b01cab9d614b77bac5973937663" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "ping" ADD CONSTRAINT "FK_eaee4e2004faa8d8af53024ed8f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }
}
