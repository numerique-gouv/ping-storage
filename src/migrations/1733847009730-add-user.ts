import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1733847009730 implements MigrationInterface {
    name = 'AddUser1733847009730';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
        const [insertedUser] = await queryRunner.query(
            `INSERT INTO "user" ("email", "hashedPassword") VALUES ('bartholome.girard@gmail.com', '7b155b65c3ecb88501347988ab889b021c4c891e547976b27e2419734117240b') RETURNING id`,
        );
        const userId = insertedUser.id;
        await queryRunner.query(`ALTER TABLE "system_pulse" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "monitor" ADD "userId" uuid`);
        await queryRunner.query(
            `ALTER TABLE "system_pulse" ADD CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "monitor" ADD CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );

        await queryRunner.query(`UPDATE "system_pulse" SET "userId"='${userId}'`);
        await queryRunner.query(`UPDATE "monitor" SET "userId"='${userId}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "monitor" DROP CONSTRAINT "FK_17b6081f05eee538f7db3de2f9c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "system_pulse" DROP CONSTRAINT "FK_9c9997d98ccc4e43157c9803b0a"`,
        );
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "system_pulse" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
