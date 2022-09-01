import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableLeitura1662061825232 implements MigrationInterface {
    name = 'createTableLeitura1662061825232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leitura" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "subtitulo" character varying NOT NULL, "user_id" character varying NOT NULL, "tags" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e872559872e0f9ca97fa3d335f9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "leitura"`);
    }

}
