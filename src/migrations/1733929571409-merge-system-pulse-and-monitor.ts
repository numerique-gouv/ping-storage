import { MigrationInterface, QueryRunner } from 'typeorm';

export class MergeSystemPulseAndMonitor1733929571409 implements MigrationInterface {
    name = 'MergeSystemPulseAndMonitor1733929571409';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."monitor_kind_enum" AS ENUM('app', 'cron')`);
        await queryRunner.query(
            `ALTER TABLE "monitor" ADD "kind" "public"."monitor_kind_enum" NOT NULL DEFAULT 'app'`,
        );
        await queryRunner.query(
            `ALTER TABLE "monitor" ADD "gracePeriod" integer NOT NULL DEFAULT '1'`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" ADD "lastPingedAt" TIMESTAMP`);
        await queryRunner.query(
            `ALTER TABLE "monitor" DROP CONSTRAINT "UQ_d18b0240048ed7dbfc92bdaeeb3"`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" ALTER COLUMN "url" DROP NOT NULL`);

        const systemPulses = await queryRunner.query(`SELECT * FROM "system_pulse"`);
        for (const systemPulse of systemPulses) {
            await queryRunner.query(
                `INSERT INTO "monitor"
                ("id", "name", "displayName", "kind", "frequency", "gracePeriod", "userId", "lastPingedAt")
                VALUES
                ('${systemPulse.id}', '${systemPulse.name}', '${systemPulse.name}', 'cron', ${
                    systemPulse.frequency
                } , ${systemPulse.gracePeriod}, '${systemPulse.userId}', '${new Date(
                    systemPulse.lastPingedAt,
                ).toISOString()}')`,
            );
        }

        const systemPulseEvents = await queryRunner.query(`SELECT * FROM "event"`);
        for (const event of systemPulseEvents) {
            await queryRunner.query(`
                INSERT INTO "monitor_event"
                ("title", "kind",  "createdAt", "monitorId")
                VALUES
                ('${event.title}','${event.kind}','${new Date(event.createdAt).toISOString()}','${
                event.systemPulseId
            }')`);
        }

        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "system_pulse"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "monitor" WHERE "url" IS NULL`);
        await queryRunner.query(`ALTER TABLE "monitor" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "monitor" ADD CONSTRAINT "UQ_d18b0240048ed7dbfc92bdaeeb3" UNIQUE ("name")`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "lastPingedAt"`);
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "gracePeriod"`);
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "kind"`);
        await queryRunner.query(`DROP TYPE "public"."monitor_kind_enum"`);
    }
}
