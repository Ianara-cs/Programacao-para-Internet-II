import { MigrationInterface, QueryRunner } from "typeorm";

export class createARefleshTokenColumnInUserTable1662057995547 implements MigrationInterface {
    name = 'createARefleshTokenColumnInUserTable1662057995547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
