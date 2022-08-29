import { MigrationInterface, QueryRunner } from "typeorm";

export class mudarNomeColunaExpiresIn1661739947032 implements MigrationInterface {
    name = 'mudarNomeColunaExpiresIn1661739947032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reflesh_token" RENAME COLUMN "experesIn" TO "expiresIn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reflesh_token" RENAME COLUMN "expiresIn" TO "experesIn"`);
    }

}
