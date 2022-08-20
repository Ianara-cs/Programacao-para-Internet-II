import { MigrationInterface, QueryRunner } from "typeorm";

export class createPostId1660961222365 implements MigrationInterface {
    name = 'createPostId1660961222365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
    }

}
