import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEvent1729418677813 implements MigrationInterface {
    name = 'AddEvent1729418677813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."event_kind_enum" AS ENUM('up', 'down')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "kind" "public"."event_kind_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ping" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "ping" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_332ae914d279c823c7ae4197d5d" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_332ae914d279c823c7ae4197d5d"`);
        await queryRunner.query(`ALTER TABLE "ping" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "ping" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "public"."event_kind_enum"`);
    }

}
