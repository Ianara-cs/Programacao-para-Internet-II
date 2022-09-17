import { MigrationInterface, QueryRunner } from "typeorm";

export class relacaoEntreUserEReading1663415792688 implements MigrationInterface {
    name = 'relacaoEntreUserEReading1663415792688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leitura" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "leitura" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "leitura" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "leitura" ADD CONSTRAINT "FK_ff3c61302b9f725d7fa4b9dcaf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leitura" DROP CONSTRAINT "FK_ff3c61302b9f725d7fa4b9dcaf5"`);
        await queryRunner.query(`ALTER TABLE "leitura" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "leitura" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leitura" RENAME COLUMN "userId" TO "user_id"`);
    }

}
