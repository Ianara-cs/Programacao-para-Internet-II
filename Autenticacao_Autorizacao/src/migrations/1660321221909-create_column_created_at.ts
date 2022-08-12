import { MigrationInterface, QueryRunner } from "typeorm";

export class createColumnCreatedAt1660321221909 implements MigrationInterface {
    name = 'createColumnCreatedAt1660321221909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" character varying NOT NULL`);
    }

}
