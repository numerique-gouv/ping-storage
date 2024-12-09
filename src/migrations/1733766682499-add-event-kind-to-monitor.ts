import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEventKindToMonitor1733766682499 implements MigrationInterface {
    name = 'AddEventKindToMonitor1733766682499';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."monitor_event_kind_enum" AS ENUM('up', 'down')`,
        );
        await queryRunner.query(
            `CREATE TABLE "monitor_event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "kind" "public"."monitor_event_kind_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "monitorId" uuid NOT NULL, CONSTRAINT "PK_c1fa77c3b2373ca7c577cf3d3bc" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" ADD "displayName" character varying`);
        await queryRunner.query(
            `ALTER TABLE "monitor_event" ADD CONSTRAINT "FK_80162ee1421ec8763cc83323b64" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "monitor_event" DROP CONSTRAINT "FK_80162ee1421ec8763cc83323b64"`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "displayName"`);
        await queryRunner.query(`DROP TABLE "monitor_event"`);
        await queryRunner.query(`DROP TYPE "public"."monitor_event_kind_enum"`);
    }
}
