import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableRefleshToken1661704451364 implements MigrationInterface {
    name = 'createTableRefleshToken1661704451364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reflesh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expiresIn" integer NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_aa8a9eea7159698eaae71c54480" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refleshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refleshToken"`);
        await queryRunner.query(`DROP TABLE "reflesh_token"`);
    }

}
