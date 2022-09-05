import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCodigoValidacaoTelefone1662316692032 implements MigrationInterface {
    name = 'createTableCodigoValidacaoTelefone1662316692032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "codigo_validacao_telefone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "telefone" character varying NOT NULL, "codigo_de_validacao" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ad30544dc1c0f6718aa661789f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telefone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telefone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "login" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "codigo_validacao_telefone"`);
    }

}
