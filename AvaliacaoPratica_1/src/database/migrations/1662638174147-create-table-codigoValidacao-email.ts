import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCodigoValidacaoEmail1662638174147 implements MigrationInterface {
    name = 'createTableCodigoValidacaoEmail1662638174147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "codigo_validacao_email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_email" character varying NOT NULL, "codigo_de_validacao" integer NOT NULL, "expires_in" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_166403fc494686fc65b8c0b390d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "codigo_validacao_email"`);
    }

}
