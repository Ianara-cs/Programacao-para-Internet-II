import { MigrationInterface, QueryRunner } from "typeorm";

export class createColumnsEmailCodigoDeValidacaoExpiresInInUserTable1662237230663 implements MigrationInterface {
    name = 'createColumnsEmailCodigoDeValidacaoExpiresInInUserTable1662237230663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "codigo_de_validacao" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "expires_in" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "conta_ativa" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "conta_ativa" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "expires_in"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codigo_de_validacao"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

}
