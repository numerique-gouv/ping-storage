import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAlertSubcription1733942430434 implements MigrationInterface {
    name = 'AddAlertSubcription1733942430434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alert_subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "monitorId" uuid NOT NULL, CONSTRAINT "People can only subscribe once to monitors" UNIQUE ("email", "monitorId"), CONSTRAINT "PK_32cbf375c12e1a65d03eb604ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alert_subscription" ADD CONSTRAINT "FK_4bb4faeecaedfa5e634519d26df" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert_subscription" DROP CONSTRAINT "FK_4bb4faeecaedfa5e634519d26df"`);
        await queryRunner.query(`DROP TABLE "alert_subscription"`);
    }

}
