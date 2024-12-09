import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisplayName1733766808530 implements MigrationInterface {
    name = 'AddDisplayName1733766808530';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const monitors = await queryRunner.query(`SELECT * FROM "monitor"`);
        await queryRunner.query(`ALTER TABLE "monitor" ADD "displayName" character varying`);
        for (const monitor of monitors) {
            const slug = slugify(monitor.name);
            await queryRunner.query(
                `UPDATE "monitor" SET "displayName"='${slug}' WHERE id='${monitor.id}'`,
            );
        }
        await queryRunner.query(`ALTER TABLE "monitor" ALTER COLUMN "displayName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monitor" DROP COLUMN "displayName"`);
    }
}

function slugify(displayName: string) {
    return displayName
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/ /g, '-');
}
