import { MigrationInterface, QueryRunner } from "typeorm";

export class excluidoColunasCodigoValidacaoExpiresInNaTabelaUser1662639211032 implements MigrationInterface {
    name = 'excluidoColunasCodigoValidacaoExpiresInNaTabelaUser1662639211032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codigo_de_validacao"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "expires_in"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "expires_in" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "codigo_de_validacao" integer NOT NULL`);
    }

}
